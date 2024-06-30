"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var tslib_1 = require("tslib");
var react_1 = require("react");
var useLatest_1 = tslib_1.__importDefault(require("../useLatest"));
function useGetState(initialState) {
  var _a = tslib_1.__read((0, react_1.useState)(initialState), 2),
    state = _a[0],
    setState = _a[1];
  var stateRef = (0, useLatest_1["default"])(state);
  var getState = (0, react_1.useCallback)(function () {
    return stateRef.current;
  }, []);
  return [state, setState, getState];
}
exports["default"] = useGetState;