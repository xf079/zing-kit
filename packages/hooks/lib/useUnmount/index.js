"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var tslib_1 = require("tslib");
var react_1 = require("react");
var useLatest_1 = tslib_1.__importDefault(require("../useLatest"));
var useUnmount = function useUnmount(fn) {
  var fnRef = (0, useLatest_1["default"])(fn);
  (0, react_1.useEffect)(function () {
    return function () {
      fnRef.current();
    };
  }, []);
};
exports["default"] = useUnmount;