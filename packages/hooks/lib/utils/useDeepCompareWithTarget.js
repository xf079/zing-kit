"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var tslib_1 = require("tslib");
var react_1 = require("react");
var useEffectWithTarget_1 = tslib_1.__importDefault(require("./useEffectWithTarget"));
var depsEqual_1 = require("./depsEqual");
var useDeepCompareEffectWithTarget = function useDeepCompareEffectWithTarget(effect, deps, target) {
  var ref = (0, react_1.useRef)();
  var signalRef = (0, react_1.useRef)(0);
  if (!(0, depsEqual_1.depsEqual)(deps, ref.current)) {
    ref.current = deps;
    signalRef.current += 1;
  }
  (0, useEffectWithTarget_1["default"])(effect, [signalRef.current], target);
};
exports["default"] = useDeepCompareEffectWithTarget;