"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var tslib_1 = require("tslib");
var isBrowser_1 = tslib_1.__importDefault(require("../../utils/isBrowser"));
function isOnline() {
  if (isBrowser_1["default"] && typeof navigator.onLine !== 'undefined') {
    return navigator.onLine;
  }
  return true;
}
exports["default"] = isOnline;