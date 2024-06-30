import { getTargetElement } from './domTarget';
var checkIfAllInShadow = function checkIfAllInShadow(targets) {
  return targets.every(function (item) {
    var targetElement = getTargetElement(item);
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
    return getShadow(getTargetElement(targets[0]));
  }
  return document;
};
export default getDocumentOrShadow;