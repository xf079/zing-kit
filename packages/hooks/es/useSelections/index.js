import { __read } from "tslib";
import { useMemo, useState } from 'react';
import isPlainObject from 'lodash/isPlainObject';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import useMemoizedFn from '../useMemoizedFn';
export default function useSelections(items, options) {
  var _a, _b;
  var defaultSelected = [];
  var itemKey;
  if (Array.isArray(options)) {
    defaultSelected = options;
  } else if (isPlainObject(options)) {
    defaultSelected = (_a = options === null || options === void 0 ? void 0 : options.defaultSelected) !== null && _a !== void 0 ? _a : defaultSelected;
    itemKey = (_b = options === null || options === void 0 ? void 0 : options.itemKey) !== null && _b !== void 0 ? _b : itemKey;
  }
  var getKey = function getKey(item) {
    if (isFunction(itemKey)) {
      return itemKey(item);
    }
    if (itemKey && isString(itemKey) && isPlainObject(item)) {
      return item[itemKey];
    }
    return item;
  };
  var _c = __read(useState(defaultSelected), 2),
    selected = _c[0],
    setSelected = _c[1];
  var selectedMap = useMemo(function () {
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
  var noneSelected = useMemo(function () {
    return items.every(function (item) {
      return !selectedMap.has(getKey(item));
    });
  }, [items, selectedMap]);
  var allSelected = useMemo(function () {
    return items.every(function (item) {
      return selectedMap.has(getKey(item));
    }) && !noneSelected;
  }, [items, selectedMap, noneSelected]);
  var partiallySelected = useMemo(function () {
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
    select: useMemoizedFn(select),
    unSelect: useMemoizedFn(unSelect),
    toggle: useMemoizedFn(toggle),
    selectAll: useMemoizedFn(selectAll),
    unSelectAll: useMemoizedFn(unSelectAll),
    clearAll: useMemoizedFn(clearAll),
    toggleAll: useMemoizedFn(toggleAll)
  };
}