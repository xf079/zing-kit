"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var tslib_1 = require("tslib");
var react_1 = require("react");
var isFunction_1 = tslib_1.__importDefault(require("lodash/isFunction"));
var useMemoizedFn_1 = tslib_1.__importDefault(require("../useMemoizedFn"));
var useCreation_1 = tslib_1.__importDefault(require("../useCreation"));
var useResetState = function useResetState(initialState) {
  var initialStateRef = (0, react_1.useRef)(initialState);
  var initialStateMemo = (0, useCreation_1["default"])(function () {
    return (0, isFunction_1["default"])(initialStateRef.current) ? initialStateRef.current() : initialStateRef.current;
  }, []);
  var _a = tslib_1.__read((0, react_1.useState)(initialStateMemo), 2),
    state = _a[0],
    setState = _a[1];
  var resetState = (0, useMemoizedFn_1["default"])(function () {
    setState(initialStateMemo);
  });
  return [state, setState, resetState];
};
exports["default"] = useResetState;