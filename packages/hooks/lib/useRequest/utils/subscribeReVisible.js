"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var tslib_1 = require("tslib");
var isBrowser_1 = tslib_1.__importDefault(require("../../utils/isBrowser"));
var isDocumentVisible_1 = tslib_1.__importDefault(require("./isDocumentVisible"));
var listeners = [];
function subscribe(listener) {
  listeners.push(listener);
  return function unsubscribe() {
    var index = listeners.indexOf(listener);
    listeners.splice(index, 1);
  };
}
if (isBrowser_1["default"]) {
  var revalidate = function revalidate() {
    if (!(0, isDocumentVisible_1["default"])()) return;
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }
  };
  window.addEventListener('visibilitychange', revalidate, false);
}
exports["default"] = subscribe;