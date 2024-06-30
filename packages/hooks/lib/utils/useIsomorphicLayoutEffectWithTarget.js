"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var tslib_1 = require("tslib");
var isBrowser_1 = tslib_1.__importDefault(require("./isBrowser"));
var useEffectWithTarget_1 = tslib_1.__importDefault(require("./useEffectWithTarget"));
var useLayoutEffectWithTarget_1 = tslib_1.__importDefault(require("./useLayoutEffectWithTarget"));
var useIsomorphicLayoutEffectWithTarget = isBrowser_1["default"] ? useLayoutEffectWithTarget_1["default"] : useEffectWithTarget_1["default"];
exports["default"] = useIsomorphicLayoutEffectWithTarget;