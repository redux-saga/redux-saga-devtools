'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./TreeView.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TreeView = function (_React$Component) {
  _inherits(TreeView, _React$Component);

  function TreeView() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TreeView);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TreeView.__proto__ || Object.getPrototypeOf(TreeView)).call.apply(_ref, [this].concat(args))), _this), _this.state = { collapsed: _this.props.defaultCollapsed }, _this.toggleCollapsed = function () {
      _this.setState(function (state) {
        return { collapsed: !state.collapsed };
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TreeView, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$collapsed = _props.collapsed,
          collapsed = _props$collapsed === undefined ? this.state.collapsed : _props$collapsed,
          renderLabel = _props.renderLabel,
          children = _props.children;


      var treeViewChildren = void 0;
      if (children) {
        var childrenStyle = collapsed ? { display: 'none' } : null;
        treeViewChildren = _react2.default.createElement(
          'div',
          { className: 'tree-view-children', style: childrenStyle },
          typeof children === 'function' ? collapsed ? null : children(collapsed) : children
        );
      }

      return _react2.default.createElement(
        'div',
        { className: 'tree-view' },
        _react2.default.createElement(
          'div',
          { className: 'tree-view-item' },
          renderLabel(this.toggleCollapsed, collapsed)
        ),
        treeViewChildren
      );
    }
  }]);

  return TreeView;
}(_react2.default.Component);

TreeView.propTypes = {
  collapsed: _react.PropTypes.bool,
  defaultCollapsed: _react.PropTypes.bool,
  renderLabel: _react.PropTypes.func.isRequired
};

exports.default = TreeView;