"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var isAppleDevice = /(mac|iphone|ipod|ipad)/i.test(typeof navigator !== 'undefined' ? navigator === null || navigator === void 0 ? void 0 : navigator.platform : '');
exports["default"] = isAppleDevice;