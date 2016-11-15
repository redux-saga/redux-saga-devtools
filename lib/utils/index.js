'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withCapture = withCapture;
exports.cif = cif;
exports.pathHasChanged = pathHasChanged;
var KEY_ARROW_DOWN = exports.KEY_ARROW_DOWN = 40;
var KEY_ARROW_UP = exports.KEY_ARROW_UP = 38;
var KEY_ARROW_LEFT = exports.KEY_ARROW_LEFT = 37;
var KEY_ARROW_RIGHT = exports.KEY_ARROW_RIGHT = 39;

var id = exports.id = function id(x) {
  return x;
};

function withCapture(handler) {
  return function (e) {
    var res = handler(e);
    e.stopPropagation();
    return res;
  };
}

var trapMouseDown = exports.trapMouseDown = {
  onMouseDown: function onMouseDown(e) {
    return e.stopPropagation();
  }
};

function cif(condition, className) {
  return condition ? className : '';
}

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