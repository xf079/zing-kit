import { useEffect } from 'react';
import useLatest from '../useLatest';
var useUnmount = function useUnmount(fn) {
  var fnRef = useLatest(fn);
  useEffect(function () {
    return function () {
      fnRef.current();
    };
  }, []);
};
export default useUnmount;