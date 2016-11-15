'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pathHasChanged = pathHasChanged;

var _utils = require('redux-saga/utils');

function pathHasChanged(currentPath, newPath) {
  if (!currentPath && newPath || currentPath && !newPath || currentPath.length < newPath.length) {
    return true;
  } else {
    for (var i = 0; i < newPath.length; i++) {
      if (currentPath[i] !== newPath[i]) {
        return true;
      }
    }
  }
  return false;
}