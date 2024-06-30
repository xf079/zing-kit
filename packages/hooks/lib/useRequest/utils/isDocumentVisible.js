"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var tslib_1 = require("tslib");
var isBrowser_1 = tslib_1.__importDefault(require("../../utils/isBrowser"));
function isDocumentVisible() {
  if (isBrowser_1["default"]) {
    return document.visibilityState !== 'hidden';
  }
  return true;
}
exports["default"] = isDocumentVisible;