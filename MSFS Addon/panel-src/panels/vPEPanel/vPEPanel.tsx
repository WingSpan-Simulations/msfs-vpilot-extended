/// <reference types="../../../types/msfstypes/JS/common" />

import React from "react";
import ReactDOM from "react-dom";
import { AwaitingConnection } from "./components/awaitingConnection";

type vPEPanelReactProps = {};
class vPEPanelReact extends React.Component<vPEPanelReactProps> {
  render() {
    return (
      <div>
        <AwaitingConnection />
      </div>
    );
  }
}

interface vPEPanel {
  panelActive: boolean;
  started: boolean;
  ingameUi: any;
  busy: boolean;
}
class vPEPanel extends TemplateElement {
  constructor() {
    super();

    this.panelActive = false;
    this.started = false;
    this.ingameUi = null;
    this.busy = false;

    console.log("VPE CONSTRUCTOR CALLED");
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this.ingameUi = this.querySelector("ingame-ui");
    console.log("Rendering");

    // document.getElementById("Footer").append("Texting Texting 123");

    ReactDOM.render(
      React.createElement(vPEPanelReact),
      document.getElementById("PanelContent")
    );
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

console.log("VPEEEEEEEEE");

window.customElements.define("ingamepanel-vpe", vPEPanel);
checkAutoload();
