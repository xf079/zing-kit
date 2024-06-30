"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var tslib_1 = require("tslib");
var react_1 = require("react");
var useUnmount_1 = tslib_1.__importDefault(require("../useUnmount"));
var depsAreSame_1 = tslib_1.__importDefault(require("./depsAreSame"));
var domTarget_1 = require("./domTarget");
var createEffectWithTarget = function createEffectWithTarget(useEffectType) {
  return function (effect, deps, target) {
    var hasInitRef = (0, react_1.useRef)(false);
    var lastElementRef = (0, react_1.useRef)([]);
    var lastDepsRef = (0, react_1.useRef)([]);
    var unLoadRef = (0, react_1.useRef)();
    useEffectType(function () {
      var _a;
      var targets = Array.isArray(target) ? target : [target];
      var els = targets.map(function (item) {
        return (0, domTarget_1.getTargetElement)(item);
      });
      // init run
      if (!hasInitRef.current) {
        hasInitRef.current = true;
        lastElementRef.current = els;
        lastDepsRef.current = deps;
        unLoadRef.current = effect();
        return;
      }
      if (els.length !== lastElementRef.current.length || !(0, depsAreSame_1["default"])(lastElementRef.current, els) || !(0, depsAreSame_1["default"])(lastDepsRef.current, deps)) {
        (_a = unLoadRef.current) === null || _a === void 0 ? void 0 : _a.call(unLoadRef);
        lastElementRef.current = els;
        lastDepsRef.current = deps;
        unLoadRef.current = effect();
      }
    });
    (0, useUnmount_1["default"])(function () {
      var _a;
      (_a = unLoadRef.current) === null || _a === void 0 ? void 0 : _a.call(unLoadRef);
      // for react-refresh
      hasInitRef.current = false;
    });
  };
};
exports["default"] = createEffectWithTarget;