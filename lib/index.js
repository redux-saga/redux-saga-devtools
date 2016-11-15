'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSagaMonitor = undefined;
exports.SagaMonitor = SagaMonitor;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _SagaMonitorUI = require('containers/SagaMonitorUI');

var _SagaMonitorUI2 = _interopRequireDefault(_SagaMonitorUI);

var _createSagaMonitor = require('store/createSagaMonitor');

var _createSagaMonitor2 = _interopRequireDefault(_createSagaMonitor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SagaMonitor(_ref) {
  var monitor = _ref.monitor;

  return _react2.default.createElement(
    _reactRedux.Provider,
    { store: monitor.store },
    _react2.default.createElement(_SagaMonitorUI2.default, null)
  );
}

exports.createSagaMonitor = _createSagaMonitor2.default;