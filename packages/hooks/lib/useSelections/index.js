"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var tslib_1 = require("tslib");
var react_1 = require("react");
var isPlainObject_1 = tslib_1.__importDefault(require("lodash/isPlainObject"));
var isFunction_1 = tslib_1.__importDefault(require("lodash/isFunction"));
var isString_1 = tslib_1.__importDefault(require("lodash/isString"));
var useMemoizedFn_1 = tslib_1.__importDefault(require("../useMemoizedFn"));
function useSelections(items, options) {
  var _a, _b;
  var defaultSelected = [];
  var itemKey;
  if (Array.isArray(options)) {
    defaultSelected = options;
  } else if ((0, isPlainObject_1["default"])(options)) {
    defaultSelected = (_a = options === null || options === void 0 ? void 0 : options.defaultSelected) !== null && _a !== void 0 ? _a : defaultSelected;
    itemKey = (_b = options === null || options === void 0 ? void 0 : options.itemKey) !== null && _b !== void 0 ? _b : itemKey;
  }
  var getKey = function getKey(item) {
    if ((0, isFunction_1["default"])(itemKey)) {
      return itemKey(item);
    }
    if (itemKey && (0, isString_1["default"])(itemKey) && (0, isPlainObject_1["default"])(item)) {
      return item[itemKey];
    }
    return item;
  };
  var _c = tslib_1.__read((0, react_1.useState)(defaultSelected), 2),
    selected = _c[0],
    setSelected = _c[1];
  var selectedMap = (0, react_1.useMemo)(function () {
    var keyToItemMap = new Map();
    if (!Array.isArray(selected)) {
      return keyToItemMap;
    }
    selected.forEach(function (item) {
      keyToItemMap.set(getKey(item), item);
    });
    return keyToItemMap;
  }, [selected]);
  var isSelected = function isSelected(item) {
    return selectedMap.has(getKey(item));
  };
  var select = function select(item) {
    selectedMap.set(getKey(item), item);
    setSelected(Array.from(selectedMap.values()));
  };
  var unSelect = function unSelect(item) {
    selectedMap["delete"](getKey(item));
    setSelected(Array.from(selectedMap.values()));
  };
  var toggle = function toggle(item) {
    if (isSelected(item)) {
      unSelect(item);
    } else {
      select(item);
    }
  };
  var selectAll = function selectAll() {
    items.forEach(function (item) {
      selectedMap.set(getKey(item), item);
    });
    setSelected(Array.from(selectedMap.values()));
  };
  var unSelectAll = function unSelectAll() {
    items.forEach(function (item) {
      selectedMap["delete"](getKey(item));
    });
    setSelected(Array.from(selectedMap.values()));
  };
  var noneSelected = (0, react_1.useMemo)(function () {
    return items.every(function (item) {
      return !selectedMap.has(getKey(item));
    });
  }, [items, selectedMap]);
  var allSelected = (0, react_1.useMemo)(function () {
    return items.every(function (item) {
      return selectedMap.has(getKey(item));
    }) && !noneSelected;
  }, [items, selectedMap, noneSelected]);
  var partiallySelected = (0, react_1.useMemo)(function () {
    return !noneSelected && !allSelected;
  }, [noneSelected, allSelected]);
  var toggleAll = function toggleAll() {
    return allSelected ? unSelectAll() : selectAll();
  };
  var clearAll = function clearAll() {
    selectedMap.clear();
    setSelected([]);
  };
  return {
    selected: selected,
    noneSelected: noneSelected,
    allSelected: allSelected,
    partiallySelected: partiallySelected,
    setSelected: setSelected,
    isSelected: isSelected,
    select: (0, useMemoizedFn_1["default"])(select),
    unSelect: (0, useMemoizedFn_1["default"])(unSelect),
    toggle: (0, useMemoizedFn_1["default"])(toggle),
    selectAll: (0, useMemoizedFn_1["default"])(selectAll),
    unSelectAll: (0, useMemoizedFn_1["default"])(unSelectAll),
    clearAll: (0, useMemoizedFn_1["default"])(clearAll),
    toggleAll: (0, useMemoizedFn_1["default"])(toggleAll)
  };
}
exports["default"] = useSelections;