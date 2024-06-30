"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var tslib_1 = require("tslib");
var react_1 = require("react");
var isFunction_1 = tslib_1.__importDefault(require("lodash/isFunction"));
var useSetState = function useSetState(initialState) {
  var _a = tslib_1.__read((0, react_1.useState)(initialState), 2),
    state = _a[0],
    setState = _a[1];
  var setMergeState = (0, react_1.useCallback)(function (patch) {
    setState(function (prevState) {
      var newState = (0, isFunction_1["default"])(patch) ? patch(prevState) : patch;
      return newState ? tslib_1.__assign(tslib_1.__assign({}, prevState), newState) : prevState;
    });
  }, []);
  return [state, setMergeState];
};
exports["default"] = useSetState;