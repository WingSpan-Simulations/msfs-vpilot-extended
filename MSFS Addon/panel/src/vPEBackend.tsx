import { EventBus, EventSubscriber, Publisher } from "msfssdk";

const websocketUri = "ws://127.0.0.1:8080/";

/* 	INCOMING MESSAGES

NetworkConnectionEstablished/CallSign:###/TypeCode:###/SelCal:###
DisconnectedFromNetwork

======================================================================
	OUTGOING MESSAGES
ConnectToNetwork/Callsign:###/TypeCode:###/SelCal:###

*/

interface NetworkConnect {
	callsign: string;
	aircraft: string;
	selcal: string;
};
interface FileFlightPlan {
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

export interface BackendEvents {
	establishedConnection: boolean;
	timeToRetry: number;
	callsign: string | undefined;
}

export interface FrontendEvents {
	connectToNetwork: NetworkConnect;
	disconnectFromNetwork: boolean;
	fileFlightPlan: FileFlightPlan;
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
	constructor(eventBus: EventBus) {
		this.websocket;
		this.publisher = eventBus.getPublisher<BackendEvents>();
		this.subscriber = eventBus.getSubscriber<FrontendEvents>();

		this.handleFrontEndEvents()

		this.createWebsocket();
	}

	handleFrontEndEvents() {
		this.subscriber.on("connectToNetwork").handle((values) => {
			this.websocket.send(`ConnectToNetwork/Callsign:${values.callsign}/TypeCode:${values.aircraft}/SelCal:${values.selcal}`)
		})

		this.subscriber.on("disconnectFromNetwork").handle(() => {
			this.websocket.send("DisconnectFromNetwork")
		})

		this.subscriber.on("fileFlightPlan").handle((values) => {
			// console.log(`SendFlight/Departure:${values.departure}/Arrival:${values.arrival}/Alternate:${values.alternate}/CruiseAlt:${values.cruiseAlt}/CruiseSpeed:${values.cruiseSpeed}/Route:${values.route}/Remarks:${values.remarks}/DepartureTime:${values.departureTime}/HoursEnroute:${values.hoursEnroute}/MinsEnroute:${values.minsEnroute}/HoursFuel:${values.hoursFuel}/MinsFuel:${values.minsFuel}/IsVFR:${values.isVFR}`)
			this.websocket.send(`SendFlightPlan/Departure:${values.departure}/Arrival:${values.arrival}/Alternate:${values.alternate}/CruiseAlt:${values.cruiseAlt}/CruiseSpeed:${values.cruiseSpeed}/Route:${values.route}/Remarks:${values.remarks}/DepartureTime:${values.departureTime}`)
			this.websocket.send(`SendFlightPlan/HoursEnroute:${values.hoursEnroute}/MinsEnroute:${values.minsEnroute}/HoursFuel:${values.hoursFuel}/MinsFuel:${values.minsFuel}/EquipmentCode:${values.equipment}/IsVFR:${values.isVFR}`)
			this.websocket.send(`FileFlightPlan/Null:Null`)
		})
	}

	handleEstablishedConnection(e: any) {
		this.awaitingConnection = false;
		this.publisher.pub("establishedConnection", true);
	}

	handleMessage(e: any) {
		let splitMessage: Array<string> = e.data.split("/")
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


		console.log(`Type: ${type}, Args: ${args}`)

		switch (type) {
			case "NetworkConnectionEstablished":
				console.log(args)
				this.publisher.pub("callsign", args["CallSign"])
				break;
			case "DisconnectedFromNetwork":
				this.publisher.pub("callsign", undefined)
				break;
		}
	}

	handleError(e: any) {
		console.log(`!! WebSocket Error: ${e.data} !!`);
	}

	handleConnectionClose(e: any) {
		if (this.websocket) {
			this.websocket.close();
		}

		this.publisher.pub("establishedConnection", false);

		if (!this.awaitingConnection) {
			this.awaitingConnection = true;
			this.timeToRetry = 20;

			if (this.connectionInterval) {
				clearInterval(this.connectionInterval);
				this.connectionInterval = undefined;
			}

			this.connectionInterval = setInterval(() => {
				this.timeToRetry -= 1;

				this.publisher.pub("timeToRetry", this.timeToRetry);

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
