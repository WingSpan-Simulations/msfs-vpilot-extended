import {
    ComponentProps, DisplayComponent, Fragment, FSComponent, NodeReference, Publisher, VNode
} from '@microsoft/msfs-sdk';

import { FrontendEvents } from '../vPEBackend';
import { InputBar } from './inputBar';
import { InputBox } from './inputBox';
import { ScrollButton } from './scrollButton';

const alphanumericRegex = /^[A-Za-z0-9]*$/
const alphabetRegex = /^[A-Za-z]*$/
const numericRegex = /^[0-9]*$/
const timeSplitRegex = /^\d{1,2}(:\d{0,2})?$/
const ICAOMaxLength = 4
const departTimeMaxLength = 4
const timeSplitMaxLength = 5

interface FlightPlanProps extends ComponentProps {
    publisher: Publisher<FrontendEvents>
}
export interface FlightPlanPage {
    pageRef: NodeReference<HTMLDivElement>
    fileButtonRef: NodeReference<TemplateElement>;
    fetchButtonRef: NodeReference<TemplateElement>;

    selectedFlightRules: string;
    selectedVoice: string;
    departureICAO: string;
    arrivalICAO: string;
    alternateICAO: string;
    departureTime: number;
    timeEnroute: { hours: number, minutes: number };
    fuelAvailable: { hours: number, minutes: number };
    cruiseSpeed: number;
    cruiseAlt: number;
    route: string;
    remarks: string;
    equipment: string;
}
export class FlightPlanPage extends DisplayComponent<FlightPlanProps> {
    constructor(props: FlightPlanProps) {
        super(props)

        this.pageRef = FSComponent.createRef<HTMLDivElement>();
        this.fileButtonRef = FSComponent.createRef<TemplateElement>();
        this.fetchButtonRef = FSComponent.createRef<TemplateElement>();

        this.selectedFlightRules = "instrument"
        this.selectedVoice = "send + receive"
        this.departureICAO = ""
        this.arrivalICAO = ""
        this.alternateICAO = ""
        this.departureTime = 0
        this.timeEnroute = { hours: 0, minutes: 0 }
        this.fuelAvailable = { hours: 0, minutes: 0 }
        this.cruiseSpeed = 0
        this.cruiseAlt = 0
        this.route = ""
        this.remarks = ""
        this.equipment = ""
    }

    public hide() {
        this.pageRef.instance.classList.add('hidden')
    }

    public show() {
        if (this.pageRef.instance.classList.contains('hidden')) {
            this.pageRef.instance.classList.remove('hidden')
        }
    }

    onAfterRender() {
        this.fileButtonRef.instance.addEventListener("click", () => {
            this.props.publisher.pub("fileFlightPlan", {
                departure: this.departureICAO,
                arrival: this.arrivalICAO,
                alternate: this.alternateICAO,
                cruiseAlt: this.cruiseSpeed,
                cruiseSpeed: this.cruiseAlt,
                route: this.route,
                remarks: `${this.getVoiceRemark()} ${this.remarks}`,
                departureTime: this.departureTime,
                hoursEnroute: this.timeEnroute.hours,
                minsEnroute: this.timeEnroute.minutes,
                hoursFuel: this.fuelAvailable.hours,
                minsFuel: this.fuelAvailable.minutes,
                equipment: this.equipment,
                isVFR: this.selectedFlightRules == "visual"
            })
        })

        this.fetchButtonRef.instance.addEventListener("click", () => {
            this.props.publisher.pub("fetchFlightPlan", true)
        })
    }

    getVoiceRemark() {
        switch (this.selectedVoice) {
            case "send + receive":
                return "/v/"
            case "receive only":
                return "/r/"
            case "text only":
                return "/t/"
        }
    }

    transformText(maxLength: number, regex: RegExp, input: string) {
        let newInput = input.toUpperCase().slice(0, maxLength);

        if (regex.test(newInput) !== true) {
            newInput = newInput.slice(0, newInput.length - 1)
        }

        return newInput
    }

    onFlightRuleInput(input: string) { this.selectedFlightRules = input }
    onVoiceInput(input: string) {
        console.log(input)
        this.selectedVoice = input
    }
    onDepartureInput(input: string) { this.departureICAO = input }
    onArrivalInput(input: string) { this.arrivalICAO = input }
    onAlternateInput(input: string) { this.alternateICAO = input }
    onDepartureTimeInput(input: string) { this.departureTime = Number(input) }
    onCruiseSpeedInput(input: string) { this.cruiseSpeed = Number(input) }
    onCruiseAltitudeInput(input: string) { this.cruiseAlt = Number(input) }
    onRouteInput(input: string) { this.route = input }
    onRemarksInput(input: string) { this.remarks = input }
    onEquipmentInput(input: string) { this.equipment = input }

    onTimeEnrouteInput(input: string) {
        let time = input.split(":")
        this.timeEnroute.hours = Number(time[0])
        this.timeEnroute.minutes = Number(time[1])
    }
    onFuelAvailableInput(input: string) {
        let time = input.split(":")
        this.timeEnroute.hours = Number(time[0])
        this.timeEnroute.minutes = Number(time[1])
    }

    transformDepartureTimeInput(input: string) {
        let newInput = input.slice(0, departTimeMaxLength);

        if (numericRegex.test(newInput) !== true) {
            newInput = newInput.slice(0, newInput.length - 1)
        }

        let hours = newInput.slice(0, 2)
        let mins = newInput.slice(2, 4)
        let correctedInput = ""

        if (Number(hours) > 24) {
            correctedInput = "24"
        } else {
            correctedInput = hours
        }

        if (mins !== "" && Number(mins) > 59) {
            correctedInput = correctedInput + "59"
        } else {
            correctedInput = correctedInput + mins
        }

        return correctedInput
    }

    checkForErrors(ref: NodeReference<any>) {
        if (ref.instance.value == "" && ref.instance.classList.contains("error") !== true) {
            ref.instance.classList.add("error")
        } else if (ref.instance.classList.contains("error") === true) {
            ref.instance.classList.remove("error")
        }
    }

    public render(): VNode {
        return (
            <div class="hidden" ref={this.pageRef}>
                <virtual-scroll direction="y" scroll-type="auto">
                    <p class="col-span-1 font-semibold px-1">Flight Rules</p>
                    <ScrollButton onClick={this.onFlightRuleInput.bind(this)} class="pt-1" choices={["instrument", "visual"]} />

                    <p class="col-span-1 font-semibold px-1">Voice</p>
                    <ScrollButton onClick={this.onVoiceInput.bind(this)} class="pt-1" choices={["send + receive", "receive only", "text only"]} />

                    <div class="grid grid-cols-3 pt-1">
                        <p class="col-span-1 font-semibold px-1">Departure</p>
                        <p class="col-span-1 font-semibold px-1">Arrival</p>
                        <p class="col-span-1 font-semibold px-1">Alternate</p>
                    </div>
                    <div class="grid grid-cols-3">
                        <InputBar requireInput={true} onInput={this.onDepartureInput.bind(this)} transformInput={this.transformText.bind(this, ICAOMaxLength, alphanumericRegex)} class="col-span-1 px-1" />
                        <InputBar onInput={this.onArrivalInput.bind(this)} transformInput={this.transformText.bind(this, ICAOMaxLength, alphanumericRegex)} class="col-span-1 px-1" />
                        <InputBar onInput={this.onAlternateInput.bind(this)} transformInput={this.transformText.bind(this, ICAOMaxLength, alphanumericRegex)} class="col-span-1 px-1" />
                    </div>

                    <div class="grid grid-cols-2 pt-1">
                        <p class="col-span-1 font-semibold px-1">Departure Time</p>
                        <p class="col-span-1 font-semibold px-1">Equipment Suffix</p>
                    </div>
                    <div class="grid grid-cols-2">
                        <div class="flex">
                            <div class="grid grid-cols-3">
                                <InputBar requireInput={true} onInput={this.onDepartureTimeInput.bind(this)} transformInput={this.transformDepartureTimeInput} class="px-1 col-span-2" />
                                <p class="px-1 m-auto col-span-1">hhmm zulu</p>
                            </div>
                        </div>
                        <div class="flex">
                            <InputBar onInput={this.onEquipmentInput.bind(this)} transformInput={this.transformText.bind(this, 1, alphabetRegex)} class="px-1" />
                        </div>
                    </div>

                    <div class="grid grid-cols-2 pt-1">
                        <p class="col-span-1 font-semibold px-1">Time Enroute</p>
                        <p class="col-span-1 font-semibold px-1">Fuel Available</p>
                    </div>
                    <div class="grid grid-cols-2">
                        <div class="flex">
                            <InputBar onInput={this.onTimeEnrouteInput.bind(this)} transformInput={this.transformText.bind(this, timeSplitMaxLength, timeSplitRegex)} class="px-1" />
                            <p class="px-1 m-auto">hh:mm</p>
                        </div>
                        <div class="flex">
                            <InputBar onInput={this.onFuelAvailableInput.bind(this)} transformInput={this.transformText.bind(this, timeSplitMaxLength, timeSplitRegex)} class="px-1" />
                            <p class="px-1 m-auto">hh:mm</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 pt-1">
                        <p class="col-span-1 font-semibold px-1">Cruise Speed</p>
                        <p class="col-span-1 font-semibold px-1">Cruise Alt</p>
                    </div>
                    <div class="grid grid-cols-2">
                        <div class="flex">
                            <InputBar requireInput={true} onInput={this.onCruiseSpeedInput.bind(this)} transformInput={this.transformText.bind(this, timeSplitMaxLength, numericRegex)} class="px-1" />
                            <p class="px-1 m-auto">TAS</p>
                        </div>
                        <div class="flex">
                            <InputBar requireInput={true} onInput={this.onCruiseSpeedInput.bind(this)} transformInput={this.transformText.bind(this, timeSplitMaxLength, numericRegex)} class="px-1" />
                            <p class="px-1 m-auto">ft</p>
                        </div>
                    </div>

                    <p class="font-semibold pt-1 px-1">Route</p>
                    <InputBox onInput={this.onRouteInput.bind(this)} transformInput={(input) => { return input.toUpperCase() }} class="mx-1" />
                    <p class="font-semibold pt-1 px-1">Remarks</p>
                    <InputBox onInput={this.onRemarksInput.bind(this)} transformInput={(input) => { return input.toUpperCase() }} class="mx-1" />
                </virtual-scroll>
                <new-push-button ref={this.fileButtonRef} class="w-auto mt-2 mx-2 text-center" title="File" />
                <new-push-button ref={this.fetchButtonRef} class="w-auto mt-2 mx-2 text-center" title="Fetch from server" />
            </div >
        );
    }
}
