import { useCallback, useEffect, useRef } from 'react';
import isNumber from 'lodash/isNumber';
import useMemoizedFn from '../useMemoizedFn';
var useTimeout = function useTimeout(fn, delay) {
  var timerCallback = useMemoizedFn(fn);
  var timerRef = useRef(null);
  var clear = useCallback(function () {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);
  useEffect(function () {
    if (!isNumber(delay) || delay < 0) {
      return;
    }
    timerRef.current = setTimeout(timerCallback, delay);
    return clear;
  }, [delay]);
  return clear;
};
export default useTimeout;