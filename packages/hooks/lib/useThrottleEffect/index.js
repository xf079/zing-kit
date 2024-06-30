"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var tslib_1 = require("tslib");
var react_1 = require("react");
var useThrottleFn_1 = tslib_1.__importDefault(require("../useThrottleFn"));
var useUpdateEffect_1 = tslib_1.__importDefault(require("../useUpdateEffect"));
function useThrottleEffect(effect, deps, options) {
  var _a = tslib_1.__read((0, react_1.useState)({}), 2),
    flag = _a[0],
    setFlag = _a[1];
  var run = (0, useThrottleFn_1["default"])(function () {
    setFlag({});
  }, options).run;
  (0, react_1.useEffect)(function () {
    return run();
  }, deps);
  (0, useUpdateEffect_1["default"])(effect, [flag]);
}
exports["default"] = useThrottleEffect;