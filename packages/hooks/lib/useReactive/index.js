"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var tslib_1 = require("tslib");
var react_1 = require("react");
var isPlainObject_1 = tslib_1.__importDefault(require("lodash/isPlainObject"));
var useCreation_1 = tslib_1.__importDefault(require("../useCreation"));
var useUpdate_1 = tslib_1.__importDefault(require("../useUpdate"));
// k:v 原对象:代理过的对象
var proxyMap = new WeakMap();
// k:v 代理过的对象:原对象
var rawMap = new WeakMap();
function observer(initialVal, cb) {
  var existingProxy = proxyMap.get(initialVal);
  // 添加缓存 防止重新构建proxy
  if (existingProxy) {
    return existingProxy;
  }
  // 防止代理已经代理过的对象
  // https://github.com/alibaba/hooks/issues/839
  if (rawMap.has(initialVal)) {
    return initialVal;
  }
  var proxy = new Proxy(initialVal, {
    get: function get(target, key, receiver) {
      var res = Reflect.get(target, key, receiver);
      // https://github.com/alibaba/hooks/issues/1317
      var descriptor = Reflect.getOwnPropertyDescriptor(target, key);
      if (!(descriptor === null || descriptor === void 0 ? void 0 : descriptor.configurable) && !(descriptor === null || descriptor === void 0 ? void 0 : descriptor.writable)) {
        return res;
      }
      // Only proxy plain object or array,
      // otherwise it will cause: https://github.com/alibaba/hooks/issues/2080
      return (0, isPlainObject_1["default"])(res) || Array.isArray(res) ? observer(res, cb) : res;
    },
    set: function set(target, key, val) {
      var ret = Reflect.set(target, key, val);
      cb();
      return ret;
    },
    deleteProperty: function deleteProperty(target, key) {
      var ret = Reflect.deleteProperty(target, key);
      cb();
      return ret;
    }
  });
  proxyMap.set(initialVal, proxy);
  rawMap.set(proxy, initialVal);
  return proxy;
}
function useReactive(initialState) {
  var update = (0, useUpdate_1["default"])();
  var stateRef = (0, react_1.useRef)(initialState);
  var state = (0, useCreation_1["default"])(function () {
    return observer(stateRef.current, function () {
      update();
    });
  }, []);
  return state;
}
exports["default"] = useReactive;