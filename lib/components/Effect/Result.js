'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Result;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Icons = require('components/Icons');

var _Layout = require('components/Layout');

var _JSValue = require('components/JSValue');

var _JSValue2 = _interopRequireDefault(_JSValue);

var _SagaValue = require('components/SagaValue');

var _SagaValue2 = _interopRequireDefault(_SagaValue);

var _constants = require('store/constants');

require('./Result.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var separator = _react2.default.createElement(
  'span',
  { className: 'result-separator' },
  '\u2192'
);

var pendingIcon = _react2.default.createElement(
  _Layout.Cell,
  { className: 'result-pending' },
  _react2.default.createElement(_Icons.IconPending, null)
);

var winnerIcon = _react2.default.createElement(
  _Layout.Cell,
  { className: 'result_winner' },
  _react2.default.createElement(_Icons.IconOk, null)
);

var errorIcon = _react2.default.createElement(
  _Layout.Cell,
  { className: 'result-error' },
  _react2.default.createElement(_Icons.IconError, null)
);

var cancelIcon = _react2.default.createElement(
  _Layout.Cell,
  { className: 'result_cancelled' },
  _react2.default.createElement(_Icons.IconCancel, null)
);

function renderResolved(result, winner) {
  return _react2.default.createElement(
    'div',
    { className: 'result' },
    separator,
    winner ? winnerIcon : null,
    _react2.default.createElement(
      _Layout.Cell,
      null,
      _react2.default.createElement(_SagaValue2.default, { value: result })
    )
  );
}

function renderRejected(error) {
  return _react2.default.createElement(
    'div',
    { className: 'result' },
    separator,
    errorIcon,
    _react2.default.createElement(_JSValue2.default, { value: error })
  );
}

function Result(_ref) {
  var status = _ref.status,
      result = _ref.result,
      error = _ref.error,
      winner = _ref.winner;

  switch (status) {
    case _constants.STATUS_PENDING:
      return pendingIcon;
    case _constants.STATUS_RESOLVED:
      return renderResolved(result, winner);
    case _constants.STATUS_REJECTED:
      return renderRejected(error);
    case _constants.STATUS_CANCELLED:
      return cancelIcon;
    default:
  }
}