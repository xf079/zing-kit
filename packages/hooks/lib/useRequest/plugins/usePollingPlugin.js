"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var tslib_1 = require("tslib");
var react_1 = require("react");
var useUpdateEffect_1 = tslib_1.__importDefault(require("../../useUpdateEffect"));
var isDocumentVisible_1 = tslib_1.__importDefault(require("../utils/isDocumentVisible"));
var subscribeReVisible_1 = tslib_1.__importDefault(require("../utils/subscribeReVisible"));
var usePollingPlugin = function usePollingPlugin(fetchInstance, _a) {
  var pollingInterval = _a.pollingInterval,
    _b = _a.pollingWhenHidden,
    pollingWhenHidden = _b === void 0 ? true : _b,
    _c = _a.pollingErrorRetryCount,
    pollingErrorRetryCount = _c === void 0 ? -1 : _c;
  var timerRef = (0, react_1.useRef)();
  var unsubscribeRef = (0, react_1.useRef)();
  var countRef = (0, react_1.useRef)(0);
  var stopPolling = function stopPolling() {
    var _a;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    (_a = unsubscribeRef.current) === null || _a === void 0 ? void 0 : _a.call(unsubscribeRef);
  };
  (0, useUpdateEffect_1["default"])(function () {
    if (!pollingInterval) {
      stopPolling();
    }
  }, [pollingInterval]);
  if (!pollingInterval) {
    return {};
  }
  return {
    onBefore: function onBefore() {
      stopPolling();
    },
    onError: function onError() {
      countRef.current += 1;
    },
    onSuccess: function onSuccess() {
      countRef.current = 0;
    },
    onFinally: function onFinally() {
      if (pollingErrorRetryCount === -1 ||
      // When an error occurs, the request is not repeated after pollingErrorRetryCount retries
      pollingErrorRetryCount !== -1 && countRef.current <= pollingErrorRetryCount) {
        timerRef.current = setTimeout(function () {
          // if pollingWhenHidden = false && document is hidden, then stop polling and subscribe revisible
          if (!pollingWhenHidden && !(0, isDocumentVisible_1["default"])()) {
            unsubscribeRef.current = (0, subscribeReVisible_1["default"])(function () {
              fetchInstance.refresh();
            });
          } else {
            fetchInstance.refresh();
          }
        }, pollingInterval);
      } else {
        countRef.current = 0;
      }
    },
    onCancel: function onCancel() {
      stopPolling();
    }
  };
};
exports["default"] = usePollingPlugin;