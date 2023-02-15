(function (msfssdk) {
    'use strict';

    class LoadingIcon extends msfssdk.DisplayComponent {
        render() {
            return (msfssdk.FSComponent.buildComponent("div", { id: "loading-icon" },
                msfssdk.FSComponent.buildComponent("icon-stack", { created: "true", "data-input-group": "ICON-STACK" },
                    msfssdk.FSComponent.buildComponent("icon-element", { "data-url": "/icons/ICON_LOADING.svg" }))));
        }
    }

    class AwaitingConnection extends msfssdk.DisplayComponent {
        constructor(props) {
            super(props);
            this.mainRef = msfssdk.FSComponent.createRef();
        }
        hide() {
            this.mainRef.instance.classList.add('hidden');
        }
        show() {
            if (this.mainRef.instance.classList.contains('hidden')) {
                this.mainRef.instance.classList.remove('hidden');
            }
        }
        render() {
            return (msfssdk.FSComponent.buildComponent("div", { class: 'awaiting-connection', ref: this.mainRef },
                msfssdk.FSComponent.buildComponent("div", { class: "awaiting-connection-inner" },
                    msfssdk.FSComponent.buildComponent(LoadingIcon, null),
                    msfssdk.FSComponent.buildComponent("p", { class: "pt-3" }, "Awaiting vPilot Connection..."),
                    msfssdk.FSComponent.buildComponent("p", { class: "pt-2 text-base font-light" }, this.props.timeToRetry.map((time) => {
                        let establishText = `Attempting to re-establish in ${time}s`;
                        if (time == 0) {
                            establishText = "Attempting to establish";
                        }
                        return establishText;
                    })))));
        }
    }

    const websocketUri = "ws://127.0.0.1:8080/";
    class Backend {
        constructor(eventBus) {
            this.websocket;
            this.publisher = eventBus.getPublisher();
            this.createWebsocket();
        }
        handleEstablishedConnection(e) {
            this.awaitingConnection = false;
            this.publisher.pub("establishedConnection", true);
        }
        handleMessage(e) {
            console.log(`WebSocket Message: ${e.data}`);
        }
        handleError(e) {
            console.log(`!! WebSocket Error: ${e.data} !!`);
        }
        handleConnectionClose(e) {
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
            this.awaitingConnection = false;
            this.websocket = new WebSocket(websocketUri);
            this.websocket.onopen = (e) => this.handleEstablishedConnection(e);
            this.websocket.onclose = (e) => this.handleConnectionClose(e);
            this.websocket.onmessage = (e) => this.handleMessage(e);
            this.websocket.onerror = (e) => this.handleError(e);
        }
    }

    const eventBus = new msfssdk.EventBus();
    const subscriber = eventBus.getSubscriber();
    new Backend(eventBus);
    class VPEPanel extends msfssdk.DisplayComponent {
        constructor(props) {
            super(props);
            this.awaitConnectionRef = msfssdk.FSComponent.createRef();
            this.connection = false;
            this.timeToRetry = msfssdk.Subject.create(0);
            subscriber.on("establishedConnection").handle(value => this.connectionStateChanged(value));
            subscriber.on("timeToRetry").handle(value => this.connectionRetryTimeChange(value));
        }
        connectionStateChanged(open) {
            this.connection = open;
            if (this.connection == true) {
                this.awaitConnectionRef.instance.hide();
            }
            else {
                this.awaitConnectionRef.instance.show();
            }
        }
        connectionRetryTimeChange(timeToRetry) {
            this.timeToRetry.set(timeToRetry);
        }
        render() {
            return (msfssdk.FSComponent.buildComponent("ingamepanel-custom", null,
                msfssdk.FSComponent.buildComponent("ingame-ui", { id: "vPE_Frame", "panel-id": "PANEL_VPILOT_EXTENDER", class: "ingameUiFrame panelInvisible", title: "vPE", "content-fit": "true", "min-width": "100px", "min-height": "160px" },
                    msfssdk.FSComponent.buildComponent("div", { id: "header" }),
                    msfssdk.FSComponent.buildComponent("div", { id: "main" },
                        msfssdk.FSComponent.buildComponent(AwaitingConnection, { ref: this.awaitConnectionRef, timeToRetry: this.timeToRetry })),
                    msfssdk.FSComponent.buildComponent("div", { class: "condensedPanel", id: "footer" }))));
        }
    }
    document.addEventListener("DOMContentLoaded", () => {
        msfssdk.FSComponent.render(msfssdk.FSComponent.buildComponent(VPEPanel, null), document.getElementById("vPEPanel"));
    });
    checkAutoload();

})(msfssdk);
