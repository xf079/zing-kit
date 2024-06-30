"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var tslib_1 = require("tslib");
var react_1 = require("react");
function useWhyDidYouUpdate(componentName, props) {
  var prevProps = (0, react_1.useRef)({});
  (0, react_1.useEffect)(function () {
    if (prevProps.current) {
      var allKeys = Object.keys(tslib_1.__assign(tslib_1.__assign({}, prevProps.current), props));
      var changedProps_1 = {};
      allKeys.forEach(function (key) {
        if (!Object.is(prevProps.current[key], props[key])) {
          changedProps_1[key] = {
            from: prevProps.current[key],
            to: props[key]
          };
        }
      });
      if (Object.keys(changedProps_1).length) {
        console.log('[why-did-you-update]', componentName, changedProps_1);
      }
    }
    prevProps.current = props;
  });
}
exports["default"] = useWhyDidYouUpdate;