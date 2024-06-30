"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debounce = void 0;
var tslib_1 = require("tslib");
var debounce_1 = tslib_1.__importDefault(require("lodash/debounce"));
exports.debounce = debounce_1["default"];
function isNodeOrWeb() {
  var freeGlobal = (typeof global === 'undefined' ? 'undefined' : typeof global) == 'object' && global && global.Object === Object && global;
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
  return freeGlobal || freeSelf;
}
if (!isNodeOrWeb()) {
  global.Date = Date;
}