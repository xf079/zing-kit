"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var tslib_1 = require("tslib");
var useCreation_1 = tslib_1.__importDefault(require("../useCreation"));
var useLatest_1 = tslib_1.__importDefault(require("../useLatest"));
var useMemoizedFn_1 = tslib_1.__importDefault(require("../useMemoizedFn"));
var useMount_1 = tslib_1.__importDefault(require("../useMount"));
var useUnmount_1 = tslib_1.__importDefault(require("../useUnmount"));
var useUpdate_1 = tslib_1.__importDefault(require("../useUpdate"));
var Fetch_1 = tslib_1.__importDefault(require("./Fetch"));
function useRequestImplement(service, options, plugins) {
  if (options === void 0) {
    options = {};
  }
  if (plugins === void 0) {
    plugins = [];
  }
  var _a = options.manual,
    manual = _a === void 0 ? false : _a,
    rest = tslib_1.__rest(options, ["manual"]);
  var fetchOptions = tslib_1.__assign({
    manual: manual
  }, rest);
  var serviceRef = (0, useLatest_1["default"])(service);
  var update = (0, useUpdate_1["default"])();
  var fetchInstance = (0, useCreation_1["default"])(function () {
    var initState = plugins.map(function (p) {
      var _a;
      return (_a = p === null || p === void 0 ? void 0 : p.onInit) === null || _a === void 0 ? void 0 : _a.call(p, fetchOptions);
    }).filter(Boolean);
    return new Fetch_1["default"](serviceRef, fetchOptions, update, Object.assign.apply(Object, tslib_1.__spreadArray([{}], tslib_1.__read(initState), false)));
  }, []);
  fetchInstance.options = fetchOptions;
  // run all plugins hooks
  fetchInstance.pluginImpls = plugins.map(function (p) {
    return p(fetchInstance, fetchOptions);
  });
  (0, useMount_1["default"])(function () {
    if (!manual) {
      // useCachePlugin can set fetchInstance.state.params from cache when init
      var params = fetchInstance.state.params || options.defaultParams || [];
      // @ts-ignore
      fetchInstance.run.apply(fetchInstance, tslib_1.__spreadArray([], tslib_1.__read(params), false));
    }
  });
  (0, useUnmount_1["default"])(function () {
    fetchInstance.cancel();
  });
  return {
    loading: fetchInstance.state.loading,
    data: fetchInstance.state.data,
    error: fetchInstance.state.error,
    params: fetchInstance.state.params || [],
    cancel: (0, useMemoizedFn_1["default"])(fetchInstance.cancel.bind(fetchInstance)),
    refresh: (0, useMemoizedFn_1["default"])(fetchInstance.refresh.bind(fetchInstance)),
    refreshAsync: (0, useMemoizedFn_1["default"])(fetchInstance.refreshAsync.bind(fetchInstance)),
    run: (0, useMemoizedFn_1["default"])(fetchInstance.run.bind(fetchInstance)),
    runAsync: (0, useMemoizedFn_1["default"])(fetchInstance.runAsync.bind(fetchInstance)),
    mutate: (0, useMemoizedFn_1["default"])(fetchInstance.mutate.bind(fetchInstance))
  };
}
exports["default"] = useRequestImplement;