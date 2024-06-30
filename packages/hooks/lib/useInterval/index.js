"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var tslib_1 = require("tslib");
var react_1 = require("react");
var isNumber_1 = tslib_1.__importDefault(require("lodash/isNumber"));
var useMemoizedFn_1 = tslib_1.__importDefault(require("../useMemoizedFn"));
var useInterval = function useInterval(fn, delay, options) {
  if (options === void 0) {
    options = {};
  }
  var timerCallback = (0, useMemoizedFn_1["default"])(fn);
  var timerRef = (0, react_1.useRef)(null);
  var clear = (0, react_1.useCallback)(function () {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, []);
  (0, react_1.useEffect)(function () {
    if (!(0, isNumber_1["default"])(delay) || delay < 0) {
      return;
    }
    if (options.immediate) {
      timerCallback();
    }
    timerRef.current = setInterval(timerCallback, delay);
    return clear;
  }, [delay, options.immediate]);
  return clear;
};
exports["default"] = useInterval;