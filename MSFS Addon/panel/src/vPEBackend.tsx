import { EventBus, Publisher } from "msfssdk";

const websocketUri = "ws://127.0.0.1:8080/";

export interface BackendEvents {
	establishedConnection: boolean;
	timeToRetry: number;
}

export interface Backend {
	publisher: Publisher<BackendEvents>

	websocket: WebSocket;
	awaitingConnection: boolean;
	connectionInterval: NodeJS.Timer | undefined;
	timeToRetry: number;
}
export class Backend {
	constructor(eventBus: EventBus) {
		this.websocket;
		this.publisher = eventBus.getPublisher<BackendEvents>();

		this.createWebsocket();
	}

	handleEstablishedConnection(e: any) {
		this.awaitingConnection = false;
		this.publisher.pub("establishedConnection", true);
	}

	handleMessage(e: any) {
		console.log(`WebSocket Message: ${e.data}`);
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
