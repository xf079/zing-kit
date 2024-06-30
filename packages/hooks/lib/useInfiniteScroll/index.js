"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var tslib_1 = require("tslib");
var react_1 = require("react");
var useMemoizedFn_1 = tslib_1.__importDefault(require("../useMemoizedFn"));
var useRequest_1 = tslib_1.__importDefault(require("../useRequest"));
var useUpdateEffect_1 = tslib_1.__importDefault(require("../useUpdateEffect"));
var useInfiniteScroll = function useInfiniteScroll(service, options) {
  if (options === void 0) {
    options = {};
  }
  var target = options.target,
    isNoMore = options.isNoMore,
    _a = options.threshold,
    threshold = _a === void 0 ? 100 : _a,
    _b = options.reloadDeps,
    reloadDeps = _b === void 0 ? [] : _b,
    manual = options.manual,
    _onBefore = options.onBefore,
    _onSuccess = options.onSuccess,
    _onError = options.onError,
    _onFinally = options.onFinally;
  var _c = tslib_1.__read((0, react_1.useState)(), 2),
    finalData = _c[0],
    setFinalData = _c[1];
  var _d = tslib_1.__read((0, react_1.useState)(false), 2),
    loadingMore = _d[0],
    setLoadingMore = _d[1];
  var noMore = (0, react_1.useMemo)(function () {
    if (!isNoMore) return false;
    return isNoMore(finalData);
  }, [finalData]);
  var _e = (0, useRequest_1["default"])(function (lastData) {
      return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var currentData;
        var _a, _b;
        return tslib_1.__generator(this, function (_c) {
          switch (_c.label) {
            case 0:
              return [4 /*yield*/, service(lastData)];
            case 1:
              currentData = _c.sent();
              if (!lastData) {
                setFinalData(tslib_1.__assign(tslib_1.__assign({}, currentData), {
                  list: tslib_1.__spreadArray([], tslib_1.__read((_a = currentData.list) !== null && _a !== void 0 ? _a : []), false)
                }));
              } else {
                setFinalData(tslib_1.__assign(tslib_1.__assign({}, currentData), {
                  list: tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read((_b = lastData.list) !== null && _b !== void 0 ? _b : []), false), tslib_1.__read(currentData.list), false)
                }));
              }
              return [2 /*return*/, currentData];
          }
        });
      });
    }, {
      manual: manual,
      onFinally: function onFinally(_, d, e) {
        setLoadingMore(false);
        _onFinally === null || _onFinally === void 0 ? void 0 : _onFinally(d, e);
      },
      onBefore: function onBefore() {
        return _onBefore === null || _onBefore === void 0 ? void 0 : _onBefore();
      },
      onSuccess: function onSuccess(d) {
        _onSuccess === null || _onSuccess === void 0 ? void 0 : _onSuccess(d);
      },
      onError: function onError(e) {
        return _onError === null || _onError === void 0 ? void 0 : _onError(e);
      }
    }),
    loading = _e.loading,
    error = _e.error,
    run = _e.run,
    runAsync = _e.runAsync,
    cancel = _e.cancel;
  var loadMore = (0, useMemoizedFn_1["default"])(function () {
    if (noMore) return;
    setLoadingMore(true);
    run(finalData);
  });
  var loadMoreAsync = (0, useMemoizedFn_1["default"])(function () {
    if (noMore) return Promise.reject();
    setLoadingMore(true);
    return runAsync(finalData);
  });
  var reload = function reload() {
    setLoadingMore(false);
    return run();
  };
  var reloadAsync = function reloadAsync() {
    setLoadingMore(false);
    return runAsync();
  };
  (0, useUpdateEffect_1["default"])(function () {
    run();
  }, tslib_1.__spreadArray([], tslib_1.__read(reloadDeps), false));
  return {
    data: finalData,
    loading: !loadingMore && loading,
    error: error,
    loadingMore: loadingMore,
    noMore: noMore,
    loadMore: loadMore,
    loadMoreAsync: loadMoreAsync,
    reload: (0, useMemoizedFn_1["default"])(reload),
    reloadAsync: (0, useMemoizedFn_1["default"])(reloadAsync),
    mutate: setFinalData,
    cancel: cancel
  };
};
exports["default"] = useInfiniteScroll;