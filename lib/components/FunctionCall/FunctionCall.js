'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FunctionCall;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SagaValue = require('components/SagaValue');

var _SagaValue2 = _interopRequireDefault(_SagaValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FunctionCall(fn, args) {
  if (!args.length) {
    return _react2.default.createElement(
      'span',
      null,
      fn.name,
      '()'
    );
  }

  var nodes = [fn.name];
  renderFuncArgs(args, nodes);

  return _react2.default.createElement.apply(_react2.default, ['div', { style: { display: 'flex', alignItems: 'flex-start' } }].concat(nodes));
}

function renderFuncArgs(args, nodes) {
  args.forEach(function (arg, idx) {
    nodes.push(_react2.default.createElement(_SagaValue2.default, { value: arg }));
    if (idx < args.length - 1) {
      nodes.push(_react2.default.createElement(
        'span',
        null,
        '\', \''
      ));
    }
  });
}