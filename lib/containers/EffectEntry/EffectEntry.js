'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _Icons = require('components/Icons');

var _Layout = require('components/Layout');

var _Collapse = require('components/Collapse');

var _Collapse2 = _interopRequireDefault(_Collapse);

var _Effect = require('components/Effect');

var _Effect2 = _interopRequireDefault(_Effect);

require('./EffectEntry.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EffectEntry = function (_React$Component) {
  _inherits(EffectEntry, _React$Component);

  function EffectEntry() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, EffectEntry);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EffectEntry.__proto__ || Object.getPrototypeOf(EffectEntry)).call.apply(_ref, [this].concat(args))), _this), _this.effectId = _this.props.effectId, _this.onSelect = function () {
      return _this.props.onSelect(_this.effectId);
    }, _this.onCollapse = function () {
      return _this.props.onCollapse(_this.effectId);
    }, _this.onPin = function () {
      return _this.props.onPin(_this.effectId);
    }, _this.onUnpin = function () {
      return _this.props.onUnpin(-1);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(EffectEntry, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          effect = _props.effect,
          collapsed = _props.collapsed,
          pinned = _props.pinned,
          hasChildren = _props.hasChildren;


      var pinNode = void 0;
      if (!effect.root) {
        pinNode = pinned ? _react2.default.createElement(
          'div',
          { onClick: this.onUnpin },
          _react2.default.createElement(_Icons.IconUnpin, null)
        ) : _react2.default.createElement(
          'div',
          { onClick: this.onPin },
          _react2.default.createElement(_Icons.IconPin, null)
        );
      }

      return _react2.default.createElement(
        'div',
        { className: 'effect-entry' },
        _react2.default.createElement(
          _Layout.Row,
          { onMouseDown: this.onSelect },
          _react2.default.createElement(
            _Layout.Cell,
            null,
            _react2.default.createElement(_Collapse2.default, {
              collapsed: collapsed,
              hidden: !hasChildren,
              onClick: this.onCollapse
            })
          ),
          _react2.default.createElement(
            _Layout.Cell,
            null,
            _react2.default.createElement(_Effect2.default, { effect: effect })
          )
        ),
        effect.root ? null : _react2.default.createElement(
          'span',
          { className: 'effect-entry-toolbar' },
          pinNode
        )
      );
    }
  }]);

  return EffectEntry;
}(_react2.default.Component);

EffectEntry.PropTypes = {
  // passed by the parent component
  effectId: _react.PropTypes.number.isRequired,
  selected: _react.PropTypes.bool.isRequired,
  collapsed: _react.PropTypes.bool.isRequired,
  onCollapse: _react.PropTypes.func.isRequired,
  onSelect: _react.PropTypes.func.isRequired,
  // injected by Redux store
  effect: _react.PropTypes.object.isRequired,
  hasChildren: _react.PropTypes.bool.isRequired
};

exports.default = (0, _reactRedux.connect)(function (state, _ref2) {
  var effectId = _ref2.effectId;

  var effect = state.effectsById[effectId];
  return {
    effect: effect,
    hasChildren: state.effectsByParentId[effectId]
  };
})(EffectEntry);