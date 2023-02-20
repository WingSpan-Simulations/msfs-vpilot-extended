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

    const alphanumericRegex = /^[A-Za-z0-9]*$/;
    const selcalRegex = /^[A-Za-z]{2}-[A-Za-z]{2}$/;
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
    };
    function flatten(arr) {
        return arr.reduce((flatArray, currentArray) => flatArray.concat(currentArray), []);
    }
    class ConnectPage extends msfssdk.DisplayComponent {
        constructor(props) {
            super(props);
            this.callsign = "";
            this.aircraft = "";
            this.selcal = "";
            this.errors = msfssdk.Subject.create({
                callsign: [inputErrors.callsign.tooShort],
                aircraft: [inputErrors.aircraft.tooShort],
                selcal: []
            });
            this.pageRef = msfssdk.FSComponent.createRef();
            this.errorRef = msfssdk.FSComponent.createRef();
            this.callsignRef = msfssdk.FSComponent.createRef();
            this.aircraftRef = msfssdk.FSComponent.createRef();
            this.selcalRef = msfssdk.FSComponent.createRef();
            this.connectRef = msfssdk.FSComponent.createRef();
        }
        hide() {
            this.pageRef.instance.classList.add('hidden');
        }
        show() {
            if (this.pageRef.instance.classList.contains('hidden')) {
                this.pageRef.instance.classList.remove('hidden');
            }
        }
        onAfterRender(node) {
            this.callsignRef.instance.addEventListener("input", (ev) => {
                if (ev.target._valueStr !== undefined) {
                    this.callsign = ev.target._valueStr;
                    let errors = Object.assign({}, this.errors.get());
                    errors.callsign = this.checkInputErrors(this.callsign, this.callsignRef, [
                        (input) => input.length < 2 && inputErrors.callsign.tooShort,
                        (input) => input.length > 7 && inputErrors.callsign.tooLong,
                        (input) => alphanumericRegex.test(input) !== true && inputErrors.callsign.alphanumeric
                    ]);
                    this.errors.set(errors);
                }
            });
            this.aircraftRef.instance.addEventListener("input", (ev) => {
                if (ev.target._valueStr !== undefined) {
                    this.aircraft = ev.target._valueStr;
                    let errors = Object.assign({}, this.errors.get());
                    errors.aircraft = this.checkInputErrors(this.aircraft, this.aircraftRef, [
                        (input) => input.length <= 0 && inputErrors.aircraft.tooShort,
                        (input) => input.length > 4 && inputErrors.aircraft.tooLong,
                        (input) => alphanumericRegex.test(input) !== true && inputErrors.aircraft.alphanumeric
                    ]);
                    this.errors.set(errors);
                }
            });
            this.selcalRef.instance.addEventListener("input", (ev) => {
                if (ev.target._valueStr !== undefined) {
                    this.selcal = ev.target._valueStr;
                    let errors = Object.assign({}, this.errors.get());
                    errors.selcal = this.checkInputErrors(this.selcal, this.selcalRef, [
                        (input) => (input.length != 0 || selcalRegex.test(this.selcal) !== true) && inputErrors.selcal
                    ]);
                    this.errors.set(errors);
                }
            });
            this.connectRef.instance.addEventListener("click", (ev) => { this.connectToServer(); });
            this.errors.sub((errors) => { this.renderErrors(); });
            this.setInputColours(this.callsignRef);
            this.setInputColours(this.aircraftRef);
            this.renderErrors();
        }
        checkInputErrors(input, ref, errorChecks) {
            let errors = [];
            errorChecks.forEach((error) => {
                let result = error(input);
                if (result !== false) {
                    errors.push(result);
                }
            });
            if (errors.length > 0) {
                this.setInputColours(ref);
            }
            else {
                this.setInputColours(ref, true);
            }
            return errors;
        }
        renderErrors() {
            let errors = flatten(Object.values(this.errors.get()));
            if (errors.length == 0) {
                if (this.errorRef.instance.classList.contains("hidden") !== true) {
                    this.errorRef.instance.classList.add("hidden");
                }
            }
            else if (errors.length > 0) {
                if (this.errorRef.instance.classList.contains("hidden")) {
                    this.errorRef.instance.classList.remove("hidden");
                }
            }
            let errorHolder = this.errorRef.instance.querySelector("#errorHolder");
            if (errorHolder) {
                errorHolder.innerHTML = errors.map(error => `<span>- ${error}</span>`).join("\n");
            }
        }
        setInputColours(ref, remove) {
            if (ref.instance.classList.contains("error") !== true && remove !== true) {
                ref.instance.classList.add("error");
            }
            else if (ref.instance.classList.contains("error") === true && remove === true) {
                ref.instance.classList.remove("error");
            }
        }
        connectToServer() {
            let errors = flatten(Object.values(this.errors.get()));
            if (errors.length == 0) {
                console.log("CLICKED");
                this.props.publisher.pub("connectToNetwork", {
                    callsign: this.callsign,
                    aircraft: this.aircraft,
                    selcal: this.selcal
                });
            }
        }
        render() {
            return (msfssdk.FSComponent.buildComponent("div", { class: "hidden mx-2 pt-2", ref: this.pageRef },
                msfssdk.FSComponent.buildComponent("div", { class: "grid grid-cols-1 justify-items-center pb-2" },
                    msfssdk.FSComponent.buildComponent("span", { class: "font-bold text-base" }, "Connect to VATSIM")),
                msfssdk.FSComponent.buildComponent("hr", { class: "pb-1" }),
                msfssdk.FSComponent.buildComponent("div", { ref: this.errorRef, class: "hidden error-bg w-100 h-auto px-2 py-1 rounded-md mb-2" },
                    msfssdk.FSComponent.buildComponent("span", { class: "text-base font-bold" }, "Error"),
                    msfssdk.FSComponent.buildComponent("div", { id: "errorHolder", class: "pl-2 flex flex-col" })),
                msfssdk.FSComponent.buildComponent("div", { class: "grid grid-cols-4 mt-4" },
                    msfssdk.FSComponent.buildComponent("p", { class: "col-span-2 font-semibold" }, "Callsign"),
                    msfssdk.FSComponent.buildComponent("ui-input", { ref: this.callsignRef, class: "col-span-2", type: "text", "no-tooltip": true, "no-key-navigation": true, "not-pad-interactive": true, idevent: "0", id: "callsign" })),
                msfssdk.FSComponent.buildComponent("div", { class: "grid grid-cols-4 mt-2" },
                    msfssdk.FSComponent.buildComponent("p", { class: "col-span-2 font-semibold" }, "Aircraft Code"),
                    msfssdk.FSComponent.buildComponent("ui-input", { ref: this.aircraftRef, class: "col-span-2", type: "text", "no-tooltip": true, "no-key-navigation": true, "not-pad-interactive": true, idevent: "0", id: "aircraftCode" })),
                msfssdk.FSComponent.buildComponent("div", { class: "grid grid-cols-4 mt-2" },
                    msfssdk.FSComponent.buildComponent("p", { class: "col-span-2 font-semibold" }, "SelCal Code"),
                    msfssdk.FSComponent.buildComponent("ui-input", { ref: this.selcalRef, class: "col-span-2", type: "text", "no-tooltip": true, "no-key-navigation": true, "not-pad-interactive": true, idevent: "0", id: "selcalCode" })),
                msfssdk.FSComponent.buildComponent("new-push-button", { ref: this.connectRef, class: "w-auto mt-4 mx-4 text-center", title: "Connect" })));
        }
    }

    class FlightPlanPage extends msfssdk.DisplayComponent {
        constructor(props) {
            super(props);
            this.pageRef = msfssdk.FSComponent.createRef();
        }
        hide() {
            this.pageRef.instance.classList.add('hidden');
        }
        show() {
            if (this.pageRef.instance.classList.contains('hidden')) {
                this.pageRef.instance.classList.remove('hidden');
            }
        }
        render() {
            return (msfssdk.FSComponent.buildComponent("div", { class: "hidden", ref: this.pageRef },
                msfssdk.FSComponent.buildComponent("p", null, "Testing flight plan...")));
        }
    }

    const websocketUri = "ws://127.0.0.1:8080/";
    class Backend {
        constructor(eventBus) {
            this.websocket;
            this.publisher = eventBus.getPublisher();
            this.subscriber = eventBus.getSubscriber();
            this.handleFrontEndEvents();
            this.createWebsocket();
        }
        handleFrontEndEvents() {
            this.subscriber.on("connectToNetwork").handle((values) => {
                this.websocket.send(`ConnectToNetwork/Callsign:${values.callsign}/TypeCode:${values.aircraft}/SelCal Code:${values.selcal}`);
            });
        }
        handleEstablishedConnection(e) {
            this.awaitingConnection = false;
            this.publisher.pub("establishedConnection", true);
        }
        handleMessage(e) {
            let splitMessage = e.data.split("/");
            let type;
            let args = {};
            splitMessage.forEach((stringPair) => {
                let strings = stringPair.split(":");
                if (strings.length == 1) {
                    type = strings[0];
                }
                else {
                    args[strings[0]] = strings[1];
                }
            });
            console.log(`Type: ${type}, Args: ${args}`);
            switch (type) {
                case "NetworkConnectionEstablished":
                    console.log(args);
                    this.publisher.pub("callsign", args["CallSign"]);
            }
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
    const publisher = eventBus.getPublisher();
    new Backend(eventBus);
    class VPEPanel extends msfssdk.DisplayComponent {
        constructor(props) {
            super(props);
            this.awaitConnectionRef = msfssdk.FSComponent.createRef();
            this.headerRef = msfssdk.FSComponent.createRef();
            this.flightPlanRef = msfssdk.FSComponent.createRef();
            this.vatsimConnectRef = msfssdk.FSComponent.createRef();
            this.connection = false;
            this.timeToRetry = msfssdk.Subject.create(0);
            this.callsign = msfssdk.Subject.create(undefined);
            subscriber.on("establishedConnection").handle(value => this.websocketConnectionStateChanged(value));
            subscriber.on("timeToRetry").handle(value => { this.timeToRetry.set(value); });
            subscriber.on("callsign").handle(value => this.vatsimConnectionStateChanged(value));
        }
        vatsimConnectionStateChanged(callsign) {
            let connected = callsign !== undefined;
            if (connected == true) {
                this.showPage("flightPlan");
                if (this.headerRef.instance.classList.contains("hidden")) {
                    this.headerRef.instance.classList.remove("hidden");
                }
            }
            else {
                this.showPage("vatsimConnect");
                if (this.headerRef.instance.classList.contains("hidden") !== true) {
                    this.headerRef.instance.classList.add("hidden");
                }
            }
            this.callsign.set(callsign);
        }
        showPage(page) {
            const pagesToRefs = {
                ["vatsimConnect"]: this.vatsimConnectRef,
                ["awaitConnection"]: this.awaitConnectionRef,
                ["flightPlan"]: this.flightPlanRef
            };
            Object.entries(pagesToRefs).forEach((kvpair) => {
                let refName = kvpair[0];
                let ref = kvpair[1];
                if (page !== undefined && refName == page) {
                    ref.instance.show();
                }
                else {
                    ref.instance.hide();
                }
            });
        }
        websocketConnectionStateChanged(open) {
            this.connection = open;
            if (this.connection == true) {
                this.showPage("vatsimConnect");
            }
            else {
                this.showPage("awaitConnection");
            }
        }
        render() {
            return (msfssdk.FSComponent.buildComponent("ingamepanel-custom", null,
                msfssdk.FSComponent.buildComponent("ingame-ui", { id: "vPE_Frame", "panel-id": "PANEL_VPILOT_EXTENDER", class: "ingameUiFrame panelInvisible", title: "vPE", "content-fit": "true", "min-width": "100px", "min-height": "160px" },
                    msfssdk.FSComponent.buildComponent("div", { id: "header", ref: this.headerRef, class: "mx-1 pb-2 hidden" },
                        msfssdk.FSComponent.buildComponent("tab-menu", { selectedIndex: "0" },
                            msfssdk.FSComponent.buildComponent("tabmenu-item", { "tab-id": "Tab1", id: "TabSwitch1", title: "Flight Plan" }),
                            msfssdk.FSComponent.buildComponent("tabmenu-item", { "tab-id": "Tab2", id: "TabSwitch2", title: "Online ATC" })),
                        msfssdk.FSComponent.buildComponent("div", { class: "grid grid-cols-3" },
                            msfssdk.FSComponent.buildComponent("div", { class: "flex justify-center items-center" },
                                msfssdk.FSComponent.buildComponent("span", { class: "font-bold text-base" }, this.callsign)),
                            msfssdk.FSComponent.buildComponent("div", { class: "col-span-2" },
                                msfssdk.FSComponent.buildComponent("new-push-button", { style: "width: 100%", class: "mt-1", title: "Disconnect" })))),
                    msfssdk.FSComponent.buildComponent("div", { id: "main" },
                        msfssdk.FSComponent.buildComponent(AwaitingConnection, { ref: this.awaitConnectionRef, timeToRetry: this.timeToRetry }),
                        msfssdk.FSComponent.buildComponent(FlightPlanPage, { ref: this.flightPlanRef }),
                        msfssdk.FSComponent.buildComponent(ConnectPage, { ref: this.vatsimConnectRef, publisher: publisher })),
                    msfssdk.FSComponent.buildComponent("div", { class: "condensedPanel", id: "footer" }))));
        }
    }
    document.addEventListener("DOMContentLoaded", () => {
        msfssdk.FSComponent.render(msfssdk.FSComponent.buildComponent(VPEPanel, null), document.getElementById("vPEPanel"));
    });
    checkAutoload();

})(msfssdk);
