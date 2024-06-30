import { useRef } from 'react';
var useLoadingDelayPlugin = function useLoadingDelayPlugin(fetchInstance, _a) {
  var loadingDelay = _a.loadingDelay,
    ready = _a.ready;
  var timerRef = useRef();
  if (!loadingDelay) {
    return {};
  }
  var cancelTimeout = function cancelTimeout() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };
  return {
    onBefore: function onBefore() {
      cancelTimeout();
      // Two cases:
      // 1. ready === undefined
      // 2. ready === true
      if (ready !== false) {
        timerRef.current = setTimeout(function () {
          fetchInstance.setState({
            loading: true
          });
        }, loadingDelay);
      }
      return {
        loading: false
      };
    },
    onFinally: function onFinally() {
      cancelTimeout();
    },
    onCancel: function onCancel() {
      cancelTimeout();
    }
  };
};
export default useLoadingDelayPlugin;