'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _selectors = require('store/selectors');

var _EffectList = require('containers/EffectList');

var _EffectList2 = _interopRequireDefault(_EffectList);

var _EffectPath = require('./EffectPath');

var _EffectPath2 = _interopRequireDefault(_EffectPath);

require('./EffectView.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EffectView = function (_React$Component) {
  _inherits(EffectView, _React$Component);

  function EffectView() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, EffectView);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EffectView.__proto__ || Object.getPrototypeOf(EffectView)).call.apply(_ref, [this].concat(args))), _this), _this.state = { selectedEffectId: -1, pinnedEffectId: -1 }, _this.handleSelectionChange = function (effectId) {
      var pinnedEffectId = _this.state.pinnedEffectId;
      if (pinnedEffectId >= 0 && (0, _selectors.isParentOf)(_this.props.effectsById, effectId, pinnedEffectId)) {
        _this.setState({
          selectedEffectId: effectId,
          pinnedEffectId: effectId
        });
      } else {
        _this.setState({
          selectedEffectId: effectId
        });
      }
    }, _this.handlePin = function (effectId) {
      _this.setState({
        pinnedEffectId: effectId
      });
    }, _this.handleUnpin = function () {
      _this.setState({
        pinnedEffectId: -1
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(EffectView, [{
    key: 'render',
    value: function render() {
      var rootEffectIds = this.props.rootEffectIds;
      var selectedEffectId = this.state.selectedEffectId;
      var pinnedEffectId = this.state.pinnedEffectId;

      return _react2.default.createElement(
        'div',
        { className: 'effect-view' },
        _react2.default.createElement(
          'section',
          { className: 'effect-view-body' },
          _react2.default.createElement(_EffectList2.default, {
            rootEffectIds: rootEffectIds,
            selectedEffectId: selectedEffectId,
            onSelectionChange: this.handleSelectionChange,
            pinnedEffectId: pinnedEffectId,
            onPin: this.handlePin,
            onUnpin: this.handleUnpin
          })
        ),
        _react2.default.createElement(
          'footer',
          { className: 'effect-view-footer' },
          _react2.default.createElement(_EffectPath2.default, {
            rootEffectIds: rootEffectIds,
            selectedEffectId: selectedEffectId,
            onSelectionChange: this.handleSelectionChange
          })
        )
      );
    }
  }]);

  return EffectView;
}(_react2.default.Component);

EffectView.propTypes = {
  rootEffectIds: _react.PropTypes.array.isRequired,
  // Inject by Redux
  effectsById: _react.PropTypes.object.isRequired
};

exports.default = (0, _reactRedux.connect)(function (state) {
  return { effectsById: state.effectsById };
})(EffectView);