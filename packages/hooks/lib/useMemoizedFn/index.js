"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var react_1 = require("react");
function useMemoizedFn(fn) {
  var fnRef = (0, react_1.useRef)(fn);
  // why not write `fnRef.current = fn`?
  // https://github.com/alibaba/hooks/issues/728
  fnRef.current = (0, react_1.useMemo)(function () {
    return fn;
  }, [fn]);
  var memoizedFn = (0, react_1.useRef)();
  if (!memoizedFn.current) {
    memoizedFn.current = function () {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return fnRef.current.apply(this, args);
    };
  }
  return memoizedFn.current;
}
exports["default"] = useMemoizedFn;