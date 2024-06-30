import { __read, __spreadArray } from "tslib";
import throttle from 'lodash/throttle';
import { useMemo } from 'react';
import useLatest from '../useLatest';
import useUnmount from '../useUnmount';
function useThrottleFn(fn, options) {
  var _a;
  var fnRef = useLatest(fn);
  var wait = (_a = options === null || options === void 0 ? void 0 : options.wait) !== null && _a !== void 0 ? _a : 1000;
  var throttled = useMemo(function () {
    return throttle(function () {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return fnRef.current.apply(fnRef, __spreadArray([], __read(args), false));
    }, wait, options);
  }, []);
  useUnmount(function () {
    throttled.cancel();
  });
  return {
    run: throttled,
    cancel: throttled.cancel,
    flush: throttled.flush
  };
}
export default useThrottleFn;