"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var tslib_1 = require("tslib");
function limit(fn, timespan) {
  var pending = false;
  return function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    if (pending) return;
    pending = true;
    fn.apply(void 0, tslib_1.__spreadArray([], tslib_1.__read(args), false));
    setTimeout(function () {
      pending = false;
    }, timespan);
  };
}
exports["default"] = limit;