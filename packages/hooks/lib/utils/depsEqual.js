"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.depsEqual = void 0;
var tslib_1 = require("tslib");
var react_fast_compare_1 = tslib_1.__importDefault(require("react-fast-compare"));
var depsEqual = function depsEqual(aDeps, bDeps) {
  if (aDeps === void 0) {
    aDeps = [];
  }
  if (bDeps === void 0) {
    bDeps = [];
  }
  return (0, react_fast_compare_1["default"])(aDeps, bDeps);
};
exports.depsEqual = depsEqual;