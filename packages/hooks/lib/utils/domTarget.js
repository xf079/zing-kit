"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTargetElement = void 0;
var tslib_1 = require("tslib");
var lodash_1 = tslib_1.__importDefault(require("lodash"));
var isBrowser_1 = tslib_1.__importDefault(require("./isBrowser"));
function getTargetElement(target, defaultElement) {
  if (!isBrowser_1["default"]) {
    return undefined;
  }
  if (!target) {
    return defaultElement;
  }
  var targetElement;
  if ((0, lodash_1["default"])(target)) {
    targetElement = target();
  } else if ('current' in target) {
    targetElement = target.current;
  } else {
    targetElement = target;
  }
  return targetElement;
}
exports.getTargetElement = getTargetElement;