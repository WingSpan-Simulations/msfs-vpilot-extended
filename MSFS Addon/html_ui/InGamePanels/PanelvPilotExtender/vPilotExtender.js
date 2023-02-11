class vPilotExtender extends TemplateElement {
    constructor() {
        super(...arguments);

        this.panelActive = false;
        this.started = false;
        this.ingameUi = null;
        this.busy = false;
        this.debugEnabled = false;

        if (this.debugEnabled) {
            setTimeout(() => {
                this.isDebugEnabled();
            }, 1000);
        } else {
            this.initialize();
        }
    }

    isDebugEnabled() {
        if (typeof g_modDebugMgr != "undefined") {
            g_modDebugMgr.AddConsole(null);
            g_modDebugMgr.AddDebugButton("Identifier", function() {
                console.log('Identifier');
                console.log(this.instrumentIdentifier);
            });
            g_modDebugMgr.AddDebugButton("TemplateID", function() {
                console.log('TemplateID');
                console.log(this.templateID);
            });
            g_modDebugMgr.AddDebugButton("Source", function() {
                console.log('Source');
                console.log(window.document.documentElement.outerHTML);
            });
			g_modDebugMgr.AddDebugButton("close", function() {
				console.log('close');
				if (this.ingameUi) {
					console.log('ingameUi');
					this.ingameUi.closePanel();
				}
			});
            this.initialize();
        } else {
            Include.addScript("/JS/debug.js", function () {
                if (typeof g_modDebugMgr != "undefined") {
                    g_modDebugMgr.AddConsole(null);
                    g_modDebugMgr.AddDebugButton("Identifier", function() {
                        console.log('Identifier');
                        console.log(this.instrumentIdentifier);
                    });
                    g_modDebugMgr.AddDebugButton("TemplateID", function() {
                        console.log('TemplateID');
                        console.log(this.templateID);
                    });
                    g_modDebugMgr.AddDebugButton("Source", function() {
                        console.log('Source');
                        console.log(window.document.documentElement.outerHTML);
                    });
                    g_modDebugMgr.AddDebugButton("close", function() {
                        console.log('close');
                        if (this.ingameUi) {
                            console.log('ingameUi');
                            this.ingameUi.closePanel();
                        }
                    });
                    this.initialize();
                } else {
                    setTimeout(() => {
                        this.isDebugEnabled();
                    }, 2000);
                }
            });
        }
    }
    connectedCallback() {
        super.connectedCallback();
        this.ingameUi = this.querySelector('ingame-ui');

        this.iframeElement = document.getElementById("vPEPanelIframe");

        this.m_MainDisplay = document.querySelector("#MainDisplay");
        this.m_MainDisplay.classList.add("hidden");

        this.m_Footer = document.querySelector("#Footer");
        this.m_Footer.classList.add("hidden");

        if (this.ingameUi) {
            this.ingameUi.addEventListener("panelActive", (e) => {
                console.log('panelActive');
                this.panelActive = true;
            });
            this.ingameUi.addEventListener("panelInactive", (e) => {
                console.log('panelInactive');
                this.panelActive = false;
            });
            this.ingameUi.addEventListener("onResizeElement", () => {
                //this.updateImage();
            });
            this.ingameUi.addEventListener("dblclick", () => {
                if (this.m_Footer) {
                    this.m_Footer.classList.remove("hidden");
                }
			});
        }
    }
    initialize() {
        if (this.started) {
            return;
        }

        //this.m_MainDisplay = document.querySelector("#MainDisplay");
        //this.m_MainDisplay.classList.add("hidden");

        //this.m_Footer = document.querySelector("#Footer");
        //this.m_Footer.classList.add("hidden");

        //this.iframeElement = document.getElementById("vPEPanelIframe");
        //this.ingameUi = this.querySelector('ingame-ui');

        /*if (this.ingameUi) {
            this.ingameUi.addEventListener("panelActive", (e) => {
                console.log('panelActive');
                this.updateImage();
            });
            this.ingameUi.addEventListener("panelInactive", (e) => {
                console.log('panelInactive');
                this.iframeElement.src = '';
            });
            this.ingameUi.addEventListener("onResizeElement", () => {
                //this.updateImage();
            });
            this.ingameUi.addEventListener("dblclick", () => {
                if (this.m_Footer) {
                    this.m_Footer.classList.remove("hidden");
                }
            });
        }*/
        this.started = true;
    }
    disconnectedCallback() {
        super.disconnectedCallback();
    }
    updateImage() {

    }
}

window.customElements.define("ingamepanel-vpe", IngamePanelvPEPanel);
checkAutoload();