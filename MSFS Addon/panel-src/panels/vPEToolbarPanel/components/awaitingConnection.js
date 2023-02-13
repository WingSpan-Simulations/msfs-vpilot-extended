"use strict";
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
exports.AwaitingConnection = void 0;
var react_1 = require("react");
var AwaitingConnection = /** @class */ (function (_super) {
    __extends(AwaitingConnection, _super);
    function AwaitingConnection(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    AwaitingConnection.prototype.render = function () {
        return <div className="awaiting-connection">Awaiting Connection...</div>;
    };
    return AwaitingConnection;
}(react_1["default"].Component));
exports.AwaitingConnection = AwaitingConnection;
