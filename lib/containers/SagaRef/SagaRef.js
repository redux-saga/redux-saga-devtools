'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('utils');

var _reactRedux = require('react-redux');

var _constants = require('store/constants');

require('./SagaRef.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SagaRef = function (_React$Component) {
  _inherits(SagaRef, _React$Component);

  function SagaRef() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SagaRef);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SagaRef.__proto__ || Object.getPrototypeOf(SagaRef)).call.apply(_ref, [this].concat(args))), _this), _this.highlighted = false, _this.onMouseDown = (0, _utils.withCapture)(function () {
      var wasHighlighted = _this.highlighted;
      _this.highlighted = !wasHighlighted;
      _this.props.setSharedRef(wasHighlighted ? null : _this.props.object);
    }), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SagaRef, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.setSharedRef(null);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          object = _props.object,
          sharedRef = _props.sharedRef,
          children = _props.children;

      var className = 'saga-ref ' + (object === sharedRef ? 'saga-ref_highlighted' : '');
      return _react2.default.createElement(
        'div',
        {
          title: 'Click to highlight all references of this object',
          className: className,
          onMouseDown: this.onMouseDown
        },
        children
      );
    }
  }]);

  return SagaRef;
}(_react2.default.Component);

SagaRef.propTypes = {
  object: _react.PropTypes.object.isRequired,
  sharedRef: _react.PropTypes.object
};

exports.default = (0, _reactRedux.connect)(function (state) {
  return { sharedRef: state.sharedRef.sagaRef };
}, function (dispatch) {
  return {
    setSharedRef: function setSharedRef(sagaRef) {
      dispatch({
        type: _constants.SET_SHARED_REF,
        key: 'sagaRef',
        sharedRef: sagaRef
      });
    }
  };
})(SagaRef);