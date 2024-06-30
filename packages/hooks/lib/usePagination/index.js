"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var tslib_1 = require("tslib");
var react_1 = require("react");
var useMemoizedFn_1 = tslib_1.__importDefault(require("../useMemoizedFn"));
var useRequest_1 = tslib_1.__importDefault(require("../useRequest"));
var usePagination = function usePagination(service, options) {
  var _a;
  if (options === void 0) {
    options = {};
  }
  var _b = options.defaultPageSize,
    defaultPageSize = _b === void 0 ? 10 : _b,
    _c = options.defaultCurrent,
    defaultCurrent = _c === void 0 ? 1 : _c,
    rest = tslib_1.__rest(options, ["defaultPageSize", "defaultCurrent"]);
  var result = (0, useRequest_1["default"])(service, tslib_1.__assign({
    // @ts-ignore
    defaultParams: [{
      current: defaultCurrent,
      pageSize: defaultPageSize
    }],
    refreshDepsAction: function refreshDepsAction() {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      changeCurrent(1);
    }
  }, rest));
  var _d = result.params[0] || {},
    _e = _d.current,
    current = _e === void 0 ? 1 : _e,
    _f = _d.pageSize,
    pageSize = _f === void 0 ? defaultPageSize : _f;
  var total = ((_a = result.data) === null || _a === void 0 ? void 0 : _a.total) || 0;
  var totalPage = (0, react_1.useMemo)(function () {
    return Math.ceil(total / pageSize);
  }, [pageSize, total]);
  var onChange = function onChange(c, p) {
    var toCurrent = c <= 0 ? 1 : c;
    var toPageSize = p <= 0 ? 1 : p;
    var tempTotalPage = Math.ceil(total / toPageSize);
    if (toCurrent > tempTotalPage) {
      toCurrent = Math.max(1, tempTotalPage);
    }
    var _a = tslib_1.__read(result.params || []),
      _b = _a[0],
      oldPaginationParams = _b === void 0 ? {} : _b,
      restParams = _a.slice(1);
    result.run.apply(result, tslib_1.__spreadArray([tslib_1.__assign(tslib_1.__assign({}, oldPaginationParams), {
      current: toCurrent,
      pageSize: toPageSize
    })], tslib_1.__read(restParams), false));
  };
  var changeCurrent = function changeCurrent(c) {
    onChange(c, pageSize);
  };
  var changePageSize = function changePageSize(p) {
    onChange(current, p);
  };
  return tslib_1.__assign(tslib_1.__assign({}, result), {
    pagination: {
      current: current,
      pageSize: pageSize,
      total: total,
      totalPage: totalPage,
      onChange: (0, useMemoizedFn_1["default"])(onChange),
      changeCurrent: (0, useMemoizedFn_1["default"])(changeCurrent),
      changePageSize: (0, useMemoizedFn_1["default"])(changePageSize)
    }
  });
};
exports["default"] = usePagination;