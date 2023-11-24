/// <reference types='@microsoft/msfs-types' />

import {
    ClockPublisher, ComponentProps, DisplayComponent, EventBus, FSComponent, GNSSPublisher,
    NodeReference, Subject, VNode
} from '@microsoft/msfs-sdk';

import { ButtonGroup } from './components/buttonGroup';
import { VirtualScroll } from './components/virtualScroll';
import { AwaitingConnection } from './pages/awaitingConnection';
import { ConnectPage } from './pages/connectPage';
import { FlightPlanPage } from './pages/flightPlan';
import { OnlineATC } from './pages/onlineATC';
import { Settings } from './pages/settings';
import { vPESettingSaveManager } from './SettingSaveManager';
import { checkSimVarLoaded } from './Utilites';
import { BackendEvents, FrontendEvents } from './vPEBackend';

type possiblePages = "awaitConnection" | "vatsimConnect" | "flightPlan" | "onlineATC" | "settings"

class VPEPanel extends DisplayComponent<ComponentProps> {
    private readonly bus = new EventBus();
    private readonly gnss = new GNSSPublisher(this.bus);
    private readonly clock = new ClockPublisher(this.bus);
    private readonly subscriber = this.bus.getSubscriber<BackendEvents>();
    private readonly publisher = this.bus.getPublisher<FrontendEvents>();
    private readonly settingSaveManager = new vPESettingSaveManager(this.bus)

    private readonly mainBody = document.querySelector("html")
    private readonly callsign = Subject.create<string | undefined>(undefined);
    private readonly timeToRetry = Subject.create<number>(0);
    private readonly awaitConnectionRef = FSComponent.createRef<AwaitingConnection>();
    private readonly onlineATCRef = FSComponent.createRef<OnlineATC>();
    private readonly headerRef = FSComponent.createRef<HTMLDivElement>();
    private readonly flightPlanRef = FSComponent.createRef<FlightPlanPage>();
    private readonly vatsimConnectRef = FSComponent.createRef<ConnectPage>();
    private readonly disconnectRef = FSComponent.createRef<HTMLElement>();
    private readonly scrollRef = FSComponent.createRef<VirtualScroll>();
    private readonly settingsRef = FSComponent.createRef<Settings>();

    private connection = false;

    constructor(props: ComponentProps) {
        super(props);

        checkSimVarLoaded.then(() => {
            const key = `${SimVar.GetSimVarValue('ATC MODEL', 'string')}.dev_profile_1`
            this.settingSaveManager.load(key)
            this.settingSaveManager.startAutoSave(key)
        })
    }

    onAfterRender(node: VNode): void {
        checkSimVarLoaded.then(() => {
            this.gnss.startPublish();
            this.clock.startPublish();

            this.update()
        })

        this.subscriber.on("establishedConnection").handle(value => this.websocketConnectionStateChanged(value));
        this.subscriber.on("timeToRetry").handle(value => { this.timeToRetry.set(value) });
        this.subscriber.on("networkCallsign").handle(value => this.vatsimConnectionStateChanged(value))
        this.disconnectRef.instance.addEventListener("click", () => {
            this.publisher.pub("disconnectFromNetwork", true, true)
        })

        const styleObserver = new MutationObserver(mutations => {
            let styleMutation = mutations.find((mutation) => mutation.attributeName == 'style')
            if (styleMutation) {
                this.getViewportHeight()

            }
        })
        if (this.mainBody) { styleObserver.observe(this.mainBody, { attributes: true, attributeFilter: ["style"] }) }
    }

    vatsimConnectionStateChanged(callsign?: string) {
        let connected = callsign !== undefined && callsign !== ''

        if (connected == true) {
            this.showPage("flightPlan")
            if (this.headerRef.instance.classList.contains("hidden")) {
                this.headerRef.instance.classList.remove("hidden")
            }
        } else {
            this.websocketConnectionStateChanged(this.connection)
            if (this.headerRef.instance.classList.contains("hidden") !== true) {
                this.headerRef.instance.classList.add("hidden")
            }
        }

        this.callsign.set(callsign)
    }

    showPage(page?: possiblePages) {
        const pagesToRefs: { [key: string]: any } = {
            ["vatsimConnect"]: this.vatsimConnectRef,
            ["awaitConnection"]: this.awaitConnectionRef,
            ["flightPlan"]: this.flightPlanRef,
            ["onlineATC"]: this.onlineATCRef,
            ["settings"]: this.settingsRef
        }

        Object.entries(pagesToRefs).forEach(([refName, ref]) => {
            if (page !== undefined && refName == page) {
                ref.instance.show()
            } else {
                ref.instance.hide()
            }
        })

        this.scrollRef.instance.scrollAmount = 0
    }

    websocketConnectionStateChanged(open: boolean) {
        this.connection = open;

        if (this.connection == true) {
            this.showPage("vatsimConnect")
        } else {
            this.showPage("awaitConnection")
        }
    }

    private getViewportHeight() {
        let cssVariables = this.mainBody?.style.cssText || ''
        let viewportMatch = cssVariables.match(VirtualScroll.VIEWPORT_HEIGHT_REGEX)
        this.scrollRef.instance.setViewportHeight(viewportMatch ? Number(viewportMatch[1].trim()) : 0);
    }

    private update() {
        // Only way to check if sim is destroying
        if (SimVar.GetSimVarValue("E:ABSOLUTE TIME", "seconds") == null) {
            const key = `${SimVar.GetSimVarValue('ATC MODEL', 'string')}.dev_profile_1`
            this.settingSaveManager.save(key)

            this.gnss.stopPublish()
            this.clock.stopPublish()

            if (document.activeElement && (document.activeElement as any).blur) {
                (document.activeElement as any).blur()
            }

            return;
        }

        this.gnss.onUpdate();
        this.clock.onUpdate();

        requestAnimationFrame(() => this.update())
    }


    public render(): VNode | null {
        return (
            <ingamepanel-custom>
                <ingame-ui
                    id="vPE_Frame"
                    panel-id="PANEL_VPILOT_EXTENDER"
                    class="ingameUiFrame panelInvisible"
                    title="vPE"
                    min-width="40"
                    min-height="40"
                >
                    <div id="header" ref={this.headerRef} class="mx-1 pb-2 hidden">
                        <ButtonGroup buttons={["Flight Plan", "Online ATC", "Settings"]} onInput={(input) => {
                            if (this.callsign.get() !== undefined) {
                                switch (input) {
                                    case "Flight Plan":
                                        this.showPage("flightPlan")
                                        break;
                                    case "Online ATC":
                                        this.showPage("onlineATC")
                                        break;
                                    case "Settings":
                                        this.showPage("settings")
                                        break;
                                }
                            }
                        }} />

                        <div class="grid grid-cols-3">
                            <div class="flex justify-center items-center">
                                <span class="font-bold text-base">{this.callsign}</span>
                            </div>
                            <div class="col-span-2">
                                <new-push-button ref={this.disconnectRef} style="width: 100%" class="mt-1" title={"Disconnect"} />
                            </div>
                        </div>
                    </div>

                    <VirtualScroll ref={this.scrollRef}>
                        <AwaitingConnection ref={this.awaitConnectionRef} timeToRetry={this.timeToRetry} />
                        <FlightPlanPage ref={this.flightPlanRef} bus={this.bus} />
                        <ConnectPage ref={this.vatsimConnectRef} bus={this.bus} />
                        <OnlineATC ref={this.onlineATCRef} bus={this.bus} />
                        <Settings ref={this.settingsRef} bus={this.bus} />
                    </VirtualScroll>

                    <div class="condensedPanel" id="footer"></div>
                </ingame-ui>
            </ingamepanel-custom>
        );
    }
}

document.addEventListener("DOMContentLoaded", () => {
    FSComponent.render(<VPEPanel />, document.getElementById("vPEPanel"));
});

checkAutoload();
