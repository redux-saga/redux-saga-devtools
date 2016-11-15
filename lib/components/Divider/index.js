'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HORIZONTAL = Symbol('DIVIDER_HORIZONTAL');
var VERTICAL = Symbol('DIVIDER_VERTICAL');

var Divider = function (_React$Component) {
  _inherits(Divider, _React$Component);

  function Divider() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Divider);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Divider.__proto__ || Object.getPrototypeOf(Divider)).call.apply(_ref, [this].concat(args))), _this), _this.isResizing = false, _this.onMouseDown = function (e) {
      //e.preventDefault()
      _this.startPos = _this.getPos(e);
      _this.isResizing = true;
      _this.props.onResizeStart();
    }, _this.onMouseUp = function (e) {
      //e.preventDefault()
      _this.isResizing = false;
      _this.props.onResizeEnd();
    }, _this.onMouseMove = function (e) {
      if (_this.isResizing) {
        e.preventDefault();
        _this.endPos = _this.getPos(e);
        _this.scheduleResize();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Divider, [{
    key: 'getPos',
    value: function getPos(e) {
      return this.props.orientation === HORIZONTAL ? e.clientY : e.clientX;
    }
  }, {
    key: 'getDelta',
    value: function getDelta(e) {}
  }, {
    key: 'scheduleResize',
    value: function scheduleResize() {
      var _this2 = this;

      if (!this.resizeScheduled) {
        this.resizeScheduled = true;
        requestAnimationFrame(function () {
          _this2.resizeScheduled = false;
          _this2.props.onResize(_this2.startPos - _this2.endPos);
        });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('mousemove', this.onMouseMove);
      window.addEventListener('mouseup', this.onMouseUp);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('mousemove', this.onMouseMove);
      window.removeEventListener('mouseup', this.onMouseUp);
    }
  }, {
    key: 'render',
    value: function render() {

      return _react2.default.createElement('div', {
        className: this.props.className,
        style: this.props.style,
        onMouseDown: this.onMouseDown
      });
    }
  }]);

  return Divider;
}(_react2.default.Component);

Divider.HORIZONTAL = HORIZONTAL;
Divider.VERTICAL = VERTICAL;

exports.default = Divider;