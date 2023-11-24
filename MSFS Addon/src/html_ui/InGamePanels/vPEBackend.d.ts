export interface NetworkConnect {
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
    newMessage: MessageProps;
    deleteMessage: string;
}

export interface FrontendEvents {
    connectToNetwork: NetworkConnect;
    disconnectFromNetwork: boolean;
    fileFlightPlan: vPEFlightPlan;
    fetchFlightPlan: boolean;
	setRadioKey: number;
    sendMessage: string;
}