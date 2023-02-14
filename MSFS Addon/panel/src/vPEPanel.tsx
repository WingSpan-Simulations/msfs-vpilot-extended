import { DisplayComponent, FSComponent, NodeReference, SimVarValueType, VNode } from 'msfssdk';
import { AwaitingConnection } from "./components/awaitingConnection";

let panelLoaded = false;
document.addEventListener('beforeunload', function() {
    panelLoaded = true
}, false);

interface vPEPanelProps {}
interface VPEPanel {
    mainDisplay: NodeReference<DisplayComponent<any, any> | HTMLElement>
    minPanelSize: {width: number, height: number}
}
class VPEPanel extends DisplayComponent<any> {
    constructor(props: vPEPanelProps) {
        super(props);
        
        this.mainDisplay = FSComponent.createRef();
    }


    render(): VNode | null {
        return (
            <ingamepanel-custom>
                <ingame-ui id="vPE_Frame" panel-id="PANEL_VPILOT_EXTENDER" class="ingameUiFrame panelInvisible" title="vPE" content-fit="true" min-width="100" min-height="160">
                    <div id="header">
                        Header
                    </div>

                    <div id="main">
                        <AwaitingConnection />
                    </div>

                    <div class="condensedPanel" id="footer">
                        Footer
                    </div>
                </ingame-ui>
            </ingamepanel-custom>
        )
    }
}

document.addEventListener('DOMContentLoaded', () => {
    FSComponent.render(<VPEPanel />, document.getElementById('vPEPanel'))
})

checkAutoload();
