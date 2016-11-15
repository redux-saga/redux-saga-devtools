'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _selectors = require('store/selectors');

var _utils = require('utils');

var _ListView = require('components/ListView');

var _ListView2 = _interopRequireDefault(_ListView);

var _EffectEntry = require('containers/EffectEntry');

var _EffectEntry2 = _interopRequireDefault(_EffectEntry);

require('./EffectList.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EffectList = function (_React$Component) {
  _inherits(EffectList, _React$Component);

  function EffectList() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, EffectList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EffectList.__proto__ || Object.getPrototypeOf(EffectList)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      collapsedEffects: {}
    }, _this.isCollapsed = function (effectId) {
      return _this.state.collapsedEffects[effectId];
    }, _this.collapseEffect = function (effectId, collapsed) {
      _this.setState(function (state) {
        return {
          collapsedEffects: _extends({}, state.collapsedEffects, _defineProperty({}, effectId, collapsed !== undefined ? collapsed : !state.collapsedEffects[effectId]))
        };
      });
    }, _this.onKeyDown = function (e) {
      if (e.which === _utils.KEY_ARROW_DOWN) {
        _this.selectDown(_this.props.selectedEffectId);
        e.preventDefault();
      } else if (e.which === _utils.KEY_ARROW_UP) {
        _this.selectUp(_this.props.selectedEffectId);
        e.preventDefault();
      } else if (e.which === _utils.KEY_ARROW_LEFT) {
        _this.selectLeft(_this.props.selectedEffectId);
        e.preventDefault();
      } else if (e.which === _utils.KEY_ARROW_RIGHT) {
        _this.selectRight(_this.props.selectedEffectId);
        e.preventDefault();
      }
    }, _this.selectLeft = function (effectId) {
      if (!_this.isCollapsed(effectId) && _this.props.effectsByParentId[effectId]) {
        _this.collapseEffect(effectId, true);
      } else {
        var isTop = effectId === _this.state.pinnedEffectId || _this.props.rootEffectIds.indexOf(effectId) >= 0;

        if (!isTop) {
          var parentId = _this.props.effectsById[effectId].parentEffectId;
          _this.props.onSelectionChange(parentId);
        }
      }
    }, _this.selectRight = function (effectId) {
      if (_this.isCollapsed(effectId)) {
        _this.collapseEffect(effectId, false);
      } else {
        if (_this.props.effectsByParentId[effectId]) {
          _this.selectDown(effectId);
        }
      }
    }, _this.selectUp = function (effectId) {
      var idx = _this.visuallyOrderedEffects.indexOf(effectId);
      if (idx > 0) {
        var prevEffect = _this.visuallyOrderedEffects[idx - 1];
        _this.props.onSelectionChange(prevEffect);
      }
    }, _this.selectDown = function (effectId, onlyChild) {
      var idx = _this.visuallyOrderedEffects.indexOf(effectId);
      if (idx < _this.visuallyOrderedEffects.length - 1) {
        var nextEffect = _this.visuallyOrderedEffects[idx + 1];
        _this.props.onSelectionChange(nextEffect);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(EffectList, [{
    key: 'renderEffectList',
    value: function renderEffectList(effectIds, elems) {
      var _this2 = this;

      var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var prefix = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'eff';

      return effectIds.forEach(function (effectId, idx) {
        _this2.visuallyOrderedEffects.push(effectId);
        var childsEffectsId = _this2.props.effectsByParentId[effectId];
        var hasChildren = childsEffectsId && childsEffectsId.length;
        var highlighed = (0, _selectors.matchCurrentAction)(_this2.props.state, effectId);

        elems.push(_react2.default.createElement(_EffectEntry2.default, {
          id: prefix + String(effectId),
          itemClass: highlighed ? 'effect-list_highlight' : '',
          depth: depth,
          effectId: effectId,
          selected: _this2.props.selectedEffectId === effectId,
          pinned: _this2.props.pinnedEffectId === effectId,
          collapsed: _this2.isCollapsed(effectId),
          onCollapse: _this2.collapseEffect,
          onPin: _this2.props.onPin,
          onUnpin: _this2.props.onUnpin,
          onSelect: _this2.props.onSelectionChange
        }));

        if (!_this2.isCollapsed(effectId) && hasChildren) {
          _this2.renderEffectList(childsEffectsId, elems, depth + 1, prefix);
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var elems = [];
      this.visuallyOrderedEffects = [];

      var pinnedEffectId = this.props.pinnedEffectId;
      var rootEffectIds = pinnedEffectId < 0 ? this.props.rootEffectIds : [pinnedEffectId];
      this.renderEffectList(rootEffectIds, elems, 0);
      return _react2.default.createElement(
        'div',
        { className: 'effect-list', tabIndex: '0', onKeyDown: this.onKeyDown },
        _react2.default.createElement(_ListView2.default, { nodes: elems })
      );
    }
  }]);

  return EffectList;
}(_react2.default.Component);

EffectList.propTypes = {
  // passed by the parent Component
  selectedEffectId: _react.PropTypes.number,
  onSelectionChange: _react.PropTypes.func.isRequired,
  rootEffectIds: _react.PropTypes.array.isRequired,
  // Injected by redux
  effectsById: _react.PropTypes.object.isRequired,
  effectsByParentId: _react.PropTypes.object.isRequired
};

exports.default = (0, _reactRedux.connect)(function (state) {
  return {
    state: state,
    effectsById: state.effectsById,
    effectsByParentId: state.effectsByParentId
  };
})(EffectList);