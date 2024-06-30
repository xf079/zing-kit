"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var tslib_1 = require("tslib");
var react_1 = require("react");
var isNumber_1 = tslib_1.__importDefault(require("lodash/isNumber"));
var useMemoizedFn_1 = tslib_1.__importDefault(require("../useMemoizedFn"));
function getTargetValue(val, options) {
  if (options === void 0) {
    options = {};
  }
  var min = options.min,
    max = options.max;
  var target = val;
  if ((0, isNumber_1["default"])(max)) {
    target = Math.min(max, target);
  }
  if ((0, isNumber_1["default"])(min)) {
    target = Math.max(min, target);
  }
  return target;
}
function useCounter(initialValue, options) {
  if (initialValue === void 0) {
    initialValue = 0;
  }
  if (options === void 0) {
    options = {};
  }
  var min = options.min,
    max = options.max;
  var _a = tslib_1.__read((0, react_1.useState)(function () {
      return getTargetValue(initialValue, {
        min: min,
        max: max
      });
    }), 2),
    current = _a[0],
    setCurrent = _a[1];
  var setValue = function setValue(value) {
    setCurrent(function (c) {
      var target = (0, isNumber_1["default"])(value) ? value : value(c);
      return getTargetValue(target, {
        max: max,
        min: min
      });
    });
  };
  var inc = function inc(delta) {
    if (delta === void 0) {
      delta = 1;
    }
    setValue(function (c) {
      return c + delta;
    });
  };
  var dec = function dec(delta) {
    if (delta === void 0) {
      delta = 1;
    }
    setValue(function (c) {
      return c - delta;
    });
  };
  var set = function set(value) {
    setValue(value);
  };
  var reset = function reset() {
    setValue(initialValue);
  };
  return [current, {
    inc: (0, useMemoizedFn_1["default"])(inc),
    dec: (0, useMemoizedFn_1["default"])(dec),
    set: (0, useMemoizedFn_1["default"])(set),
    reset: (0, useMemoizedFn_1["default"])(reset)
  }];
}
exports["default"] = useCounter;