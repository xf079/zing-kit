"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var domTarget_1 = require("./domTarget");
var checkIfAllInShadow = function checkIfAllInShadow(targets) {
  return targets.every(function (item) {
    var targetElement = (0, domTarget_1.getTargetElement)(item);
    if (!targetElement) return false;
    if (targetElement.getRootNode() instanceof ShadowRoot) return true;
    return false;
  });
};
var getShadow = function getShadow(node) {
  if (!node) {
    return document;
  }
  return node.getRootNode();
};
var getDocumentOrShadow = function getDocumentOrShadow(target) {
  if (!target || !document.getRootNode) {
    return document;
  }
  var targets = Array.isArray(target) ? target : [target];
  if (checkIfAllInShadow(targets)) {
    return getShadow((0, domTarget_1.getTargetElement)(targets[0]));
  }
  return document;
};
exports["default"] = getDocumentOrShadow;