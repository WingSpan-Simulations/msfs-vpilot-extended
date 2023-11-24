/// <reference types='@microsoft/msfs-types' />

import { EventBus, FSComponent, Publisher } from '@microsoft/msfs-sdk';

import {
    AircraftSaveManager, FlightPlanSaveManager, GeneralSaveManager, vPESettingSaveManager
} from '../../../InGamePanels/SettingSaveManager';
import { BackendEvents, Controller, FrontendEvents } from '../../../InGamePanels/vPEBackend';
import { MessageProps, RadioPanel } from './RadioPanel';
import { checkSimVarLoaded } from './Utilites';

const websocketUri = "ws://127.0.0.1:8080/";

/* 	INCOMING MESSAGES

NetworkConnectionEstablished/CallSign:###/TypeCode:###/SelCal:###
DisconnectedFromNetwork

======================================================================
    OUTGOING MESSAGES
ConnectToNetwork/Callsign:###/TypeCode:###/SelCal:###
SendFlightPlan/Departure:####/Arrival:####/Alternate:####/CruiseAlt:#####/CruiseSpeed:####/Route:###/Remarks:###/DepartureTime:####/HoursEnroute:##/MinsEnroute:##/HoursFuel:##/MinsFuel:##/Equipment:#/IsVFR:####/File:true
FetchFlightPlan
*/

export class Backend {
    private readonly bus = new EventBus()
    private readonly publisher = this.bus.getPublisher<BackendEvents>();
    private readonly subscriber = this.bus.getSubscriber<FrontendEvents>();
    private readonly settingSaveManager = new vPESettingSaveManager(this.bus);
    private readonly generalSettings = new GeneralSaveManager(this.bus)
    private readonly radioRef = FSComponent.createRef<RadioPanel>();

    private readonly controllers = new Map<string, Controller>([])
    private websocket = new WebSocket(websocketUri);
    private awaitingConnection = false;
    private timeToRetry = 20;
    private callsign?: string;
    private connectionInterval?: NodeJS.Timer

    constructor() {
        checkSimVarLoaded.then(() => {
            const key = `${SimVar.GetSimVarValue('ATC MODEL', 'string')}.dev_profile_1`
            this.settingSaveManager.load(key)
            this.settingSaveManager.startAutoSave(key)
        })

        FSComponent.render(<RadioPanel ref={this.radioRef} bus={this.bus} />, document.querySelector("body"))

        this.handleFrontEndEvents()
        this.createWebsocket();
    }

    private getActiveFrequency(): string {
        let activeCom = 1
        for (let i = 1; i <= 3; i++) {
            let isActive = SimVar.GetSimVarValue(`A:COM TRANSMIT:${i}`, "bool")
            activeCom = isActive ? i : activeCom
            if (isActive) { break }
        }

        return SimVar.GetSimVarValue(`A:COM ACTIVE FREQUENCY:${activeCom}`, "Bcd16").toString().slice(1, 6)
    }

    handleFrontEndEvents() {
        this.bus.getSubscriber<BackendEvents>().on('created').handle((data) => {
            console.log("CREATE RECEIVE", data)
        })

        this.subscriber.on("connectToNetwork").handle((values) => {
            this.websocket.send(`ConnectToNetwork<|>Callsign:${values.callsign}<|>TypeCode:${values.aircraft}<|>SelCal:${values.selcal}`)
        })

        this.subscriber.on("disconnectFromNetwork").handle(() => {
            this.websocket.send("DisconnectFromNetwork")
        })

        this.subscriber.on("fileFlightPlan").handle((values) => {
            this.websocket.send(`SendFlightPlan<|>Departure:${values.departure}<|>Arrival:${values.arrival}<|>Alternate:${values.alternate}<|>CruiseAlt:${values.cruiseAlt / 100}<|>CruiseSpeed:${values.cruiseSpeed}<|>Route:${values.route}<|>Remarks:${values.remarks}<|>DepartureTime:${values.departureTime}`)
            this.websocket.send(`SendFlightPlan<|>HoursEnroute:${values.hoursEnroute}<|>MinsEnroute:${values.minsEnroute}<|>HoursFuel:${values.hoursFuel}<|>MinsFuel:${values.minsFuel}<|>EquipmentCode:${values.equipment}<|>IsVFR:${values.isVFR}<|>FilePlan:true`)
        })

        this.subscriber.on("fetchFlightPlan").handle(() => {
            this.websocket.send("FetchFlightPlan")
        })

        this.subscriber.on('setRadioKey').handle((keyCode) => {
            this.generalSettings.getSetting('radioKey').set(keyCode)
        })

        this.subscriber.on('sendMessage').handle((message) => {
            let commsOn = SimVar.GetSimVarValue("A:CIRCUIT COM ON", "bool")
            if (commsOn) {
                let frequency = this.getActiveFrequency()
                this.websocket.send(`SendRadioMessage<|>Text:${message}`)
                this.publisher.pub("newMessage", { callsign: this.callsign || '', message: message, broadcast: false, frequencies: [frequency] })
            }

        })

        document.addEventListener('keydown', (event) => {
            if (this.generalSettings.getSetting('radioKey').get() == event.keyCode) {
                this.radioRef.instance.radioOpen.set(!this.radioRef.instance.radioOpen.get())
            }
        })
    }

    handleEstablishedConnection(e: any) {
        this.awaitingConnection = false;
        this.publisher.pub("establishedConnection", true, true);
    }

    handleMessage(e: MessageEvent) {
        let splitMessage: Array<string> = e.data.split("<|>")
        let type: string | undefined;
        let args: { [key: string]: string } = {};

        splitMessage.forEach((stringPair) => {
            let strings = stringPair.split(":")
            if (strings.length == 1) {
                type = strings[0]
            } else {
                args[strings[0]] = strings[1];
            }
        })

        console.log(`Type: ${type}, Args: ${JSON.stringify(args)}`)

        switch (type) {
            case "NetworkConnectionEstablished":
                this.callsign = args["CallSign"]
                this.publisher.pub("networkCallsign", args["CallSign"], true)
                break;
            case "DisconnectedFromNetwork":
                this.publisher.pub("networkCallsign", undefined, true)
                break;
            case "FlightPlanReceived":
                if (args["Callsign"] == this.callsign) {
                    this.publisher.pub("flightPlanReceived", {
                        departure: args["Departure"],
                        arrival: args["Destination"],
                        alternate: args["Alternate"],
                        cruiseAlt: Number(args["CruiseAlt"]),
                        cruiseSpeed: Number(args["CruiseSpeed"]),
                        route: args["Route"],
                        remarks: args["Remarks"],
                        equipment: args["EquipmentCode"],
                        departureTime: Number(args["DepartureTime"]),
                        hoursEnroute: Number(args["HoursEnroute"]),
                        minsEnroute: Number(args["MinsEnroute"]),
                        hoursFuel: Number(args["HoursFuel"]),
                        minsFuel: Number(args["MinsFuel"]),
                        isVFR: Boolean(args["IsVFR"])
                    }, true)
                }
                break;
            case "ControllerAdded":
                let controllerAdd: Controller = {
                    Callsign: args["Callsign"],
                    Frequency: Number(args["Frequency"]),
                    Latitude: Number(args["Latitude"]),
                    Longitude: Number(args["Longitude"]),
                }
                this.controllers.set(controllerAdd.Callsign, controllerAdd)
                this.publisher.pub("controllerChange", controllerAdd, true);
                break;
            case "ControllerDeleted":
                this.controllers.delete(args["Callsign"])
                this.publisher.pub("controllerDelete", args["Callsign"], true)
                break;
            case "ControllerChangeFreq":
            case "ControllerChangeLocation":
                let controllerChange = this.controllers.get(args["Callsign"]);
                if (controllerChange) {
                    controllerChange.Frequency = args["Frequency"] ? Number(args["Frequency"]) : controllerChange.Frequency
                    controllerChange.Latitude = args["Latitude"] ? Number(args["Latitude"]) : controllerChange.Latitude
                    controllerChange.Longitude = args["Longitude"] ? Number(args["Longitude"]) : controllerChange.Longitude

                    this.controllers.set(controllerChange.Callsign, controllerChange)
                    this.publisher.pub("controllerChange", controllerChange, true);
                }
                break;
            case "RadioMessageReceived":
                this.publisher.pub("newMessage", { callsign: args["From"], message: args["Text"], broadcast: false, frequencies: args["Frequencies"].split(",") })
                break;
            case "BroadcastMessageReceived":
                this.publisher.pub("newMessage", { callsign: "BROADCAST: " + args["From"], message: args["Text"], broadcast: true })
                break;
            case "RemoveMessage":
                this.publisher.pub("deleteMessage", args["Message"])
        }
    }

    handleError(e: any) {
        console.log(`!! WebSocket Error: ${e} !!`);
    }

    handleConnectionClose(e: any) {
        if (this.websocket) {
            this.websocket.close();
        }

        this.publisher.pub("establishedConnection", false, true);
        this.publisher.pub("networkCallsign", undefined, true)

        if (!this.awaitingConnection) {
            this.awaitingConnection = true;
            this.timeToRetry = 20;

            if (this.connectionInterval) {
                clearInterval(this.connectionInterval);
                this.connectionInterval = undefined;
            }

            this.connectionInterval = setInterval(() => {
                this.timeToRetry -= 1;

                this.publisher.pub("timeToRetry", this.timeToRetry, true);

                if (this.timeToRetry == 0) {
                    this.timeToRetry = 20;
                    this.websocket = new WebSocket(websocketUri);
                    this.createWebsocket();
                }
            }, 1000);
        }
    }

    createWebsocket() {
        if (this.connectionInterval) {
            clearInterval(this.connectionInterval);
            this.connectionInterval = undefined;
        }

        this.awaitingConnection = false
        this.websocket.onopen = (e) => this.handleEstablishedConnection(e);
        this.websocket.onclose = (e) => this.handleConnectionClose(e);
        this.websocket.onmessage = (e) => this.handleMessage(e);
        this.websocket.onerror = (e) => this.handleError(e);
    }
}


document.addEventListener("DOMContentLoaded", () => {
    checkSimVarLoaded.then(() => {
        new Backend()
    })
});