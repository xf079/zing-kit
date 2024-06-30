"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var tslib_1 = require("tslib");
var react_1 = require("react");
var useUpdateEffect_1 = tslib_1.__importDefault(require("../../useUpdateEffect"));
// support refreshDeps & ready
var useAutoRunPlugin = function useAutoRunPlugin(fetchInstance, _a) {
  var manual = _a.manual,
    _b = _a.ready,
    ready = _b === void 0 ? true : _b,
    _c = _a.defaultParams,
    defaultParams = _c === void 0 ? [] : _c,
    _d = _a.refreshDeps,
    refreshDeps = _d === void 0 ? [] : _d,
    refreshDepsAction = _a.refreshDepsAction;
  var hasAutoRun = (0, react_1.useRef)(false);
  hasAutoRun.current = false;
  (0, useUpdateEffect_1["default"])(function () {
    if (!manual && ready) {
      hasAutoRun.current = true;
      fetchInstance.run.apply(fetchInstance, tslib_1.__spreadArray([], tslib_1.__read(defaultParams), false));
    }
  }, [ready]);
  (0, useUpdateEffect_1["default"])(function () {
    if (hasAutoRun.current) {
      return;
    }
    if (!manual) {
      hasAutoRun.current = true;
      if (refreshDepsAction) {
        refreshDepsAction();
      } else {
        fetchInstance.refresh();
      }
    }
  }, tslib_1.__spreadArray([], tslib_1.__read(refreshDeps), false));
  return {
    onBefore: function onBefore() {
      if (!ready) {
        return {
          stopNow: true
        };
      }
    }
  };
};
useAutoRunPlugin.onInit = function (_a) {
  var _b = _a.ready,
    ready = _b === void 0 ? true : _b,
    manual = _a.manual;
  return {
    loading: !manual && ready
  };
};
exports["default"] = useAutoRunPlugin;