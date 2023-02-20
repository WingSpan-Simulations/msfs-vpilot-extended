import {
    ComponentProps,
    DisplayComponent,
    EventBus,
    FSComponent,
    NodeReference,
    SimVarValueType,
    Subject,
    VNode,
} from "msfssdk";
import { AwaitingConnection } from "./components/awaitingConnection";
import { ConnectPage } from "./components/connectPage";
import { FlightPlanPage } from "./components/flightPlan";
import { Backend, BackendEvents, FrontendEvents } from "./vPEBackend";

const eventBus = new EventBus();
const subscriber = eventBus.getSubscriber<BackendEvents>();
const publisher = eventBus.getPublisher<FrontendEvents>();
const backend = new Backend(eventBus);

type possiblePages = "awaitConnection" | "vatsimConnect" | "flightPlan"

interface vPEPanelProps extends ComponentProps { }
interface VPEPanel {
    awaitConnectionRef: NodeReference<AwaitingConnection>
    flightPlanRef: NodeReference<FlightPlanPage>
    headerRef: NodeReference<HTMLDivElement>
    vatsimConnectRef: NodeReference<ConnectPage>

    connection: boolean;
    timeToRetry: Subject<number>;
    callsign: Subject<string | undefined>;
}
class VPEPanel extends DisplayComponent<vPEPanelProps> {
    constructor(props: vPEPanelProps) {
        super(props);

        this.awaitConnectionRef = FSComponent.createRef<AwaitingConnection>();
        this.headerRef = FSComponent.createRef<HTMLDivElement>();
        this.flightPlanRef = FSComponent.createRef<FlightPlanPage>();
        this.vatsimConnectRef = FSComponent.createRef<ConnectPage>();

        this.connection = false;
        this.timeToRetry = Subject.create<number>(0);
        this.callsign = Subject.create<string | undefined>(undefined);

        subscriber.on("establishedConnection").handle(value => this.websocketConnectionStateChanged(value));
        subscriber.on("timeToRetry").handle(value => { this.timeToRetry.set(value) });
        subscriber.on("callsign").handle(value => this.vatsimConnectionStateChanged(value))
    }

    vatsimConnectionStateChanged(callsign?: string) {
        let connected = callsign !== undefined

        if (connected == true) {
            this.showPage("flightPlan")
            if (this.headerRef.instance.classList.contains("hidden")) {
                this.headerRef.instance.classList.remove("hidden")
            }
        } else {
            this.showPage("vatsimConnect")
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
            ["flightPlan"]: this.flightPlanRef
        }

        Object.entries(pagesToRefs).forEach((kvpair: any) => {
            let refName = kvpair[0];
            let ref = kvpair[1];

            if (page !== undefined && refName == page) {
                ref.instance.show()
            } else {
                ref.instance.hide()
            }
        })
    }

    websocketConnectionStateChanged(open: boolean) {
        this.connection = open;

        if (this.connection == true) {
            this.showPage("vatsimConnect")
        } else {
            this.showPage("awaitConnection")
        }
    }

    render(): VNode | null {
        return (
            <ingamepanel-custom>
                <ingame-ui
                    id="vPE_Frame"
                    panel-id="PANEL_VPILOT_EXTENDER"
                    class="ingameUiFrame panelInvisible"
                    title="vPE"
                    content-fit="true"
                    min-width="100px"
                    min-height="160px"
                >
                    <div id="header" ref={this.headerRef} class="mx-1 pb-2 hidden">
                        <tab-menu selectedIndex="0">
                            <tabmenu-item tab-id="Tab1" id="TabSwitch1" title="Flight Plan" />
                            <tabmenu-item tab-id="Tab2" id="TabSwitch2" title="Online ATC" />
                        </tab-menu>

                        <div class="grid grid-cols-3">
                            <div class="flex justify-center items-center">
                                <span class="font-bold text-base">{this.callsign}</span>
                            </div>
                            <div class="col-span-2">
                                <new-push-button style="width: 100%" class="mt-1" title={"Disconnect"} />
                            </div>
                        </div>
                    </div>

                    <div id="main">
                        <AwaitingConnection ref={this.awaitConnectionRef} timeToRetry={this.timeToRetry} />
                        <FlightPlanPage ref={this.flightPlanRef} />
                        <ConnectPage ref={this.vatsimConnectRef} publisher={publisher} />
                    </div>

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
