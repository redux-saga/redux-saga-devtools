'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _ListView = require('components/ListView');

var _ListView2 = _interopRequireDefault(_ListView);

var _JSValue = require('components/JSValue');

var _Collapse = require('components/Collapse');

var _Collapse2 = _interopRequireDefault(_Collapse);

require('./ActionList.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ActionEntry = function (_React$Component) {
  _inherits(ActionEntry, _React$Component);

  function ActionEntry() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ActionEntry);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ActionEntry.__proto__ || Object.getPrototypeOf(ActionEntry)).call.apply(_ref, [this].concat(args))), _this), _this.onSelect = function () {
      return _this.props.onSelectionChange(_this.props.action);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ActionEntry, [{
    key: 'render',
    value: function render() {
      var action = this.props.action;


      return _react2.default.createElement(
        'div',
        { onClick: this.onSelect },
        _react2.default.createElement(_JSValue.JSObject, {
          data: action.action,
          renderLabel: function renderLabel(onClick, collapsed) {
            return _react2.default.createElement(
              'div',
              { className: action.isSagaAction ? 'action_saga' : '' },
              _react2.default.createElement(_Collapse2.default, {
                onClick: onClick,
                collapsed: collapsed
              }),
              action.action.type
            );
          }
        })
      );
    }
  }]);

  return ActionEntry;
}(_react2.default.Component);

var ActionList = function (_React$Component2) {
  _inherits(ActionList, _React$Component2);

  function ActionList() {
    _classCallCheck(this, ActionList);

    return _possibleConstructorReturn(this, (ActionList.__proto__ || Object.getPrototypeOf(ActionList)).apply(this, arguments));
  }

  _createClass(ActionList, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          actions = _props.actions,
          selectedAction = _props.selectedAction,
          onSelectionChange = _props.onSelectionChange;


      var nodes = actions.map(function (action) {
        return _react2.default.createElement(ActionEntry, {
          id: action.id,
          selected: action === selectedAction,
          action: action,
          selectedAction: selectedAction,
          onSelectionChange: onSelectionChange
        });
      });

      return _react2.default.createElement(_ListView2.default, { nodes: nodes });
    }
  }]);

  return ActionList;
}(_react2.default.Component);

ActionList.propTypes = {
  // passed by the parent Component
  selectedAction: _react.PropTypes.object,
  // Injected by redux
  actions: _react.PropTypes.array.isRequired
};

exports.default = (0, _reactRedux.connect)(function (state) {
  return {
    actions: state.dispatchedActions
  };
})(ActionList);