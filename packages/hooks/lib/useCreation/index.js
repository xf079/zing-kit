"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var tslib_1 = require("tslib");
var react_1 = require("react");
var depsAreSame_1 = tslib_1.__importDefault(require("../utils/depsAreSame"));
function useCreation(factory, deps) {
  var current = (0, react_1.useRef)({
    deps: deps,
    obj: undefined,
    initialized: false
  }).current;
  if (!current.initialized || !(0, depsAreSame_1["default"])(current.deps, deps)) {
    current.deps = deps;
    current.obj = factory();
    current.initialized = true;
  }
  return current.obj;
}
exports["default"] = useCreation;