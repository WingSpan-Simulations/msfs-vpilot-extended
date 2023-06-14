import { FSComponent, DisplayComponent, VNode, Fragment, ComponentProps, NodeReference, Subject, Publisher } from "msfssdk";
import { FrontendEvents } from "../vPEBackend";
import { checkSimVarLoaded } from "../vPEPanel";
import { InputBar } from "./inputBar";


const alphanumericRegex = /^[A-Za-z0-9]*$/
const selcalRegex = /^[A-Za-z]{2}-[A-Za-z]{2}$/
const inputErrors = {
    callsign: {
        tooShort: "Callsign must be more than 2 characters long",
        tooLong: "Callsign must be less than 8 characters long",
        alphanumeric: "Callsign may only contain alphanumeric characters"
    },
    aircraft: {
        tooShort: "Aircraft code must be entered",
        tooLong: "Aircraft code must be less than 4 characters",
        alphanumeric: "Callsign may only contain alphanumeric characters"
    },
    selcal: "Selcal code must be in the format AB-CD (including the dash)"
}

function flatten<T>(arr: T[][]): T[] {
    return arr.reduce((flatArray, currentArray) => flatArray.concat(currentArray), []);
}

interface ConnectProps extends ComponentProps {
    publisher: Publisher<FrontendEvents>
}
export interface ConnectPage {
    callsign: string;
    aircraft: string;
    selcal: string;
    errors: Subject<{ [key: string]: Array<string> }>

    pageRef: NodeReference<HTMLDivElement>
    errorRef: NodeReference<HTMLDivElement>
    callsignRef: NodeReference<InputBar>
    aircraftRef: NodeReference<InputBar>
    selcalRef: NodeReference<InputBar>
    connectRef: NodeReference<TemplateElement>
}
export class ConnectPage extends DisplayComponent<ConnectProps> {
    constructor(props: ConnectProps) {
        super(props)

        this.callsign = "";
        this.aircraft = "";
        this.selcal = "";
        this.errors = Subject.create<{ [key: string]: Array<string> }>({
            callsign: [inputErrors.callsign.tooShort],
            aircraft: [],
            selcal: []
        });

        this.pageRef = FSComponent.createRef<HTMLDivElement>();
        this.errorRef = FSComponent.createRef<HTMLDivElement>();
        this.callsignRef = FSComponent.createRef<any>();
        this.aircraftRef = FSComponent.createRef<any>();
        this.selcalRef = FSComponent.createRef<any>();
        this.connectRef = FSComponent.createRef<any>();
    }

    public hide() {
        this.pageRef.instance.classList.add('hidden')
    }

    public show() {
        if (this.pageRef.instance.classList.contains('hidden')) {
            this.pageRef.instance.classList.remove('hidden')
        }
    }

    public onAfterRender(node: VNode): void {
        this.connectRef.instance.addEventListener("click", (ev: any) => { this.connectToServer() })

        this.errors.sub(() => { this.renderErrors() })
        this.setInputColours(this.callsignRef.instance.getInputBar())
        this.renderErrors()

        checkSimVarLoaded.then(() => {
            let aircraftModel: string = Utils.Translate(SimVar.GetSimVarValue("ATC MODEL", "string"))
            this.aircraftRef.instance.getInputBar().instance.setValue(aircraftModel)
            this.aircraft = aircraftModel
        })
    }

    checkInputErrors(input: string, ref: NodeReference<TemplateElement>, errorChecks: Array<(input: string) => string | false>) {
        let errors: string[] = [];

        errorChecks.forEach((error) => {
            let result = error(input)
            if (result !== false) {
                errors.push(result)
            }
        })

        if (errors.length > 0) {
            this.setInputColours(ref)
        } else {
            this.setInputColours(ref, true)
        }

        return errors

    }

    renderErrors() {
        let errors = flatten(Object.values(this.errors.get()));
        if (errors.length == 0) {
            if (this.errorRef.instance.classList.contains("hidden") !== true) {
                this.errorRef.instance.classList.add("hidden")
            }
        } else if (errors.length > 0) {
            if (this.errorRef.instance.classList.contains("hidden")) {
                this.errorRef.instance.classList.remove("hidden")
            }
        }

        let errorHolder = this.errorRef.instance.querySelector("#errorHolder")
        if (errorHolder) {
            errorHolder.innerHTML = errors.map(error => `<span class="text-base">- ${error}</span>`).join("\n")
        }
    }

    setInputColours(ref: NodeReference<any>, remove?: boolean) {
        if (ref.instance.classList.contains("error") !== true && remove !== true) {
            ref.instance.classList.add("error")
        } else if (ref.instance.classList.contains("error") === true && remove === true) {
            ref.instance.classList.remove("error")
        }
    }

    connectToServer() {
        let errors = flatten(Object.values(this.errors.get()));
        if (errors.length == 0) {
            this.props.publisher.pub("connectToNetwork", {
                callsign: this.callsign,
                aircraft: this.aircraft,
                selcal: this.selcal
            })
        }
    }

    transformInput(input: string, maxLength: number, regex: RegExp): string {
        let newInput = input.toUpperCase().slice(0, maxLength);

        if (regex.test(newInput) !== true) {
            newInput = newInput.slice(0, newInput.length - 1)
        }

        return newInput
    }

    onCallsignInput(input: string, ref: NodeReference<any>) {
        this.callsign = input
        let errors = { ...this.errors.get() }

        errors.callsign = this.checkInputErrors(this.callsign, ref, [
            (input: string) => input.length < 2 && inputErrors.callsign.tooShort,
            (input: string) => input.length > 7 && inputErrors.callsign.tooLong,
            (input: string) => alphanumericRegex.test(input) !== true && inputErrors.callsign.alphanumeric
        ])

        this.errors.set(errors)
    }

    onAircraftInput(input: string, ref: NodeReference<any>) {
        this.aircraft = input
        let errors = { ...this.errors.get() }

        errors.aircraft = this.checkInputErrors(this.aircraft, ref, [
            (input: string) => input.length <= 0 && inputErrors.aircraft.tooShort,
            (input: string) => input.length > 4 && inputErrors.aircraft.tooLong,
            (input: string) => alphanumericRegex.test(input) !== true && inputErrors.aircraft.alphanumeric
        ])

        this.errors.set(errors)
    }

    onSelcalInput(input: string, ref: NodeReference<any>) {
        this.selcal = input
        let errors = { ...this.errors.get() }

        errors.selcal = this.checkInputErrors(this.selcal, ref, [
            (input: string) => (input.length != 0 || selcalRegex.test(this.selcal) !== true) && inputErrors.selcal
        ])

        this.errors.set(errors)
    }

    public render(): VNode {
        return (
            <div class="hidden mx-2 pt-2" ref={this.pageRef}>
                <div class="grid grid-cols-1 justify-items-center pb-2">
                    <span class="font-bold">Connect to network</span>
                </div>

                <hr class="pb-1" />

                <div ref={this.errorRef} class="hidden error-bg w-100 h-auto px-2 py-1 rounded-md mb-2">
                    <span class="text-base font-bold">Error</span>
                    <div id="errorHolder" class="pl-2 flex flex-col" />
                </div>

                <div class="grid grid-cols-4 mt-4">
                    <p class="col-span-2 font-semibold">Callsign</p>
                    <InputBar ref={this.callsignRef} onInput={this.onCallsignInput.bind(this)} transformInput={(input) => { return this.transformInput(input, 7, alphanumericRegex) }} id="callsign" class="col-span-2" />
                </div>
                <div class="grid grid-cols-4 mt-2">
                    <p class="col-span-2 font-semibold">Aircraft Code</p>
                    <InputBar ref={this.aircraftRef} onInput={this.onAircraftInput.bind(this)} transformInput={(input) => { return this.transformInput(input, 4, alphanumericRegex) }} id="aircraftCode" class="col-span-2" />
                </div>
                <div class="grid grid-cols-4 mt-2">
                    <p class="col-span-2 font-semibold">SelCal Code</p>
                    <InputBar ref={this.selcalRef} onInput={this.onSelcalInput.bind(this)} transformInput={(input) => { return this.transformInput(input, 5, selcalRegex) }} id="callsign" class="col-span-2" />
                </div>

                <new-push-button ref={this.connectRef} class="w-auto mt-4 mx-4 text-center" title="Connect" />
            </div>
        );
    }
}
