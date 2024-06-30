import { useEffect } from 'react';
var useMount = function useMount(fn) {
  useEffect(function () {
    fn === null || fn === void 0 ? void 0 : fn();
  }, []);
};
export default useMount;