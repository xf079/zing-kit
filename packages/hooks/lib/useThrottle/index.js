"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var tslib_1 = require("tslib");
var react_1 = require("react");
var useThrottleFn_1 = tslib_1.__importDefault(require("../useThrottleFn"));
function useThrottle(value, options) {
  var _a = tslib_1.__read((0, react_1.useState)(value), 2),
    throttled = _a[0],
    setThrottled = _a[1];
  var run = (0, useThrottleFn_1["default"])(function () {
    setThrottled(value);
  }, options).run;
  (0, react_1.useEffect)(function () {
    run();
  }, [value]);
  return throttled;
}
exports["default"] = useThrottle;