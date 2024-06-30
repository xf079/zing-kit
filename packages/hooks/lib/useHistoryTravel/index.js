"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var tslib_1 = require("tslib");
var react_1 = require("react");
var useMemoizedFn_1 = tslib_1.__importDefault(require("../useMemoizedFn"));
var isNumber_1 = tslib_1.__importDefault(require("lodash/isNumber"));
var dumpIndex = function dumpIndex(step, arr) {
  var index = step > 0 ? step - 1 // move forward
  : arr.length + step; // move backward
  if (index >= arr.length - 1) {
    index = arr.length - 1;
  }
  if (index < 0) {
    index = 0;
  }
  return index;
};
var split = function split(step, targetArr) {
  var index = dumpIndex(step, targetArr);
  return {
    _current: targetArr[index],
    _before: targetArr.slice(0, index),
    _after: targetArr.slice(index + 1)
  };
};
function useHistoryTravel(initialValue, maxLength) {
  if (maxLength === void 0) {
    maxLength = 0;
  }
  var _a = tslib_1.__read((0, react_1.useState)({
      present: initialValue,
      past: [],
      future: []
    }), 2),
    history = _a[0],
    setHistory = _a[1];
  var present = history.present,
    past = history.past,
    future = history.future;
  var initialValueRef = (0, react_1.useRef)(initialValue);
  var reset = function reset() {
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      params[_i] = arguments[_i];
    }
    var _initial = params.length > 0 ? params[0] : initialValueRef.current;
    initialValueRef.current = _initial;
    setHistory({
      present: _initial,
      future: [],
      past: []
    });
  };
  var updateValue = function updateValue(val) {
    var _past = tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(past), false), [present], false);
    var maxLengthNum = (0, isNumber_1["default"])(maxLength) ? maxLength : Number(maxLength);
    // maximum number of records exceeded
    if (maxLengthNum > 0 && _past.length > maxLengthNum) {
      // delete first
      _past.splice(0, 1);
    }
    setHistory({
      present: val,
      future: [],
      past: _past
    });
  };
  var _forward = function _forward(step) {
    if (step === void 0) {
      step = 1;
    }
    if (future.length === 0) {
      return;
    }
    var _a = split(step, future),
      _before = _a._before,
      _current = _a._current,
      _after = _a._after;
    setHistory({
      past: tslib_1.__spreadArray(tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(past), false), [present], false), tslib_1.__read(_before), false),
      present: _current,
      future: _after
    });
  };
  var _backward = function _backward(step) {
    if (step === void 0) {
      step = -1;
    }
    if (past.length === 0) {
      return;
    }
    var _a = split(step, past),
      _before = _a._before,
      _current = _a._current,
      _after = _a._after;
    setHistory({
      past: _before,
      present: _current,
      future: tslib_1.__spreadArray(tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(_after), false), [present], false), tslib_1.__read(future), false)
    });
  };
  var go = function go(step) {
    var stepNum = (0, isNumber_1["default"])(step) ? step : Number(step);
    if (stepNum === 0) {
      return;
    }
    if (stepNum > 0) {
      return _forward(stepNum);
    }
    _backward(stepNum);
  };
  return {
    value: present,
    backLength: past.length,
    forwardLength: future.length,
    setValue: (0, useMemoizedFn_1["default"])(updateValue),
    go: (0, useMemoizedFn_1["default"])(go),
    back: (0, useMemoizedFn_1["default"])(function () {
      go(-1);
    }),
    forward: (0, useMemoizedFn_1["default"])(function () {
      go(1);
    }),
    reset: (0, useMemoizedFn_1["default"])(reset)
  };
}
exports["default"] = useHistoryTravel;