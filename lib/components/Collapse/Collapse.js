'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Icons = require('components/Icons');

require('./Collapse.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function Collapse(_ref) {
  var collapsed = _ref.collapsed,
      onClick = _ref.onClick,
      rest = _objectWithoutProperties(_ref, ['collapsed', 'onClick']);

  return _react2.default.createElement(
    'div',
    _extends({ className: 'collapse', onClick: onClick }, rest),
    collapsed ? _react2.default.createElement(_Icons.IconUnfold, null) : _react2.default.createElement(_Icons.IconFold, null)
  );
}

Collapse.propTypes = {
  collapsed: _react.PropTypes.bool,
  onClick: _react.PropTypes.func
};

exports.default = Collapse;