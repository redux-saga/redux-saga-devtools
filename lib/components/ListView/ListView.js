'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./ListView.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULT_INDENT = 16;

var ListView = function (_React$Component) {
  _inherits(ListView, _React$Component);

  function ListView() {
    _classCallCheck(this, ListView);

    return _possibleConstructorReturn(this, (ListView.__proto__ || Object.getPrototypeOf(ListView)).apply(this, arguments));
  }

  _createClass(ListView, [{
    key: 'render',
    value: function render() {
      var indent = this.props.indent || DEFAULT_INDENT;

      return _react2.default.createElement(
        'div',
        { className: 'list-view' },
        this.props.nodes.map(function (node) {
          var depth = node.props.depth;
          var style = depth ? { marginLeft: depth * indent } : null;
          var clsSelected = node.props.selected ? 'list-entry_selected' : '';
          var clsEntry = 'list-entry ' + clsSelected + ' ' + node.props.itemClass;

          return _react2.default.createElement(
            'div',
            { key: node.props.id, className: clsEntry },
            _react2.default.createElement(
              'div',
              { style: style },
              node
            )
          );
        })
      );
    }
  }]);

  return ListView;
}(_react2.default.Component);

ListView.propTypes = {
  nodes: _react.PropTypes.array.isRequired
};

exports.default = ListView;