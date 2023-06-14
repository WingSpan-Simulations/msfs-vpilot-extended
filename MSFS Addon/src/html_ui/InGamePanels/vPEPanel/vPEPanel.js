(function (exports, msfssdk) {
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

    class InputBar extends msfssdk.DisplayComponent {
        constructor(props) {
            super(props);
            this.ref = msfssdk.FSComponent.createRef();
        }
        onAfterRender(node) {
            this.ref.instance.addEventListener("input", () => {
                let input = this.ref.instance._valueStr;
                if (input !== undefined) {
                    if (this.props.transformInput) {
                        input = this.props.transformInput(input);
                        this.ref.instance.setValue(input);
                    }
                    if (this.props.onInput) {
                        this.props.onInput(input, this.ref);
                    }
                    if (this.props.requireInput) {
                        if (input == "") {
                            this.setInputError();
                        }
                        else {
                            this.setInputError(true);
                        }
                    }
                }
            });
            if (this.props.requireInput) {
                this.setInputError();
            }
        }
        setInputError(remove) {
            if (this.ref.instance.classList.contains("error") !== true && remove !== true) {
                this.ref.instance.classList.add("error");
            }
            else if (this.ref.instance.classList.contains("error") === true && remove === true) {
                this.ref.instance.classList.remove("error");
            }
        }
        getInputBar() {
            return this.ref;
        }
        render() {
            return (msfssdk.FSComponent.buildComponent("ui-input", { ref: this.ref, class: this.props.class, id: this.props.id, type: "text", "no-tooltip": true, "no-key-navigation": true, "not-pad-interactive": true, idevent: "0" }));
        }
    }

    const alphanumericRegex$1 = /^[A-Za-z0-9]*$/;
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
                aircraft: [],
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
            this.connectRef.instance.addEventListener("click", (ev) => { this.connectToServer(); });
            this.errors.sub(() => { this.renderErrors(); });
            this.setInputColours(this.callsignRef.instance.getInputBar());
            this.renderErrors();
            checkSimVarLoaded.then(() => {
                let aircraftModel = SimVar.GetSimVarValue("ATC MODEL", "string");
                this.aircraftRef.instance.getInputBar().instance.setValue(aircraftModel.slice(3, aircraftModel.length));
                this.aircraft = aircraftModel;
            });
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
                errorHolder.innerHTML = errors.map(error => `<span class="text-base">- ${error}</span>`).join("\n");
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
                this.props.publisher.pub("connectToNetwork", {
                    callsign: this.callsign,
                    aircraft: this.aircraft,
                    selcal: this.selcal
                });
            }
        }
        transformInput(input, maxLength, regex) {
            let newInput = input.toUpperCase().slice(0, maxLength);
            if (regex.test(newInput) !== true) {
                newInput = newInput.slice(0, newInput.length - 1);
            }
            return newInput;
        }
        onCallsignInput(input, ref) {
            this.callsign = input;
            let errors = Object.assign({}, this.errors.get());
            errors.callsign = this.checkInputErrors(this.callsign, ref, [
                (input) => input.length < 2 && inputErrors.callsign.tooShort,
                (input) => input.length > 7 && inputErrors.callsign.tooLong,
                (input) => alphanumericRegex$1.test(input) !== true && inputErrors.callsign.alphanumeric
            ]);
            this.errors.set(errors);
        }
        onAircraftInput(input, ref) {
            this.aircraft = input;
            let errors = Object.assign({}, this.errors.get());
            errors.aircraft = this.checkInputErrors(this.aircraft, ref, [
                (input) => input.length <= 0 && inputErrors.aircraft.tooShort,
                (input) => input.length > 4 && inputErrors.aircraft.tooLong,
                (input) => alphanumericRegex$1.test(input) !== true && inputErrors.aircraft.alphanumeric
            ]);
            this.errors.set(errors);
        }
        onSelcalInput(input, ref) {
            this.selcal = input;
            let errors = Object.assign({}, this.errors.get());
            errors.selcal = this.checkInputErrors(this.selcal, ref, [
                (input) => (input.length != 0 || selcalRegex.test(this.selcal) !== true) && inputErrors.selcal
            ]);
            this.errors.set(errors);
        }
        render() {
            return (msfssdk.FSComponent.buildComponent("div", { class: "hidden mx-2 pt-2", ref: this.pageRef },
                msfssdk.FSComponent.buildComponent("div", { class: "grid grid-cols-1 justify-items-center pb-2" },
                    msfssdk.FSComponent.buildComponent("span", { class: "font-bold" }, "Connect to network")),
                msfssdk.FSComponent.buildComponent("hr", { class: "pb-1" }),
                msfssdk.FSComponent.buildComponent("div", { ref: this.errorRef, class: "hidden error-bg w-100 h-auto px-2 py-1 rounded-md mb-2" },
                    msfssdk.FSComponent.buildComponent("span", { class: "text-base font-bold" }, "Error"),
                    msfssdk.FSComponent.buildComponent("div", { id: "errorHolder", class: "pl-2 flex flex-col" })),
                msfssdk.FSComponent.buildComponent("div", { class: "grid grid-cols-4 mt-4" },
                    msfssdk.FSComponent.buildComponent("p", { class: "col-span-2 font-semibold" }, "Callsign"),
                    msfssdk.FSComponent.buildComponent(InputBar, { ref: this.callsignRef, onInput: this.onCallsignInput.bind(this), transformInput: (input) => { return this.transformInput(input, 7, alphanumericRegex$1); }, id: "callsign", class: "col-span-2" })),
                msfssdk.FSComponent.buildComponent("div", { class: "grid grid-cols-4 mt-2" },
                    msfssdk.FSComponent.buildComponent("p", { class: "col-span-2 font-semibold" }, "Aircraft Code"),
                    msfssdk.FSComponent.buildComponent(InputBar, { ref: this.aircraftRef, onInput: this.onAircraftInput.bind(this), transformInput: (input) => { return this.transformInput(input, 4, alphanumericRegex$1); }, id: "aircraftCode", class: "col-span-2" })),
                msfssdk.FSComponent.buildComponent("div", { class: "grid grid-cols-4 mt-2" },
                    msfssdk.FSComponent.buildComponent("p", { class: "col-span-2 font-semibold" }, "SelCal Code"),
                    msfssdk.FSComponent.buildComponent(InputBar, { ref: this.selcalRef, onInput: this.onSelcalInput.bind(this), transformInput: (input) => { return this.transformInput(input, 5, selcalRegex); }, id: "callsign", class: "col-span-2" })),
                msfssdk.FSComponent.buildComponent("new-push-button", { ref: this.connectRef, class: "w-auto mt-4 mx-4 text-center", title: "Connect" })));
        }
    }

    class InputBox extends msfssdk.DisplayComponent {
        constructor(props) {
            super(props);
            this.ref = msfssdk.FSComponent.createRef();
            this.uuid = Date.now().toString(36) + Math.random().toString(36).substring(2);
        }
        onAfterRender(node) {
            this.ref.instance.addEventListener("focus", () => {
                Coherent.trigger('FOCUS_INPUT_FIELD', this.uuid);
            });
            this.ref.instance.addEventListener("blur", () => {
                Coherent.trigger('UNFOCUS_INPUT_FIELD', this.uuid);
            });
            this.ref.instance.addEventListener("unload", () => {
                Coherent.trigger('UNFOCUS_INPUT_FIELD', this.uuid);
            });
            this.ref.instance.addEventListener("input", () => {
                let input = this.ref.instance.value;
                if (input !== undefined) {
                    if (this.props.transformInput) {
                        input = this.props.transformInput(input);
                        this.ref.instance.value = input;
                    }
                    if (this.props.onInput) {
                        this.props.onInput(input, this.ref);
                    }
                }
            });
        }
        getInputBar() {
            return this.ref;
        }
        render() {
            return (msfssdk.FSComponent.buildComponent("textarea", { rows: "3", cols: "33", ref: this.ref, class: `default-textarea ${this.props.class}`, id: this.props.id, type: "text", "no-tooltip": true, "no-key-navigation": true, "not-pad-interactive": true, idevent: "0" }));
        }
    }

    class ScrollButton extends msfssdk.DisplayComponent {
        constructor(props) {
            super(props);
            this.ref = msfssdk.FSComponent.createRef();
        }
        onAfterRender(node) {
            this.switchText = this.ref.instance.querySelector(".centered-text span") || undefined;
            if (this.switchText !== undefined)
                this.switchText.addEventListener("DOMSubtreeModified", () => {
                    var _a;
                    let input = ((_a = this.switchText) === null || _a === void 0 ? void 0 : _a.innerHTML) || "";
                    if (this.props.onClick) {
                        this.props.onClick(input);
                    }
                });
        }
        render() {
            return (msfssdk.FSComponent.buildComponent("new-list-button", { style: "width: 0px", ref: this.ref, class: this.props.class, id: this.props.class, choices: this.props.choices.join(",") }));
        }
    }

    const alphanumericRegex = /^[A-Za-z0-9]*$/;
    const alphabetRegex = /^[A-Za-z]*$/;
    const numericRegex = /^[0-9]*$/;
    const timeSplitRegex = /^\d{1,2}(:\d{0,2})?$/;
    const ICAOMaxLength = 4;
    const departTimeMaxLength = 4;
    const timeSplitMaxLength = 5;
    class FlightPlanPage extends msfssdk.DisplayComponent {
        constructor(props) {
            super(props);
            this.pageRef = msfssdk.FSComponent.createRef();
            this.fileButtonRef = msfssdk.FSComponent.createRef();
            this.selectedFlightRules = "instrument";
            this.selectedVoice = "send + receive";
            this.departureICAO = "";
            this.arrivalICAO = "";
            this.alternateICAO = "";
            this.departureTime = 0;
            this.timeEnroute = { hours: 0, minutes: 0 };
            this.fuelAvailable = { hours: 0, minutes: 0 };
            this.cruiseSpeed = 0;
            this.cruiseAlt = 0;
            this.route = "";
            this.remarks = "";
            this.equipment = "";
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
            this.fileButtonRef.instance.addEventListener("click", () => {
                this.props.publisher.pub("fileFlightPlan", {
                    departure: this.departureICAO,
                    arrival: this.arrivalICAO,
                    alternate: this.alternateICAO,
                    cruiseAlt: this.cruiseSpeed,
                    cruiseSpeed: this.cruiseAlt,
                    route: this.route,
                    remarks: this.remarks,
                    departureTime: this.departureTime,
                    hoursEnroute: this.timeEnroute.hours,
                    minsEnroute: this.timeEnroute.minutes,
                    hoursFuel: this.fuelAvailable.hours,
                    minsFuel: this.fuelAvailable.minutes,
                    equipment: this.equipment,
                    isVFR: this.selectedFlightRules == "visual"
                });
            });
        }
        transformText(maxLength, regex, input) {
            let newInput = input.toUpperCase().slice(0, maxLength);
            if (regex.test(newInput) !== true) {
                newInput = newInput.slice(0, newInput.length - 1);
            }
            return newInput;
        }
        onFlightRuleInput(input) { this.selectedFlightRules = input; }
        onVoiceInput(input) { this.selectedVoice = input; }
        onDepartureInput(input) { this.departureICAO = input; }
        onArrivalInput(input) { this.arrivalICAO = input; }
        onAlternateInput(input) { this.alternateICAO = input; }
        onDepartureTimeInput(input) { this.departureTime = Number(input); }
        onCruiseSpeedInput(input) { this.cruiseSpeed = Number(input); }
        onCruiseAltitudeInput(input) { this.cruiseAlt = Number(input); }
        onRouteInput(input) { this.route = input; }
        onRemarksInput(input) { this.remarks = input; }
        onEquipmentInput(input) { this.equipment = input; }
        onTimeEnrouteInput(input) {
            let time = input.split(":");
            this.timeEnroute.hours = Number(time[0]);
            this.timeEnroute.minutes = Number(time[1]);
        }
        onFuelAvailableInput(input) {
            let time = input.split(":");
            this.timeEnroute.hours = Number(time[0]);
            this.timeEnroute.minutes = Number(time[1]);
        }
        transformDepartureTimeInput(input) {
            let newInput = input.slice(0, departTimeMaxLength);
            if (numericRegex.test(newInput) !== true) {
                newInput = newInput.slice(0, newInput.length - 1);
            }
            let hours = newInput.slice(0, 2);
            let mins = newInput.slice(2, 4);
            let correctedInput = "";
            if (Number(hours) > 24) {
                correctedInput = "24";
            }
            else {
                correctedInput = hours;
            }
            if (mins !== "" && Number(mins) > 59) {
                correctedInput = correctedInput + "59";
            }
            else {
                correctedInput = correctedInput + mins;
            }
            return correctedInput;
        }
        checkForErrors(ref) {
            if (ref.instance.value == "" && ref.instance.classList.contains("error") !== true) {
                ref.instance.classList.add("error");
            }
            else if (ref.instance.classList.contains("error") === true) {
                ref.instance.classList.remove("error");
            }
        }
        render() {
            return (msfssdk.FSComponent.buildComponent("div", { class: "hidden", ref: this.pageRef },
                msfssdk.FSComponent.buildComponent("virtual-scroll", { direction: "y", "scroll-type": "auto" },
                    msfssdk.FSComponent.buildComponent("p", { class: "col-span-1 font-semibold px-1" }, "Flight Rules"),
                    msfssdk.FSComponent.buildComponent(ScrollButton, { onClick: this.onFlightRuleInput.bind(this), class: "pt-1", choices: ["instrument", "visual"] }),
                    msfssdk.FSComponent.buildComponent("p", { class: "col-span-1 font-semibold px-1" }, "Voice"),
                    msfssdk.FSComponent.buildComponent(ScrollButton, { onClick: this.onVoiceInput.bind(this), class: "pt-1", choices: ["send + receive", "receive only", "text only"] }),
                    msfssdk.FSComponent.buildComponent("div", { class: "grid grid-cols-3 pt-1" },
                        msfssdk.FSComponent.buildComponent("p", { class: "col-span-1 font-semibold px-1" }, "Departure"),
                        msfssdk.FSComponent.buildComponent("p", { class: "col-span-1 font-semibold px-1" }, "Arrival"),
                        msfssdk.FSComponent.buildComponent("p", { class: "col-span-1 font-semibold px-1" }, "Alternate")),
                    msfssdk.FSComponent.buildComponent("div", { class: "grid grid-cols-3" },
                        msfssdk.FSComponent.buildComponent(InputBar, { requireInput: true, onInput: this.onDepartureInput.bind(this), transformInput: this.transformText.bind(this, ICAOMaxLength, alphanumericRegex), class: "col-span-1 px-1" }),
                        msfssdk.FSComponent.buildComponent(InputBar, { onInput: this.onArrivalInput.bind(this), transformInput: this.transformText.bind(this, ICAOMaxLength, alphanumericRegex), class: "col-span-1 px-1" }),
                        msfssdk.FSComponent.buildComponent(InputBar, { onInput: this.onAlternateInput.bind(this), transformInput: this.transformText.bind(this, ICAOMaxLength, alphanumericRegex), class: "col-span-1 px-1" })),
                    msfssdk.FSComponent.buildComponent("div", { class: "grid grid-cols-2 pt-1" },
                        msfssdk.FSComponent.buildComponent("p", { class: "col-span-1 font-semibold px-1" }, "Departure Time"),
                        msfssdk.FSComponent.buildComponent("p", { class: "col-span-1 font-semibold px-1" }, "Equipment Suffix")),
                    msfssdk.FSComponent.buildComponent("div", { class: "grid grid-cols-2" },
                        msfssdk.FSComponent.buildComponent("div", { class: "flex" },
                            msfssdk.FSComponent.buildComponent("div", { class: "grid grid-cols-3" },
                                msfssdk.FSComponent.buildComponent(InputBar, { requireInput: true, onInput: this.onDepartureTimeInput.bind(this), transformInput: this.transformDepartureTimeInput, class: "px-1 col-span-2" }),
                                msfssdk.FSComponent.buildComponent("p", { class: "px-1 m-auto col-span-1" }, "hhmm zulu"))),
                        msfssdk.FSComponent.buildComponent("div", { class: "flex" },
                            msfssdk.FSComponent.buildComponent(InputBar, { onInput: this.onEquipmentInput.bind(this), transformInput: this.transformText.bind(this, 1, alphabetRegex), class: "px-1" }))),
                    msfssdk.FSComponent.buildComponent("div", { class: "grid grid-cols-2 pt-1" },
                        msfssdk.FSComponent.buildComponent("p", { class: "col-span-1 font-semibold px-1" }, "Time Enroute"),
                        msfssdk.FSComponent.buildComponent("p", { class: "col-span-1 font-semibold px-1" }, "Fuel Available")),
                    msfssdk.FSComponent.buildComponent("div", { class: "grid grid-cols-2" },
                        msfssdk.FSComponent.buildComponent("div", { class: "flex" },
                            msfssdk.FSComponent.buildComponent(InputBar, { onInput: this.onTimeEnrouteInput.bind(this), transformInput: this.transformText.bind(this, timeSplitMaxLength, timeSplitRegex), class: "px-1" }),
                            msfssdk.FSComponent.buildComponent("p", { class: "px-1 m-auto" }, "hh:mm")),
                        msfssdk.FSComponent.buildComponent("div", { class: "flex" },
                            msfssdk.FSComponent.buildComponent(InputBar, { onInput: this.onFuelAvailableInput.bind(this), transformInput: this.transformText.bind(this, timeSplitMaxLength, timeSplitRegex), class: "px-1" }),
                            msfssdk.FSComponent.buildComponent("p", { class: "px-1 m-auto" }, "hh:mm"))),
                    msfssdk.FSComponent.buildComponent("div", { class: "grid grid-cols-2 pt-1" },
                        msfssdk.FSComponent.buildComponent("p", { class: "col-span-1 font-semibold px-1" }, "Cruise Speed"),
                        msfssdk.FSComponent.buildComponent("p", { class: "col-span-1 font-semibold px-1" }, "Cruise Alt")),
                    msfssdk.FSComponent.buildComponent("div", { class: "grid grid-cols-2" },
                        msfssdk.FSComponent.buildComponent("div", { class: "flex" },
                            msfssdk.FSComponent.buildComponent(InputBar, { requireInput: true, onInput: this.onCruiseSpeedInput.bind(this), transformInput: this.transformText.bind(this, timeSplitMaxLength, numericRegex), class: "px-1" }),
                            msfssdk.FSComponent.buildComponent("p", { class: "px-1 m-auto" }, "TAS")),
                        msfssdk.FSComponent.buildComponent("div", { class: "flex" },
                            msfssdk.FSComponent.buildComponent(InputBar, { requireInput: true, onInput: this.onCruiseSpeedInput.bind(this), transformInput: this.transformText.bind(this, timeSplitMaxLength, numericRegex), class: "px-1" }),
                            msfssdk.FSComponent.buildComponent("p", { class: "px-1 m-auto" }, "ft"))),
                    msfssdk.FSComponent.buildComponent("p", { class: "font-semibold pt-1 px-1" }, "Route"),
                    msfssdk.FSComponent.buildComponent(InputBox, { onInput: this.onRouteInput.bind(this), transformInput: (input) => { return input.toUpperCase(); }, class: "mx-1" }),
                    msfssdk.FSComponent.buildComponent("p", { class: "font-semibold pt-1 px-1" }, "Remarks"),
                    msfssdk.FSComponent.buildComponent(InputBox, { onInput: this.onRemarksInput.bind(this), transformInput: (input) => { return input.toUpperCase(); }, class: "mx-1" })),
                msfssdk.FSComponent.buildComponent("new-push-button", { ref: this.fileButtonRef, class: "w-auto mt-2 mx-2 text-center", title: "File" })));
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
                this.websocket.send(`ConnectToNetwork/Callsign:${values.callsign}/TypeCode:${values.aircraft}/SelCal:${values.selcal}`);
            });
            this.subscriber.on("disconnectFromNetwork").handle(() => {
                this.websocket.send("DisconnectFromNetwork");
            });
            this.subscriber.on("fileFlightPlan").handle((values) => {
                // console.log(`SendFlight/Departure:${values.departure}/Arrival:${values.arrival}/Alternate:${values.alternate}/CruiseAlt:${values.cruiseAlt}/CruiseSpeed:${values.cruiseSpeed}/Route:${values.route}/Remarks:${values.remarks}/DepartureTime:${values.departureTime}/HoursEnroute:${values.hoursEnroute}/MinsEnroute:${values.minsEnroute}/HoursFuel:${values.hoursFuel}/MinsFuel:${values.minsFuel}/IsVFR:${values.isVFR}`)
                this.websocket.send(`SendFlightPlan/Departure:${values.departure}/Arrival:${values.arrival}/Alternate:${values.alternate}/CruiseAlt:${values.cruiseAlt}/CruiseSpeed:${values.cruiseSpeed}/Route:${values.route}/Remarks:${values.remarks}/DepartureTime:${values.departureTime}`);
                this.websocket.send(`SendFlightPlan/HoursEnroute:${values.hoursEnroute}/MinsEnroute:${values.minsEnroute}/HoursFuel:${values.hoursFuel}/MinsFuel:${values.minsFuel}/EquipmentCode:${values.equipment}/IsVFR:${values.isVFR}`);
                this.websocket.send(`FileFlightPlan/`);
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
                    break;
                case "DisconnectedFromNetwork":
                    this.publisher.pub("callsign", undefined);
                    break;
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
    const checkSimVarLoaded = new Promise(resolve => {
        const interval = setInterval(() => {
            if (window.simvar !== undefined) {
                clearInterval(interval);
                resolve(true);
            }
        });
    });
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
        onAfterRender(node) {
            this.disconnectRef.instance.addEventListener("click", () => {
                publisher.pub("disconnectFromNetwork", true);
            });
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
                msfssdk.FSComponent.buildComponent("ingame-ui", { id: "vPE_Frame", "panel-id": "PANEL_VPILOT_EXTENDER", class: "ingameUiFrame panelInvisible", title: "vPE", "min-width": "40", "min-height": "40" },
                    msfssdk.FSComponent.buildComponent("div", { id: "header", ref: this.headerRef, class: "mx-1 pb-2 hidden" },
                        msfssdk.FSComponent.buildComponent("tab-menu", { selectedIndex: "0" },
                            msfssdk.FSComponent.buildComponent("tabmenu-item", { "tab-id": "Tab1", id: "TabSwitch1", title: "Flight Plan" }),
                            msfssdk.FSComponent.buildComponent("tabmenu-item", { "tab-id": "Tab2", id: "TabSwitch2", title: "Online ATC" })),
                        msfssdk.FSComponent.buildComponent("div", { class: "grid grid-cols-3" },
                            msfssdk.FSComponent.buildComponent("div", { class: "flex justify-center items-center" },
                                msfssdk.FSComponent.buildComponent("span", { class: "font-bold text-base" }, this.callsign)),
                            msfssdk.FSComponent.buildComponent("div", { class: "col-span-2" },
                                msfssdk.FSComponent.buildComponent("new-push-button", { ref: this.disconnectRef, style: "width: 100%", class: "mt-1", title: "Disconnect" })))),
                    msfssdk.FSComponent.buildComponent("div", { id: "main" },
                        msfssdk.FSComponent.buildComponent(AwaitingConnection, { ref: this.awaitConnectionRef, timeToRetry: this.timeToRetry }),
                        msfssdk.FSComponent.buildComponent(FlightPlanPage, { ref: this.flightPlanRef, publisher: publisher }),
                        msfssdk.FSComponent.buildComponent(ConnectPage, { ref: this.vatsimConnectRef, publisher: publisher })),
                    msfssdk.FSComponent.buildComponent("div", { class: "condensedPanel", id: "footer" }))));
        }
    }
    document.addEventListener("DOMContentLoaded", () => {
        msfssdk.FSComponent.render(msfssdk.FSComponent.buildComponent(VPEPanel, null), document.getElementById("vPEPanel"));
    });
    checkAutoload();

    exports.checkSimVarLoaded = checkSimVarLoaded;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({}, msfssdk);
