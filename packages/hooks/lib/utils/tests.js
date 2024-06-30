"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderHook = void 0;
var tslib_1 = require("tslib");
var react_1 = require("react");
var react_2 = require("@testing-library/react");
tslib_1.__exportStar(require("@testing-library/react"), exports);
var Wrapper = process.env.REACT_MODE === 'strict' ? react_1.StrictMode : undefined;
var customRender = function customRender(ui, options) {
  return (0, react_2.renderHook)(ui, tslib_1.__assign({
    wrapper: Wrapper
  }, options));
};
exports.renderHook = customRender;