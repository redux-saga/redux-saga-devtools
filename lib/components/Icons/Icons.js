'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IconPending = exports.IconUnfold = exports.IconFold = exports.IconError = exports.IconUnpin = exports.IconPin = exports.IconCancel = exports.IconOk = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./Icons.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function icon(type) {
  return _react2.default.createElement('span', { className: type });
}

var IconOk = exports.IconOk = function IconOk() {
  return icon('icon-ok');
};
var IconCancel = exports.IconCancel = function IconCancel() {
  return icon('icon-cancel');
};
var IconPin = exports.IconPin = function IconPin() {
  return icon('icon-pin');
};
var IconUnpin = exports.IconUnpin = function IconUnpin() {
  return icon('icon-unpin');
};
var IconError = exports.IconError = function IconError() {
  return icon('icon-error');
};
var IconFold = exports.IconFold = function IconFold() {
  return icon('icon-fold');
};
var IconUnfold = exports.IconUnfold = function IconUnfold() {
  return icon('icon-unfold');
};
var IconPending = exports.IconPending = function IconPending() {
  return icon('icon-pending');
};