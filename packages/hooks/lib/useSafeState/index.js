"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var tslib_1 = require("tslib");
var react_1 = require("react");
var useUnmountedRef_1 = tslib_1.__importDefault(require("../useUnmountedRef"));
function useSafeState(initialState) {
  var unmountedRef = (0, useUnmountedRef_1["default"])();
  var _a = tslib_1.__read((0, react_1.useState)(initialState), 2),
    state = _a[0],
    setState = _a[1];
  var setCurrentState = (0, react_1.useCallback)(function (currentState) {
    /** if component is unmounted, stop update */
    if (unmountedRef.current) return;
    setState(currentState);
  }, []);
  return [state, setCurrentState];
}
exports["default"] = useSafeState;