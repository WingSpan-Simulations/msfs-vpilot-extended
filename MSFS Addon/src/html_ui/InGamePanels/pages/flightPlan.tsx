import {
    ComponentProps, DisplayComponent, EventBus, FSComponent, NodeReference, VNode
} from '@microsoft/msfs-sdk';

import { InputBar } from '../components/inputBar';
import { InputBox } from '../components/inputBox';
import { ScrollButton } from '../components/scrollButton';
import { FlightPlanSaveManager } from '../SettingSaveManager';
import { BackendEvents, FrontendEvents, vPEFlightPlan } from '../vPEBackend';

const alphanumericRegex = /^[A-Za-z0-9]*$/
const alphabetRegex = /^[A-Za-z]*$/
const numericRegex = /^[0-9]*$/
const timeSplitRegex = /^\d{1,2}(:\d{0,2})?$/
const ICAOMaxLength = 4
const departTimeMaxLength = 4
const timeSplitMaxLength = 5

interface FlightPlanProps extends ComponentProps {
    bus: EventBus
}

export class FlightPlanPage extends DisplayComponent<FlightPlanProps> {
    private readonly subscriber = this.props.bus.getSubscriber<BackendEvents>();
    private readonly publisher = this.props.bus.getPublisher<FrontendEvents>();
    private readonly flightPlanSetting = new FlightPlanSaveManager(this.props.bus)
    private readonly pageRef = FSComponent.createRef<HTMLDivElement>();
    private readonly fileButtonRef = FSComponent.createRef<TemplateElement>();
    private readonly fetchButtonRef = FSComponent.createRef<TemplateElement>();
    private readonly flightRulesInputRef = FSComponent.createRef<ScrollButton>();
    private readonly voiceInputRef = FSComponent.createRef<ScrollButton>();
    private readonly departureInputRef = FSComponent.createRef<InputBar>();
    private readonly arrivalInputRef = FSComponent.createRef<InputBar>();
    private readonly alternateInputRef = FSComponent.createRef<InputBar>();
    private readonly departureTimeInputRef = FSComponent.createRef<InputBar>();
    private readonly equipmentInputRef = FSComponent.createRef<InputBar>();
    private readonly enrouteTimeInputRef = FSComponent.createRef<InputBar>();
    private readonly fuelAvailableInputRef = FSComponent.createRef<InputBar>();
    private readonly cruiseSpeedInputRef = FSComponent.createRef<InputBar>();
    private readonly cruiseAltitudeInputRef = FSComponent.createRef<InputBar>();
    private readonly routeInputRef = FSComponent.createRef<InputBox>();
    private readonly remarksInputRef = FSComponent.createRef<InputBox>();

    private selectedFlightRules = "instrument"
    private selectedVoice = "send + receive"
    private departureICAO = ""
    private arrivalICAO = ""
    private alternateICAO = ""
    private departureTime = 0
    private timeEnroute = { hours: 0, minutes: 0 }
    private fuelAvailable = { hours: 0, minutes: 0 }
    private cruiseSpeed = 0
    private cruiseAlt = 0
    private route = ""
    private remarks = ""
    private equipment = ""

    public hide() {
        this.pageRef.instance.classList.add('hidden')
    }

    public show() {
        if (this.pageRef.instance.classList.contains('hidden')) {
            this.pageRef.instance.classList.remove('hidden')
        }

        this.setInputs({
            departure: this.flightPlanSetting.getSetting('departureAirport').get(),
            arrival: this.flightPlanSetting.getSetting('arrivalAirport').get(),
            alternate: this.flightPlanSetting.getSetting('alternateAirport').get(),
            departureTime: this.flightPlanSetting.getSetting('departureTime').get(),
            equipment: this.flightPlanSetting.getSetting('equipmentSuffix').get(),
            hoursEnroute: this.flightPlanSetting.getSetting('hoursEnroute').get(),
            minsEnroute: this.flightPlanSetting.getSetting('minsEnroute').get(),
            hoursFuel: this.flightPlanSetting.getSetting('hoursFuel').get(),
            minsFuel: this.flightPlanSetting.getSetting('minsFuel').get(),
            cruiseSpeed: this.flightPlanSetting.getSetting('cruiseSpeed').get(),
            cruiseAlt: this.flightPlanSetting.getSetting('cruiseAltitude').get(),
            route: this.flightPlanSetting.getSetting('route').get(),
            remarks: this.flightPlanSetting.getSetting('remarks').get(),
            isVFR: this.flightPlanSetting.getSetting('isVFR').get(),
        })
    }

    public onAfterRender() {
        this.fileButtonRef.instance.addEventListener("click", () => {
            this.publisher.pub("fileFlightPlan", {
                departure: this.departureICAO,
                arrival: this.arrivalICAO,
                alternate: this.alternateICAO,
                cruiseAlt: this.cruiseAlt,
                cruiseSpeed: this.cruiseSpeed,
                route: this.route,
                remarks: `${this.remarks} ${this.getVoiceRemark()}`,
                departureTime: this.departureTime,
                hoursEnroute: this.timeEnroute.hours,
                minsEnroute: this.timeEnroute.minutes,
                hoursFuel: this.fuelAvailable.hours,
                minsFuel: this.fuelAvailable.minutes,
                equipment: this.equipment,
                isVFR: this.selectedFlightRules == "visual"
            }, true)
        })

        this.fetchButtonRef.instance.addEventListener("click", () => {
            this.publisher.pub("fetchFlightPlan", true, true)
        })

        this.subscriber.on('flightPlanReceived').handle((flightPlan) => this.setInputs(flightPlan))
    }

    private getVoiceRemark() {
        console.log(this.selectedVoice)
        switch (this.selectedVoice) {
            case "send + receive":
                return "/V/"
            case "receive only":
                return "/R/"
            case "text only":
                return "/T/"
        }
    }

    private transformText(maxLength: number, regex: RegExp, input: string) {
        let newInput = input.toUpperCase().slice(0, maxLength);

        if (regex.test(newInput) !== true) {
            newInput = newInput.slice(0, newInput.length - 1)
        }

        return newInput
    }

    private onFlightRuleInput(input: string) { this.selectedFlightRules = input }
    private onVoiceInput(input: string) { this.selectedVoice = input }
    private onDepartureInput(input: string) { this.departureICAO = input }
    private onArrivalInput(input: string) { this.arrivalICAO = input }
    private onAlternateInput(input: string) { this.alternateICAO = input }
    private onDepartureTimeInput(input: string) { this.departureTime = Number(input) }
    private onCruiseSpeedInput(input: string) { this.cruiseSpeed = Number(input) }
    private onCruiseAltitudeInput(input: string) { this.cruiseAlt = Number(input) }
    private onRouteInput(input: string) { this.route = input }
    private onRemarksInput(input: string) { this.remarks = input }
    private onEquipmentInput(input: string) { this.equipment = input }

    private onTimeEnrouteInput(input: string) {
        let time = input.split(":")
        this.timeEnroute.hours = Number(time[0])
        this.timeEnroute.minutes = Number(time[1])
    }
    private onFuelAvailableInput(input: string) {
        let time = input.split(":")
        this.timeEnroute.hours = Number(time[0])
        this.timeEnroute.minutes = Number(time[1])
    }

    private transformDepartureTimeInput(input: string) {
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

    private setInputs(flightPlan: vPEFlightPlan) {
        this.flightRulesInputRef.instance.setInput(flightPlan.isVFR ? 1 : 0)
        this.voiceInputRef.instance.setInput(flightPlan.remarks.toLowerCase().includes("/t/") ? 2 : flightPlan.remarks.toLowerCase().includes("/r/") ? 1 : 0)
        this.departureInputRef.instance.setInputText(flightPlan.departure)
        this.arrivalInputRef.instance.setInputText(flightPlan.arrival)
        this.alternateInputRef.instance.setInputText(flightPlan.alternate)
        if (flightPlan.departureTime > 0) { this.departureTimeInputRef.instance.setInputText(flightPlan.departureTime.toString()) }
        this.equipmentInputRef.instance.setInputText(flightPlan.equipment)
        if (flightPlan.minsEnroute > 0 || flightPlan.hoursEnroute > 0) { this.enrouteTimeInputRef.instance.setInputText(`${flightPlan.hoursEnroute.toString().padStart(2, '0')}:${flightPlan.minsEnroute.toString().padStart(2, '0')}`) }
        if (flightPlan.minsFuel > 0 || flightPlan.hoursFuel > 0) { this.fuelAvailableInputRef.instance.setInputText(`${flightPlan.hoursFuel.toString().padStart(2, '0')}:${flightPlan.minsFuel.toString().padStart(2, '0')}`) }
        if (flightPlan.cruiseSpeed > 0) { this.cruiseSpeedInputRef.instance.setInputText(flightPlan.cruiseSpeed.toString()) }
        if (flightPlan.cruiseAlt > 0) { this.cruiseAltitudeInputRef.instance.setInputText(flightPlan.cruiseAlt.toString()) }
        this.routeInputRef.instance.setInputText(flightPlan.route)
        this.remarksInputRef.instance.setInputText(flightPlan.remarks)
    }

    public render(): VNode {
        return (
            <div class="hidden pb-2" ref={this.pageRef}>
                <virtual-scroll direction="y" scroll-type="auto">
                    <p class="col-span-1 font-semibold px-1">Flight Rules</p>
                    <ScrollButton ref={this.flightRulesInputRef} onClick={this.onFlightRuleInput.bind(this)} class="pt-1" choices={["instrument", "visual"]} />

                    <p class="col-span-1 font-semibold px-1">Voice</p>
                    <ScrollButton ref={this.voiceInputRef} onClick={this.onVoiceInput.bind(this)} class="pt-1" choices={["send + receive", "receive only", "text only"]} />

                    <div class="grid grid-cols-3 pt-1">
                        <p class="col-span-1 font-semibold px-1">Departure</p>
                        <p class="col-span-1 font-semibold px-1">Arrival</p>
                        <p class="col-span-1 font-semibold px-1">Alternate</p>
                    </div>
                    <div class="grid grid-cols-3">
                        <InputBar ref={this.departureInputRef} requireInput={true} onInput={this.onDepartureInput.bind(this)} transformInput={this.transformText.bind(this, ICAOMaxLength, alphanumericRegex)} class="col-span-1 px-1" />
                        <InputBar ref={this.arrivalInputRef} onInput={this.onArrivalInput.bind(this)} transformInput={this.transformText.bind(this, ICAOMaxLength, alphanumericRegex)} class="col-span-1 px-1" />
                        <InputBar ref={this.alternateInputRef} onInput={this.onAlternateInput.bind(this)} transformInput={this.transformText.bind(this, ICAOMaxLength, alphanumericRegex)} class="col-span-1 px-1" />
                    </div>

                    <div class="grid grid-cols-2 pt-1">
                        <p class="col-span-1 font-semibold px-1">Departure Time</p>
                        <p class="col-span-1 font-semibold px-1">Equipment Suffix</p>
                    </div>
                    <div class="grid grid-cols-2">
                        <div class="flex">
                            <div class="grid grid-cols-3">
                                <InputBar ref={this.departureTimeInputRef} requireInput={true} onInput={this.onDepartureTimeInput.bind(this)} transformInput={this.transformDepartureTimeInput} class="px-1 col-span-2" />
                                <p class="px-1 m-auto col-span-1">hhmm zulu</p>
                            </div>
                        </div>
                        <div class="flex">
                            <InputBar ref={this.equipmentInputRef} onInput={this.onEquipmentInput.bind(this)} transformInput={this.transformText.bind(this, 1, alphabetRegex)} class="px-1" />
                        </div>
                    </div>

                    <div class="grid grid-cols-2 pt-1">
                        <p class="col-span-1 font-semibold px-1">Time Enroute</p>
                        <p class="col-span-1 font-semibold px-1">Fuel Available</p>
                    </div>
                    <div class="grid grid-cols-2">
                        <div class="flex">
                            <InputBar ref={this.enrouteTimeInputRef} onInput={this.onTimeEnrouteInput.bind(this)} transformInput={this.transformText.bind(this, timeSplitMaxLength, timeSplitRegex)} class="px-1" />
                            <p class="px-1 m-auto">hh:mm</p>
                        </div>
                        <div class="flex">
                            <InputBar ref={this.fuelAvailableInputRef} onInput={this.onFuelAvailableInput.bind(this)} transformInput={this.transformText.bind(this, timeSplitMaxLength, timeSplitRegex)} class="px-1" />
                            <p class="px-1 m-auto">hh:mm</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 pt-1">
                        <p class="col-span-1 font-semibold px-1">Cruise Speed</p>
                        <p class="col-span-1 font-semibold px-1">Cruise Alt</p>
                    </div>
                    <div class="grid grid-cols-2">
                        <div class="flex">
                            <InputBar ref={this.cruiseSpeedInputRef} requireInput={true} onInput={this.onCruiseSpeedInput.bind(this)} transformInput={this.transformText.bind(this, timeSplitMaxLength, numericRegex)} class="px-1" />
                            <p class="px-1 m-auto">TAS</p>
                        </div>
                        <div class="flex">
                            <InputBar ref={this.cruiseAltitudeInputRef} requireInput={true} onInput={this.onCruiseAltitudeInput.bind(this)} transformInput={this.transformText.bind(this, timeSplitMaxLength, numericRegex)} class="px-1" />
                            <p class="px-1 m-auto">ft</p>
                        </div>
                    </div>

                    <p class="font-semibold pt-1 px-1">Route</p>
                    <InputBox ref={this.routeInputRef} onInput={this.onRouteInput.bind(this)} transformInput={(input) => { return input.toUpperCase() }} class="mx-1" />
                    <p class="font-semibold pt-1 px-1">Remarks</p>
                    <InputBox ref={this.remarksInputRef} onInput={this.onRemarksInput.bind(this)} transformInput={(input) => { return input.toUpperCase() }} class="mx-1" />
                </virtual-scroll>
                <new-push-button ref={this.fileButtonRef} class="w-auto mt-2 mx-2 text-center" title="File" />
                <new-push-button ref={this.fetchButtonRef} class="w-auto mt-2 mx-2 text-center" title="Fetch from server" />
            </div >
        );
    }
}
