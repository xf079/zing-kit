"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var tslib_1 = require("tslib");
var react_1 = require("react");
var createEffectWithTarget_1 = tslib_1.__importDefault(require("./createEffectWithTarget"));
var useEffectWithTarget = (0, createEffectWithTarget_1["default"])(react_1.useLayoutEffect);
exports["default"] = useEffectWithTarget;