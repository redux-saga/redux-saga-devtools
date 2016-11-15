'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _Divider = require('components/Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _ActionList = require('containers/ActionList');

var _ActionList2 = _interopRequireDefault(_ActionList);

var _Reactions = require('containers/Reactions');

var _Reactions2 = _interopRequireDefault(_Reactions);

var _constants = require('store/constants');

require('./ActionView.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ActionView = function (_React$Component) {
  _inherits(ActionView, _React$Component);

  function ActionView() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ActionView);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ActionView.__proto__ || Object.getPrototypeOf(ActionView)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _this.onResizeStart = function () {
      _this.heightOrigin = _this.topNode.offsetHeight;
      _this.setState({ isResizing: true });
    }, _this.onResizeEnd = function (e) {
      _this.setState({ isResizing: false });
    }, _this.onResize = function (deltaY) {
      _this.setState({
        topHeight: Math.max(0, _this.heightOrigin - deltaY)
      });
    }, _this.selectAction = function (action) {
      _this.props.setCurrentAction(action);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ActionView, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.setCurrentAction(null);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var style = void 0,
          topStyle = void 0;
      var topHeight = this.state.topHeight;
      if (topHeight) {
        topStyle = { height: topHeight };
      }
      style = { cursor: this.state.isResizing ? 'row-resize' : 'default' };

      var action = this.props.currentAction;

      return _react2.default.createElement(
        'div',
        { className: 'action-view', style: style },
        _react2.default.createElement(
          'div',
          { className: 'action-view-actions', style: topStyle, ref: function ref(n) {
              return _this2.topNode = n;
            } },
          _react2.default.createElement(_ActionList2.default, { selectedAction: action, onSelectionChange: this.selectAction })
        ),
        _react2.default.createElement(_Divider2.default, {
          orientation: _Divider2.default.HORIZONTAL,
          className: 'action-view-resize',
          onResizeStart: this.onResizeStart,
          onResize: this.onResize,
          onResizeEnd: this.onResizeEnd
        }),
        _react2.default.createElement(
          'div',
          { className: 'action-view-reactions' },
          _react2.default.createElement(_Reactions2.default, { action: action })
        )
      );
    }
  }]);

  return ActionView;
}(_react2.default.Component);

ActionView.PropTypes = {
  // Injected by Redux
  currentAction: _react.PropTypes.object,
  setCurrentAction: _react.PropTypes.func.isRequired
};

exports.default = (0, _reactRedux.connect)(function (state) {
  return { currentAction: state.sharedRef.currentAction };
}, function (dispatch) {
  return {
    setCurrentAction: function setCurrentAction(action) {
      dispatch({
        type: _constants.SET_SHARED_REF,
        key: 'currentAction',
        sharedRef: action
      });
    }
  };
})(ActionView);