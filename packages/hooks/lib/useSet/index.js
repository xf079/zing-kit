"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var tslib_1 = require("tslib");
var react_1 = require("react");
var useMemoizedFn_1 = tslib_1.__importDefault(require("../useMemoizedFn"));
function useSet(initialValue) {
  var getInitValue = function getInitValue() {
    return new Set(initialValue);
  };
  var _a = tslib_1.__read((0, react_1.useState)(getInitValue), 2),
    set = _a[0],
    setSet = _a[1];
  var add = function add(key) {
    if (set.has(key)) {
      return;
    }
    setSet(function (prevSet) {
      var temp = new Set(prevSet);
      temp.add(key);
      return temp;
    });
  };
  var remove = function remove(key) {
    if (!set.has(key)) {
      return;
    }
    setSet(function (prevSet) {
      var temp = new Set(prevSet);
      temp["delete"](key);
      return temp;
    });
  };
  var reset = function reset() {
    return setSet(getInitValue());
  };
  return [set, {
    add: (0, useMemoizedFn_1["default"])(add),
    remove: (0, useMemoizedFn_1["default"])(remove),
    reset: (0, useMemoizedFn_1["default"])(reset)
  }];
}
exports["default"] = useSet;