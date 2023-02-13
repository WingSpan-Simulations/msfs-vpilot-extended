"use strict";
/// <reference path="../../../types/msfs/common.d.ts"/>
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var awaitingConnection_1 = require("./components/awaitingConnection");
var vPEPanelReact = /** @class */ (function (_super) {
    __extends(vPEPanelReact, _super);
    function vPEPanelReact() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    vPEPanelReact.prototype.render = function () {
        return (<div>
        <awaitingConnection_1.AwaitingConnection />
      </div>);
    };
    return vPEPanelReact;
}(react_1["default"].Component));
var vPEPanel = /** @class */ (function (_super) {
    __extends(vPEPanel, _super);
    function vPEPanel() {
        var _this = _super.call(this) || this;
        _this.panelActive = false;
        _this.started = false;
        _this.ingameUi = null;
        _this.busy = false;
        console.log("VPE CONSTRUCTOR CALLED");
        return _this;
    }
    vPEPanel.prototype.connectedCallback = function () {
        var _a;
        _super.prototype.connectedCallback.call(this);
        this.ingameUi = this.querySelector("ingame-ui");
        console.log("Rendering");
        (_a = document.getElementById("Footer")) === null || _a === void 0 ? void 0 : _a.append("Texting Texting 123");
        react_dom_1["default"].render(react_1["default"].createElement(vPEPanelReact), document.getElementById("PanelContent"));
    };
    vPEPanel.prototype.initialize = function () {
        if (this.started) {
            return;
        }
        this.started = true;
    };
    vPEPanel.prototype.disconnectedCallback = function () {
        _super.prototype.disconnectedCallback.call(this);
    };
    return vPEPanel;
}(TemplateElement));
console.log("VPEEEEEEEEE");
window.customElements.define("ingamepanel-vpe", vPEPanel);
checkAutoload();
