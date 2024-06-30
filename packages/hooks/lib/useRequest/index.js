"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearCache = void 0;
var tslib_1 = require("tslib");
var useRequest_1 = tslib_1.__importDefault(require("./useRequest"));
var cache_1 = require("./utils/cache");
Object.defineProperty(exports, "clearCache", {
  enumerable: true,
  get: function get() {
    return cache_1.clearCache;
  }
});
exports["default"] = useRequest_1["default"];