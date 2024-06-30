import { __read } from "tslib";
import { useCallback, useState } from 'react';
var useUpdate = function useUpdate() {
  var _a = __read(useState({}), 2),
    setState = _a[1];
  return useCallback(function () {
    return setState({});
  }, []);
};
export default useUpdate;