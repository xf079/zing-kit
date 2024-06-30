"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var tslib_1 = require("tslib");
var react_1 = require("react");
var useDynamicList = function useDynamicList(initialList) {
  if (initialList === void 0) {
    initialList = [];
  }
  var counterRef = (0, react_1.useRef)(-1);
  var keyList = (0, react_1.useRef)([]);
  var setKey = (0, react_1.useCallback)(function (index) {
    counterRef.current += 1;
    keyList.current.splice(index, 0, counterRef.current);
  }, []);
  var _a = tslib_1.__read((0, react_1.useState)(function () {
      initialList.forEach(function (_, index) {
        setKey(index);
      });
      return initialList;
    }), 2),
    list = _a[0],
    setList = _a[1];
  var resetList = (0, react_1.useCallback)(function (newList) {
    keyList.current = [];
    setList(function () {
      newList.forEach(function (_, index) {
        setKey(index);
      });
      return newList;
    });
  }, []);
  var insert = (0, react_1.useCallback)(function (index, item) {
    setList(function (l) {
      var temp = tslib_1.__spreadArray([], tslib_1.__read(l), false);
      temp.splice(index, 0, item);
      setKey(index);
      return temp;
    });
  }, []);
  var getKey = (0, react_1.useCallback)(function (index) {
    return keyList.current[index];
  }, []);
  var getIndex = (0, react_1.useCallback)(function (key) {
    return keyList.current.findIndex(function (ele) {
      return ele === key;
    });
  }, []);
  var merge = (0, react_1.useCallback)(function (index, items) {
    setList(function (l) {
      var temp = tslib_1.__spreadArray([], tslib_1.__read(l), false);
      items.forEach(function (_, i) {
        setKey(index + i);
      });
      temp.splice.apply(temp, tslib_1.__spreadArray([index, 0], tslib_1.__read(items), false));
      return temp;
    });
  }, []);
  var replace = (0, react_1.useCallback)(function (index, item) {
    setList(function (l) {
      var temp = tslib_1.__spreadArray([], tslib_1.__read(l), false);
      temp[index] = item;
      return temp;
    });
  }, []);
  var remove = (0, react_1.useCallback)(function (index) {
    setList(function (l) {
      var temp = tslib_1.__spreadArray([], tslib_1.__read(l), false);
      temp.splice(index, 1);
      // remove keys if necessary
      try {
        keyList.current.splice(index, 1);
      } catch (e) {
        console.error(e);
      }
      return temp;
    });
  }, []);
  var batchRemove = (0, react_1.useCallback)(function (indexes) {
    if (!Array.isArray(indexes)) {
      return;
    }
    if (!indexes.length) {
      return;
    }
    setList(function (prevList) {
      var newKeyList = [];
      var newList = prevList.filter(function (item, index) {
        var shouldKeep = !indexes.includes(index);
        if (shouldKeep) {
          newKeyList.push(getKey(index));
        }
        return shouldKeep;
      });
      keyList.current = newKeyList;
      return newList;
    });
  }, []);
  var move = (0, react_1.useCallback)(function (oldIndex, newIndex) {
    if (oldIndex === newIndex) {
      return;
    }
    setList(function (l) {
      var newList = tslib_1.__spreadArray([], tslib_1.__read(l), false);
      var temp = newList.filter(function (_, index) {
        return index !== oldIndex;
      });
      temp.splice(newIndex, 0, newList[oldIndex]);
      // move keys if necessary
      try {
        var keyTemp = keyList.current.filter(function (_, index) {
          return index !== oldIndex;
        });
        keyTemp.splice(newIndex, 0, keyList.current[oldIndex]);
        keyList.current = keyTemp;
      } catch (e) {
        console.error(e);
      }
      return temp;
    });
  }, []);
  var push = (0, react_1.useCallback)(function (item) {
    setList(function (l) {
      setKey(l.length);
      return l.concat([item]);
    });
  }, []);
  var pop = (0, react_1.useCallback)(function () {
    // remove keys if necessary
    try {
      keyList.current = keyList.current.slice(0, keyList.current.length - 1);
    } catch (e) {
      console.error(e);
    }
    setList(function (l) {
      return l.slice(0, l.length - 1);
    });
  }, []);
  var unshift = (0, react_1.useCallback)(function (item) {
    setList(function (l) {
      setKey(0);
      return [item].concat(l);
    });
  }, []);
  var shift = (0, react_1.useCallback)(function () {
    // remove keys if necessary
    try {
      keyList.current = keyList.current.slice(1, keyList.current.length);
    } catch (e) {
      console.error(e);
    }
    setList(function (l) {
      return l.slice(1, l.length);
    });
  }, []);
  var sortList = (0, react_1.useCallback)(function (result) {
    return result.map(function (item, index) {
      return {
        key: index,
        item: item
      };
    }) // add index into obj
    .sort(function (a, b) {
      return getIndex(a.key) - getIndex(b.key);
    }) // sort based on the index of table
    .filter(function (item) {
      return !!item.item;
    }) // remove undefined(s)
    .map(function (item) {
      return item.item;
    });
  },
  // retrive the data
  []);
  return {
    list: list,
    insert: insert,
    merge: merge,
    replace: replace,
    remove: remove,
    batchRemove: batchRemove,
    getKey: getKey,
    getIndex: getIndex,
    move: move,
    push: push,
    pop: pop,
    unshift: unshift,
    shift: shift,
    sortList: sortList,
    resetList: resetList
  };
};
exports["default"] = useDynamicList;