'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.Row = Row;
exports.Cell = Cell;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./index.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function Row(_ref) {
  var className = _ref.className,
      children = _ref.children,
      rest = _objectWithoutProperties(_ref, ['className', 'children']);

  return _react2.default.createElement(
    'div',
    _extends({ className: 'row ' + (className || '') }, rest),
    children
  );
}

function Cell(_ref2) {
  var className = _ref2.className,
      children = _ref2.children,
      rest = _objectWithoutProperties(_ref2, ['className', 'children']);

  return _react2.default.createElement(
    'div',
    _extends({ className: 'cell ' + (className || '') }, rest),
    children
  );
}