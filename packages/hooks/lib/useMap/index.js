"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var tslib_1 = require("tslib");
var react_1 = require("react");
var useMemoizedFn_1 = tslib_1.__importDefault(require("../useMemoizedFn"));
function useMap(initialValue) {
  var getInitValue = function getInitValue() {
    return new Map(initialValue);
  };
  var _a = tslib_1.__read((0, react_1.useState)(getInitValue), 2),
    map = _a[0],
    setMap = _a[1];
  var set = function set(key, entry) {
    setMap(function (prev) {
      var temp = new Map(prev);
      temp.set(key, entry);
      return temp;
    });
  };
  var setAll = function setAll(newMap) {
    setMap(new Map(newMap));
  };
  var remove = function remove(key) {
    setMap(function (prev) {
      var temp = new Map(prev);
      temp["delete"](key);
      return temp;
    });
  };
  var reset = function reset() {
    return setMap(getInitValue());
  };
  var get = function get(key) {
    return map.get(key);
  };
  return [map, {
    set: (0, useMemoizedFn_1["default"])(set),
    setAll: (0, useMemoizedFn_1["default"])(setAll),
    remove: (0, useMemoizedFn_1["default"])(remove),
    reset: (0, useMemoizedFn_1["default"])(reset),
    get: (0, useMemoizedFn_1["default"])(get)
  }];
}
exports["default"] = useMap;