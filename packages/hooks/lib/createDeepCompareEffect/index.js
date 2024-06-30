"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDeepCompareEffect = void 0;
var react_1 = require("react");
var depsEqual_1 = require("../utils/depsEqual");
var createDeepCompareEffect = function createDeepCompareEffect(hook) {
  return function (effect, deps) {
    var ref = (0, react_1.useRef)();
    var signalRef = (0, react_1.useRef)(0);
    if (deps === undefined || !(0, depsEqual_1.depsEqual)(deps, ref.current)) {
      ref.current = deps;
      signalRef.current += 1;
    }
    hook(effect, [signalRef.current]);
  };
};
exports.createDeepCompareEffect = createDeepCompareEffect;