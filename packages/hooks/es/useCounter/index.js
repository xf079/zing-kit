import { __read } from "tslib";
import { useState } from 'react';
import isNumber from 'lodash/isNumber';
import useMemoizedFn from '../useMemoizedFn';
function getTargetValue(val, options) {
  if (options === void 0) {
    options = {};
  }
  var min = options.min,
    max = options.max;
  var target = val;
  if (isNumber(max)) {
    target = Math.min(max, target);
  }
  if (isNumber(min)) {
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
  var _a = __read(useState(function () {
      return getTargetValue(initialValue, {
        min: min,
        max: max
      });
    }), 2),
    current = _a[0],
    setCurrent = _a[1];
  var setValue = function setValue(value) {
    setCurrent(function (c) {
      var target = isNumber(value) ? value : value(c);
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
    inc: useMemoizedFn(inc),
    dec: useMemoizedFn(dec),
    set: useMemoizedFn(set),
    reset: useMemoizedFn(reset)
  }];
}
export default useCounter;