"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var tslib_1 = require("tslib");
var react_1 = require("react");
var lodash_1 = require("lodash");
var useMemoizedFn_1 = tslib_1.__importDefault(require("../useMemoizedFn"));
var useUpdate_1 = tslib_1.__importDefault(require("../useUpdate"));
function useControllableValue(props, options) {
  if (props === void 0) {
    props = {};
  }
  if (options === void 0) {
    options = {};
  }
  var defaultValue = options.defaultValue,
    _a = options.defaultValuePropName,
    defaultValuePropName = _a === void 0 ? 'defaultValue' : _a,
    _b = options.valuePropName,
    valuePropName = _b === void 0 ? 'value' : _b,
    _c = options.trigger,
    trigger = _c === void 0 ? 'onChange' : _c;
  var value = props[valuePropName];
  var isControlled = Object.prototype.hasOwnProperty.call(props, valuePropName);
  var initialValue = (0, react_1.useMemo)(function () {
    if (isControlled) {
      return value;
    }
    if (Object.prototype.hasOwnProperty.call(props, defaultValuePropName)) {
      return props[defaultValuePropName];
    }
    return defaultValue;
  }, []);
  var stateRef = (0, react_1.useRef)(initialValue);
  if (isControlled) {
    stateRef.current = value;
  }
  var update = (0, useUpdate_1["default"])();
  function setState(v) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }
    var r = (0, lodash_1.isFunction)(v) ? v(stateRef.current) : v;
    if (!isControlled) {
      stateRef.current = r;
      update();
    }
    if (props[trigger]) {
      props[trigger].apply(props, tslib_1.__spreadArray([r], tslib_1.__read(args), false));
    }
  }
  return [stateRef.current, (0, useMemoizedFn_1["default"])(setState)];
}
exports["default"] = useControllableValue;