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
import { Backend, BackendEvents } from "./vPEBackend";

const eventBus = new EventBus();
const subscriber = eventBus.getSubscriber<BackendEvents>();
const backend = new Backend(eventBus);

interface vPEPanelProps extends ComponentProps { }
interface VPEPanel {
    awaitConnectionRef: NodeReference<AwaitingConnection>

    connection: boolean;
    timeToRetry: Subject<number>;
}
class VPEPanel extends DisplayComponent<vPEPanelProps> {
    constructor(props: vPEPanelProps) {
        super(props);

        this.awaitConnectionRef = FSComponent.createRef<AwaitingConnection>();

        this.connection = false;
        this.timeToRetry = Subject.create<number>(0);

        subscriber.on("establishedConnection").handle(value => this.connectionStateChanged(value));
        subscriber.on("timeToRetry").handle(value => this.connectionRetryTimeChange(value));
    }

    connectionStateChanged(open: boolean) {
        this.connection = open;

        if (this.connection == true) {
            this.awaitConnectionRef.instance.hide()
        } else {
            this.awaitConnectionRef.instance.show()
        }
    }

    connectionRetryTimeChange(timeToRetry: number) {
        this.timeToRetry.set(timeToRetry);
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
                    <div id="header"></div>

                    <div id="main">
                        <AwaitingConnection ref={this.awaitConnectionRef} timeToRetry={this.timeToRetry} />
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
