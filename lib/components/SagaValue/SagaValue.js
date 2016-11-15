'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SagaValue;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('redux-saga/utils');

var _JSValue = require('components/JSValue');

var _JSValue2 = _interopRequireDefault(_JSValue);

var _SagaRef = require('containers/SagaRef');

var _SagaRef2 = _interopRequireDefault(_SagaRef);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SagaValue(_ref) {
  var value = _ref.value,
      label = _ref.label,
      isIdentifier = _ref.isIdentifier;

  if (_utils.is.channel(value)) {
    return _react2.default.createElement(
      _SagaRef2.default,
      { object: value },
      label || 'Channel'
    );
  } else if (_utils.CHANNEL_END && value === _utils.CHANNEL_END) {
    return _react2.default.createElement(_JSValue2.default, { value: 'END', isIdentifier: true });
  } else {
    return _react2.default.createElement(_JSValue2.default, { value: value, label: label, isIdentifier: isIdentifier });
  }
}