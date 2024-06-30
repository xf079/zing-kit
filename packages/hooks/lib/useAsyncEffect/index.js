"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var tslib_1 = require("tslib");
var react_1 = require("react");
var isFunction_1 = tslib_1.__importDefault(require("lodash/isFunction"));
function isAsyncGenerator(val) {
  return (0, isFunction_1["default"])(val[Symbol.asyncIterator]);
}
function useAsyncEffect(effect, deps) {
  (0, react_1.useEffect)(function () {
    var e = effect();
    var cancelled = false;
    function execute() {
      return tslib_1.__awaiter(this, void 0, void 0, function () {
        var result;
        return tslib_1.__generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              if (!isAsyncGenerator(e)) return [3 /*break*/, 4];
              _a.label = 1;
            case 1:
              if (!true) return [3 /*break*/, 3];
              return [4 /*yield*/, e.next()];
            case 2:
              result = _a.sent();
              if (result.done || cancelled) {
                return [3 /*break*/, 3];
              }
              return [3 /*break*/, 1];
            case 3:
              return [3 /*break*/, 6];
            case 4:
              return [4 /*yield*/, e];
            case 5:
              _a.sent();
              _a.label = 6;
            case 6:
              return [2 /*return*/];
          }
        });
      });
    }
    execute();
    return function () {
      cancelled = true;
    };
  }, deps);
}
exports["default"] = useAsyncEffect;