"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var tslib_1 = require("tslib");
var react_1 = require("react");
var useUnmount_1 = tslib_1.__importDefault(require("../../useUnmount"));
var limit_1 = tslib_1.__importDefault(require("../utils/limit"));
var subscribeFocus_1 = tslib_1.__importDefault(require("../utils/subscribeFocus"));
var useRefreshOnWindowFocusPlugin = function useRefreshOnWindowFocusPlugin(fetchInstance, _a) {
  var refreshOnWindowFocus = _a.refreshOnWindowFocus,
    _b = _a.focusTimespan,
    focusTimespan = _b === void 0 ? 5000 : _b;
  var unsubscribeRef = (0, react_1.useRef)();
  var stopSubscribe = function stopSubscribe() {
    var _a;
    (_a = unsubscribeRef.current) === null || _a === void 0 ? void 0 : _a.call(unsubscribeRef);
  };
  (0, react_1.useEffect)(function () {
    if (refreshOnWindowFocus) {
      var limitRefresh_1 = (0, limit_1["default"])(fetchInstance.refresh.bind(fetchInstance), focusTimespan);
      unsubscribeRef.current = (0, subscribeFocus_1["default"])(function () {
        limitRefresh_1();
      });
    }
    return function () {
      stopSubscribe();
    };
  }, [refreshOnWindowFocus, focusTimespan]);
  (0, useUnmount_1["default"])(function () {
    stopSubscribe();
  });
  return {};
};
exports["default"] = useRefreshOnWindowFocusPlugin;