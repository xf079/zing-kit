"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var react_1 = require("react");
var useMount = function useMount(fn) {
  (0, react_1.useEffect)(function () {
    fn === null || fn === void 0 ? void 0 : fn();
  }, []);
};
exports["default"] = useMount;