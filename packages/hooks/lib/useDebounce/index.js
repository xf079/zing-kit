"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var tslib_1 = require("tslib");
var react_1 = require("react");
var useDebounceFn_1 = tslib_1.__importDefault(require("../useDebounceFn"));
function useDebounce(value, options) {
  var _a = tslib_1.__read((0, react_1.useState)(value), 2),
    debounced = _a[0],
    setDebounced = _a[1];
  var run = (0, useDebounceFn_1["default"])(function () {
    setDebounced(value);
  }, options).run;
  (0, react_1.useEffect)(function () {
    run();
  }, [value]);
  return debounced;
}
exports["default"] = useDebounce;