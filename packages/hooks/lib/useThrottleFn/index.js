"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var tslib_1 = require("tslib");
var throttle_1 = tslib_1.__importDefault(require("lodash/throttle"));
var react_1 = require("react");
var useLatest_1 = tslib_1.__importDefault(require("../useLatest"));
var useUnmount_1 = tslib_1.__importDefault(require("../useUnmount"));
function useThrottleFn(fn, options) {
  var _a;
  var fnRef = (0, useLatest_1["default"])(fn);
  var wait = (_a = options === null || options === void 0 ? void 0 : options.wait) !== null && _a !== void 0 ? _a : 1000;
  var throttled = (0, react_1.useMemo)(function () {
    return (0, throttle_1["default"])(function () {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return fnRef.current.apply(fnRef, tslib_1.__spreadArray([], tslib_1.__read(args), false));
    }, wait, options);
  }, []);
  (0, useUnmount_1["default"])(function () {
    throttled.cancel();
  });
  return {
    run: throttled,
    cancel: throttled.cancel,
    flush: throttled.flush
  };
}
exports["default"] = useThrottleFn;