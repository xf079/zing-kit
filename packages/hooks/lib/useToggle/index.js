"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var tslib_1 = require("tslib");
var react_1 = require("react");
function useToggle(defaultValue, reverseValue) {
  if (defaultValue === void 0) {
    defaultValue = false;
  }
  var _a = tslib_1.__read((0, react_1.useState)(defaultValue), 2),
    state = _a[0],
    setState = _a[1];
  var actions = (0, react_1.useMemo)(function () {
    var reverseValueOrigin = reverseValue === undefined ? !defaultValue : reverseValue;
    var toggle = function toggle() {
      return setState(function (s) {
        return s === defaultValue ? reverseValueOrigin : defaultValue;
      });
    };
    var set = function set(value) {
      return setState(value);
    };
    var setLeft = function setLeft() {
      return setState(defaultValue);
    };
    var setRight = function setRight() {
      return setState(reverseValueOrigin);
    };
    return {
      toggle: toggle,
      set: set,
      setLeft: setLeft,
      setRight: setRight
    };
  }, []);
  return [state, actions];
}
exports["default"] = useToggle;