/// <reference types='@microsoft/msfs-types' />

import { EventBus, EventSubscriber, Publisher } from '@microsoft/msfs-sdk';

import {
    AircraftSaveManager, FlightPlanSaveManager, vPESettingSaveManager
} from '../../../InGamePanels/SettingSaveManager';
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

interface NetworkConnect {
    callsign: string;
    aircraft: string;
    selcal: string;
};
export interface vPEFlightPlan {
    departure: string;
    arrival: string;
    alternate: string;
    cruiseAlt: number;
    cruiseSpeed: number;
    route: string;
    remarks: string;
    departureTime: number;
    hoursEnroute: number;
    minsEnroute: number;
    hoursFuel: number;
    minsFuel: number;
    equipment: string;
    isVFR: boolean;
}
export interface Controller {
    Callsign: string,
    Frequency: number,
    Latitude: number,
    Longitude: number
}

export interface BackendEvents {
    establishedConnection: boolean;
    timeToRetry: number;
    networkCallsign: string | undefined;
    flightPlanReceived: vPEFlightPlan;
    controllerChange: Controller;
    controllerDelete: string;
    created: string;
}

export interface FrontendEvents {
    connectToNetwork: NetworkConnect;
    disconnectFromNetwork: boolean;
    fileFlightPlan: vPEFlightPlan;
    fetchFlightPlan: boolean;
}

export interface Backend {
    publisher: Publisher<BackendEvents>;
    subscriber: EventSubscriber<FrontendEvents>;

    websocket: WebSocket;
    awaitingConnection: boolean;
    connectionInterval: NodeJS.Timer | undefined;
    timeToRetry: number;
}
export class Backend {
    private readonly bus = new EventBus()
    private readonly settingSaveManager = new vPESettingSaveManager(this.bus)
    private readonly aircraftSetting = new AircraftSaveManager(this.bus)
    private readonly flightPlanSetting = new FlightPlanSaveManager(this.bus)
    private readonly controllers = new Map<string, Controller>([])

    constructor() {
        this.websocket;
        this.publisher = this.bus.getPublisher<BackendEvents>();
        this.subscriber = this.bus.getSubscriber<FrontendEvents>();

        const key = `${SimVar.GetSimVarValue('ATC MODEL', 'string')}.profile_1`
        this.settingSaveManager.load(key)
        this.settingSaveManager.startAutoSave(key)

        this.handleFrontEndEvents()
        this.createWebsocket();
    }

    handleFrontEndEvents() {
        this.bus.getSubscriber<BackendEvents>().on('created').handle((data) => {
            console.log("CREATE RECEIVE", data)
        })

        this.subscriber.on("connectToNetwork").handle((values) => {
            this.websocket.send(`ConnectToNetwork<|>Callsign:${values.callsign}<|>TypeCode:${values.aircraft}<|>SelCal:${values.selcal}`)
            this.aircraftSetting.getSetting('callsign').set(values.callsign)
            this.aircraftSetting.getSetting('selcal').set(values.selcal)
        })

        this.subscriber.on("disconnectFromNetwork").handle(() => {
            this.websocket.send("DisconnectFromNetwork")
        })

        this.subscriber.on("fileFlightPlan").handle((values) => {
            this.websocket.send(`SendFlightPlan<|>Departure:${values.departure}<|>Arrival:${values.arrival}<|>Alternate:${values.alternate}<|>CruiseAlt:${values.cruiseAlt / 10}<|>CruiseSpeed:${values.cruiseSpeed / 10}<|>Route:${values.route}<|>Remarks:${values.remarks}<|>DepartureTime:${values.departureTime}`)
            this.websocket.send(`SendFlightPlan<|>HoursEnroute:${values.hoursEnroute}<|>MinsEnroute:${values.minsEnroute}<|>HoursFuel:${values.hoursFuel}<|>MinsFuel:${values.minsFuel}<|>EquipmentCode:${values.equipment}<|>IsVFR:${values.isVFR}<|>FilePlan:true`)

            this.flightPlanSetting.getSetting('departureAirport').set(values.departure)
            this.flightPlanSetting.getSetting('arrivalAirport').set(values.arrival)
            this.flightPlanSetting.getSetting('alternateAirport').set(values.alternate)
            this.flightPlanSetting.getSetting('departureTime').set(values.departureTime)
            this.flightPlanSetting.getSetting('equipmentSuffix').set(values.equipment)
            this.flightPlanSetting.getSetting('hoursEnroute').set(values.hoursEnroute)
            this.flightPlanSetting.getSetting('minsEnroute').set(values.minsEnroute)
            this.flightPlanSetting.getSetting('hoursFuel').set(values.hoursFuel)
            this.flightPlanSetting.getSetting('minsFuel').set(values.minsFuel)
            this.flightPlanSetting.getSetting('cruiseSpeed').set(values.cruiseSpeed)
            this.flightPlanSetting.getSetting('cruiseAltitude').set(values.cruiseAlt)
            this.flightPlanSetting.getSetting('route').set(values.route)
            this.flightPlanSetting.getSetting('remarks').set(values.remarks)
            this.flightPlanSetting.getSetting('isVFR').set(values.isVFR)
        })

        this.subscriber.on("fetchFlightPlan").handle(() => {
            this.websocket.send("FetchFlightPlan")
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
                this.publisher.pub("networkCallsign", args["CallSign"], true)
                break;
            case "DisconnectedFromNetwork":
                this.publisher.pub("networkCallsign", undefined, true)
                break;
            case "FlightPlanReceived":
                if (args["Callsign"] == this.aircraftSetting.getSetting('callsign').get()) {
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
        this.websocket = new WebSocket(websocketUri);
        this.websocket.onopen = (e) => this.handleEstablishedConnection(e);
        this.websocket.onclose = (e) => this.handleConnectionClose(e);
        this.websocket.onmessage = (e) => this.handleMessage(e);
        this.websocket.onerror = (e) => this.handleError(e);
    }
}


document.addEventListener("DOMContentLoaded", () => {
    console.log("AAAA")
    checkSimVarLoaded.then(() => {
        console.log("BBBB")
        new Backend()
    })
});