"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var tslib_1 = require("tslib");
var react_1 = require("react");
var useUpdate = function useUpdate() {
  var _a = tslib_1.__read((0, react_1.useState)({}), 2),
    setState = _a[1];
  return (0, react_1.useCallback)(function () {
    return setState({});
  }, []);
};
exports["default"] = useUpdate;