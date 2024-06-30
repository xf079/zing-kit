"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var tslib_1 = require("tslib");
var useAutoRunPlugin_1 = tslib_1.__importDefault(require("./plugins/useAutoRunPlugin"));
var useCachePlugin_1 = tslib_1.__importDefault(require("./plugins/useCachePlugin"));
var useDebouncePlugin_1 = tslib_1.__importDefault(require("./plugins/useDebouncePlugin"));
var useLoadingDelayPlugin_1 = tslib_1.__importDefault(require("./plugins/useLoadingDelayPlugin"));
var usePollingPlugin_1 = tslib_1.__importDefault(require("./plugins/usePollingPlugin"));
var useRefreshOnWindowFocusPlugin_1 = tslib_1.__importDefault(require("./plugins/useRefreshOnWindowFocusPlugin"));
var useRetryPlugin_1 = tslib_1.__importDefault(require("./plugins/useRetryPlugin"));
var useThrottlePlugin_1 = tslib_1.__importDefault(require("./plugins/useThrottlePlugin"));
var useRequestImplement_1 = tslib_1.__importDefault(require("./useRequestImplement"));
// function useRequest<TData, TParams extends any[], TFormated, TTFormated extends TFormated = any>(
//   service: Service<TData, TParams>,
//   options: OptionsWithFormat<TData, TParams, TFormated, TTFormated>,
//   plugins?: Plugin<TData, TParams>[],
// ): Result<TFormated, TParams>
// function useRequest<TData, TParams extends any[]>(
//   service: Service<TData, TParams>,
//   options?: OptionsWithoutFormat<TData, TParams>,
//   plugins?: Plugin<TData, TParams>[],
// ): Result<TData, TParams>
function useRequest(service, options, plugins) {
  return (0, useRequestImplement_1["default"])(service, options, tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(plugins || []), false), [useDebouncePlugin_1["default"], useLoadingDelayPlugin_1["default"], usePollingPlugin_1["default"], useRefreshOnWindowFocusPlugin_1["default"], useThrottlePlugin_1["default"], useAutoRunPlugin_1["default"], useCachePlugin_1["default"], useRetryPlugin_1["default"]], false));
}
exports["default"] = useRequest;