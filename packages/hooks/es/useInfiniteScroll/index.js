import { __assign, __awaiter, __generator, __read, __spreadArray } from "tslib";
import { useMemo, useState } from 'react';
import useMemoizedFn from '../useMemoizedFn';
import useRequest from '../useRequest';
import useUpdateEffect from '../useUpdateEffect';
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
  var _c = __read(useState(), 2),
    finalData = _c[0],
    setFinalData = _c[1];
  var _d = __read(useState(false), 2),
    loadingMore = _d[0],
    setLoadingMore = _d[1];
  var noMore = useMemo(function () {
    if (!isNoMore) return false;
    return isNoMore(finalData);
  }, [finalData]);
  var _e = useRequest(function (lastData) {
      return __awaiter(void 0, void 0, void 0, function () {
        var currentData;
        var _a, _b;
        return __generator(this, function (_c) {
          switch (_c.label) {
            case 0:
              return [4 /*yield*/, service(lastData)];
            case 1:
              currentData = _c.sent();
              if (!lastData) {
                setFinalData(__assign(__assign({}, currentData), {
                  list: __spreadArray([], __read((_a = currentData.list) !== null && _a !== void 0 ? _a : []), false)
                }));
              } else {
                setFinalData(__assign(__assign({}, currentData), {
                  list: __spreadArray(__spreadArray([], __read((_b = lastData.list) !== null && _b !== void 0 ? _b : []), false), __read(currentData.list), false)
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
  var loadMore = useMemoizedFn(function () {
    if (noMore) return;
    setLoadingMore(true);
    run(finalData);
  });
  var loadMoreAsync = useMemoizedFn(function () {
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
  useUpdateEffect(function () {
    run();
  }, __spreadArray([], __read(reloadDeps), false));
  return {
    data: finalData,
    loading: !loadingMore && loading,
    error: error,
    loadingMore: loadingMore,
    noMore: noMore,
    loadMore: loadMore,
    loadMoreAsync: loadMoreAsync,
    reload: useMemoizedFn(reload),
    reloadAsync: useMemoizedFn(reloadAsync),
    mutate: setFinalData,
    cancel: cancel
  };
};
export default useInfiniteScroll;