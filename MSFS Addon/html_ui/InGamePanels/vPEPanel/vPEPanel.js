(function (msfssdk) {
    'use strict';

    class AwaitingConnection extends msfssdk.DisplayComponent {
        render() {
            console.log("Rendering awaiting connection");
            return (msfssdk.FSComponent.buildComponent("div", { class: 'awaiting-connection' },
                msfssdk.FSComponent.buildComponent("ui-marquee", { class: "title" },
                    msfssdk.FSComponent.buildComponent("span", null, "Awaiting Connection..."))));
        }
    }

    document.addEventListener('beforeunload', function () {
    }, false);
    class VPEPanel extends msfssdk.DisplayComponent {
        constructor(props) {
            super(props);
            this.mainDisplay = msfssdk.FSComponent.createRef();
            console.log("VPE CONSTRUCTOR CALLED");
        }
        render() {
            return (msfssdk.FSComponent.buildComponent("ingamepanel-custom", null,
                msfssdk.FSComponent.buildComponent("ingame-ui", { id: "vPEPanel_Frame", "panel-id": "PANEL_VPILOT_EXTENDER", class: "ingameUiFrame panelInvisible", title: "vPE", "content-fit": "true", "min-width": "100", "min-height": "160" },
                    msfssdk.FSComponent.buildComponent("ui-element", { class: "ingameUiContent" },
                        msfssdk.FSComponent.buildComponent(AwaitingConnection, null)))));
        }
    }
    document.addEventListener('DOMContentLoaded', () => {
        msfssdk.FSComponent.render(msfssdk.FSComponent.buildComponent(VPEPanel, null), document.getElementById('vPEPanel'));
    });
    checkAutoload();

})(msfssdk);
