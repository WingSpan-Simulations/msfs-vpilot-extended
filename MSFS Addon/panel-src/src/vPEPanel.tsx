/// <reference types="../../../../Tools/msfs-avionics-mirror/src/msfstypes/JS/common" />

import { FSComponent } from 'msfssdk';
import { AwaitingConnection } from "./components/awaitingConnection";

class vPEPanel extends TemplateElement {
    get templateID(): string {
        return 'vPEPanel';
    }

    panelActive = false;
    started = false;
    ingameUi: any = null;
    busy = false;

    constructor() {
        super();

        console.log("VPE CONSTRUCTOR CALLED")
    }

    public connectedCallback(): void {
        super.connectedCallback();
        this.ingameUi = this.querySelector('ingame-ui');
        console.log("Rendering")

        document.getElementById('Footer')?.append("Texting Texting 123");

        FSComponent.render(<AwaitingConnection />, document.getElementById('PanelContent'));
    }

    initialize() {
        if (this.started) {
            return;
        }

        this.started = true;
    }

    disconnectedCallback() {
        super.disconnectedCallback();
    }
}

console.log("VPEEEEEEEEE")

window.customElements.define("ingamepanel-vpe", vPEPanel);
checkAutoload();