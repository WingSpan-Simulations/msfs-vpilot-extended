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
        render() {
            console.log("Rendering awaiting connection");
            return (msfssdk.FSComponent.buildComponent("div", { class: 'awaiting-connection' },
                msfssdk.FSComponent.buildComponent("div", { class: "awaiting-connection-inner" },
                    msfssdk.FSComponent.buildComponent(LoadingIcon, null),
                    msfssdk.FSComponent.buildComponent("p", null, "Awaiting vPilot Connection..."),
                    msfssdk.FSComponent.buildComponent("p", { class: "pt-2 text-lg" }, "Retrying in 30s"))));
        }
    }

    document.addEventListener('beforeunload', function () {
    }, false);
    class VPEPanel extends msfssdk.DisplayComponent {
        constructor(props) {
            super(props);
            this.mainDisplay = msfssdk.FSComponent.createRef();
        }
        render() {
            return (msfssdk.FSComponent.buildComponent("ingamepanel-custom", null,
                msfssdk.FSComponent.buildComponent("ingame-ui", { id: "vPE_Frame", "panel-id": "PANEL_VPILOT_EXTENDER", class: "ingameUiFrame panelInvisible", title: "vPE", "content-fit": "true", "min-width": "100", "min-height": "160" },
                    msfssdk.FSComponent.buildComponent("div", { id: "header" }, "Header"),
                    msfssdk.FSComponent.buildComponent("div", { id: "main" },
                        msfssdk.FSComponent.buildComponent(AwaitingConnection, null)),
                    msfssdk.FSComponent.buildComponent("div", { class: "condensedPanel", id: "footer" }, "Footer"))));
        }
    }
    document.addEventListener('DOMContentLoaded', () => {
        msfssdk.FSComponent.render(msfssdk.FSComponent.buildComponent(VPEPanel, null), document.getElementById('vPEPanel'));
    });
    checkAutoload();

})(msfssdk);
