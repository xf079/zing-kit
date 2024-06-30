import { __read } from "tslib";
import { useState } from 'react';
import useMemoizedFn from '../useMemoizedFn';
function useMap(initialValue) {
  var getInitValue = function getInitValue() {
    return new Map(initialValue);
  };
  var _a = __read(useState(getInitValue), 2),
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
    set: useMemoizedFn(set),
    setAll: useMemoizedFn(setAll),
    remove: useMemoizedFn(remove),
    reset: useMemoizedFn(reset),
    get: useMemoizedFn(get)
  }];
}
export default useMap;