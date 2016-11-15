'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Layout = require('components/Layout');

require('./Breadcrumb.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Breadcrumb(_ref) {
  var selectedIdx = _ref.selectedIdx,
      nodes = _ref.nodes;

  return _react2.default.createElement(
    _Layout.Row,
    { className: 'breadcrumb' },
    nodes.map(function (node, idx) {
      var clsSelected = idx === selectedIdx ? 'breadcrumb-element_selected' : '';
      return _react2.default.createElement(
        _Layout.Cell,
        { key: idx, className: 'breadcrumb-element ' + clsSelected },
        node
      );
    })
  );
}

Breadcrumb.propTypes = {
  selectedIdx: _react.PropTypes.number.isRequired,
  nodes: _react.PropTypes.array.isRequired
};

exports.default = Breadcrumb;