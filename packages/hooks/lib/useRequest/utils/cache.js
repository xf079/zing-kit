"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearCache = exports.setCache = exports.getCache = void 0;
var tslib_1 = require("tslib");
var cache = new Map();
var setCache = function setCache(key, cacheTime, cachedData) {
  var currentCache = cache.get(key);
  if (currentCache === null || currentCache === void 0 ? void 0 : currentCache.timer) {
    clearTimeout(currentCache.timer);
  }
  var timer = undefined;
  if (cacheTime > -1) {
    // if cache out, clear it
    timer = setTimeout(function () {
      cache["delete"](key);
    }, cacheTime);
  }
  cache.set(key, tslib_1.__assign(tslib_1.__assign({}, cachedData), {
    timer: timer
  }));
};
exports.setCache = setCache;
var getCache = function getCache(key) {
  return cache.get(key);
};
exports.getCache = getCache;
var clearCache = function clearCache(key) {
  if (key) {
    var cacheKeys = Array.isArray(key) ? key : [key];
    cacheKeys.forEach(function (cacheKey) {
      return cache["delete"](cacheKey);
    });
  } else {
    cache.clear();
  }
};
exports.clearCache = clearCache;