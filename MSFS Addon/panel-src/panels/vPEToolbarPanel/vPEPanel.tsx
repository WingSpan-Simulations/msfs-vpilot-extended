/// <reference path="../../../types/msfs/common.d.ts"/>

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

class vPEPanel extends TemplateElement {
  panelActive = false;
  started = false;
  ingameUi: any = null;
  busy = false;

  constructor() {
    super();

    console.log("VPE CONSTRUCTOR CALLED");
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this.ingameUi = this.querySelector("ingame-ui");
    console.log("Rendering");

    document.getElementById("Footer")?.append("Texting Texting 123");

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
