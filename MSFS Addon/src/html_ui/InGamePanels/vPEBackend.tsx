// import { EventBus, EventSubscriber, Publisher } from '@microsoft/msfs-sdk';

// import {
// 	AircraftSaveManager, AircraftSettings, FlightPlanSaveManager, vPESettingSaveManager
// } from './SettingSaveManager';

// const websocketUri = "ws://127.0.0.1:8080/";

// /* 	INCOMING MESSAGES

// NetworkConnectionEstablished/CallSign:###/TypeCode:###/SelCal:###
// DisconnectedFromNetwork

// ======================================================================
// 	OUTGOING MESSAGES
// ConnectToNetwork/Callsign:###/TypeCode:###/SelCal:###
// SendFlightPlan/Departure:####/Arrival:####/Alternate:####/CruiseAlt:#####/CruiseSpeed:####/Route:###/Remarks:###/DepartureTime:####/HoursEnroute:##/MinsEnroute:##/HoursFuel:##/MinsFuel:##/Equipment:#/IsVFR:####/File:true
// FetchFlightPlan
// */

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