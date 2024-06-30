"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var tslib_1 = require("tslib");
var throttle_1 = tslib_1.__importDefault(require("lodash/throttle"));
var react_1 = require("react");
var useThrottlePlugin = function useThrottlePlugin(fetchInstance, _a) {
  var throttleWait = _a.throttleWait,
    throttleLeading = _a.throttleLeading,
    throttleTrailing = _a.throttleTrailing;
  var throttledRef = (0, react_1.useRef)();
  var options = {};
  if (throttleLeading !== undefined) {
    options.leading = throttleLeading;
  }
  if (throttleTrailing !== undefined) {
    options.trailing = throttleTrailing;
  }
  (0, react_1.useEffect)(function () {
    if (throttleWait) {
      var _originRunAsync_1 = fetchInstance.runAsync.bind(fetchInstance);
      throttledRef.current = (0, throttle_1["default"])(function (callback) {
        callback();
      }, throttleWait, options);
      // throttle runAsync should be promise
      fetchInstance.runAsync = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return new Promise(function (resolve, reject) {
          var _a;
          (_a = throttledRef.current) === null || _a === void 0 ? void 0 : _a.call(throttledRef, function () {
            _originRunAsync_1.apply(void 0, tslib_1.__spreadArray([], tslib_1.__read(args), false)).then(resolve)["catch"](reject);
          });
        });
      };
      return function () {
        var _a;
        fetchInstance.runAsync = _originRunAsync_1;
        (_a = throttledRef.current) === null || _a === void 0 ? void 0 : _a.cancel();
      };
    }
  }, [throttleWait, throttleLeading, throttleTrailing]);
  if (!throttleWait) {
    return {};
  }
  return {
    onCancel: function onCancel() {
      var _a;
      (_a = throttledRef.current) === null || _a === void 0 ? void 0 : _a.cancel();
    }
  };
};
exports["default"] = useThrottlePlugin;