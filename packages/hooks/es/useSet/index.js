import { __read } from "tslib";
import { useState } from 'react';
import useMemoizedFn from '../useMemoizedFn';
function useSet(initialValue) {
  var getInitValue = function getInitValue() {
    return new Set(initialValue);
  };
  var _a = __read(useState(getInitValue), 2),
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
    add: useMemoizedFn(add),
    remove: useMemoizedFn(remove),
    reset: useMemoizedFn(reset)
  }];
}
export default useSet;