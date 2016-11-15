'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _selectors = require('store/selectors');

var _helpers = require('./helpers');

var _Breadcrumb = require('components/Breadcrumb');

var _Breadcrumb2 = _interopRequireDefault(_Breadcrumb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EffectPath = function (_React$Component) {
  _inherits(EffectPath, _React$Component);

  function EffectPath() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, EffectPath);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EffectPath.__proto__ || Object.getPrototypeOf(EffectPath)).call.apply(_ref, [this].concat(args))), _this), _this.currentPath = null, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(EffectPath, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(_ref2) {
      var selectedEffectId = _ref2.selectedEffectId,
          rootEffectIds = _ref2.rootEffectIds,
          state = _ref2.state;

      return this.props.selectedEffectId !== selectedEffectId || this.props.rootEffectIds !== rootEffectIds;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          state = _props.state,
          selectedEffectId = _props.selectedEffectId,
          rootEffectIds = _props.rootEffectIds,
          onSelectionChange = _props.onSelectionChange;

      var path = selectedEffectId < 0 ? null : (0, _selectors.getPathToEffect)(state, selectedEffectId, rootEffectIds);

      if (!path) {
        return _react2.default.createElement('span', null);
      }

      if ((0, _helpers.pathHasChanged)(this.currentPath, path)) {
        this.currentPath = path;
      } else {
        path = this.currentPath;
      }
      var selectedIdx = -1;
      var nodes = path.map(function (effectId, idx) {
        if (selectedEffectId === effectId) {
          selectedIdx = idx;
        }
        return _react2.default.createElement(PathNode, {
          key: effectId,
          effectId: effectId,
          text: (0, _selectors.getEffectName)(state, effectId),
          onSelect: onSelectionChange
        });
      });

      return _react2.default.createElement(_Breadcrumb2.default, { selectedIdx: selectedIdx, nodes: nodes });
    }
  }]);

  return EffectPath;
}(_react2.default.Component);

var PathNode = function (_React$Component2) {
  _inherits(PathNode, _React$Component2);

  function PathNode() {
    var _ref3;

    var _temp2, _this2, _ret2;

    _classCallCheck(this, PathNode);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, (_ref3 = PathNode.__proto__ || Object.getPrototypeOf(PathNode)).call.apply(_ref3, [this].concat(args))), _this2), _this2.onSelect = function () {
      return _this2.props.onSelect(_this2.props.effectId);
    }, _temp2), _possibleConstructorReturn(_this2, _ret2);
  }

  _createClass(PathNode, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { onMouseDown: this.onSelect },
        this.props.text
      );
    }
  }]);

  return PathNode;
}(_react2.default.Component);

EffectPath.propTypes = {
  // Provided by the parent Component
  rootEffectIds: _react.PropTypes.array.isRequired,
  selectedEffectId: _react.PropTypes.number,
  onSelectionChange: _react.PropTypes.func.isRequired,
  // Injected by Redux
  state: _react.PropTypes.object.isRequired
};

exports.default = (0, _reactRedux.connect)(function (state) {
  return { state: state };
}, null, null, { pure: false } // We'll provide our own shouldComponentUpdate
)(EffectPath);