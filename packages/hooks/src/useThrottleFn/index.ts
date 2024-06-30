import throttle from 'lodash/throttle'
import { useMemo } from 'react';
import useLatest from '../useLatest';
import type { ThrottleOptions } from '../useThrottle/throttleOptions';
import useUnmount from '../useUnmount';

type noop = (...args: any[]) => any;

type DebouncedFuncLeading = {
  run: (...args: Parameters<noop>) => ReturnType<noop>;
  cancel: () => void;
  flush: () => void;
};

function useThrottleFn<T extends noop>(fn: T, options?: ThrottleOptions): DebouncedFuncLeading {
  const fnRef = useLatest(fn);

  const wait = options?.wait ?? 1000;

  const throttled = useMemo(
    () =>
      throttle(
        (...args: Parameters<T>): ReturnType<T> => {
          return fnRef.current(...args);
        },
        wait,
        options
      ),
    []
  );

  useUnmount(() => {
    throttled.cancel();
  });

  return {
    run: throttled,
    cancel: throttled.cancel,
    flush: throttled.flush
  };
}

export default useThrottleFn;
