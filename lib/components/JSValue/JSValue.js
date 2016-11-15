'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.JSObject = JSObject;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('utils');

var _TreeView = require('components/TreeView');

var _TreeView2 = _interopRequireDefault(_TreeView);

var _Collapse = require('components/Collapse');

var _Collapse2 = _interopRequireDefault(_Collapse);

require('./JSValue.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function span(content, className) {
  return _react2.default.createElement(
    'span',
    { className: className },
    content
  );
}

function renderValue(value, isIdentifier, label, onlyPrimitive) {

  if (value === null || value === undefined) {
    return span(String(value), 'jsobject-value_' + value);
  } else if (value instanceof RegExp) {
    return span(value, 'jsobject-value_regex');
  }

  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  if (type === 'string') {
    if (isIdentifier) {
      return span(value, 'jsobject-value_identifier');
    } else {
      return span('"' + value + '"', 'jsobject-value_string');
    }
  }
  if (type === 'symbol' || type === 'number' || type === 'boolean') {
    return span('' + String(value), 'jsobject-value_' + type);
  } else if (type === 'function') {
    return _react2.default.createElement(
      'span',
      { className: 'jsobject-value_function' },
      _react2.default.createElement(
        'span',
        { className: 'jsobject-value_function-keyword' },
        'function '
      ),
      value.name,
      '()'
    );
  } else if (!onlyPrimitive) {
    if (typeof label === 'string') {
      label = span(label, 'jsobject-value_identifier');
    }
    return _react2.default.createElement(JSObject, { data: value, preview: label });
  }
}

function getObjectSummary(obj) {
  return Array.isArray(obj) ? 'Array[' + obj.length + ']' : obj.constructor.name;
}

function JSValue(_ref) {
  var value = _ref.value,
      isIdentifier = _ref.isIdentifier,
      label = _ref.label;

  return renderValue(value, isIdentifier, label, false);
}

JSValue.propTypes = {
  value: _react.PropTypes.any,
  isIdentifier: _react.PropTypes.bool,
  label: _react.PropTypes.any
};

function JSObject(_ref2) {
  var data = _ref2.data,
      renderLabel = _ref2.renderLabel,
      preview = _ref2.preview,
      ignoreLabelClick = _ref2.ignoreLabelClick;

  var keys = Object.keys(data);
  if (!keys.length) {
    return renderLabel ? renderLabel() : _react2.default.createElement(
      'span',
      null,
      '\'',
      '\''
    );
  }

  if (!renderLabel) {
    renderLabel = function defaultRenderLabel(onClick, collapsed) {
      return _react2.default.createElement(
        'div',
        { onClick: !ignoreLabelClick ? onClick : null, className: 'jsobject-label capture' },
        _react2.default.createElement(_Collapse2.default, { onClick: ignoreLabelClick ? onClick : null, collapsed: collapsed }),
        preview || getObjectSummary(data)
      );
    };
  }

  return _react2.default.createElement(
    'div',
    _extends({ className: 'jsobject' }, _utils.trapMouseDown),
    _react2.default.createElement(
      _TreeView2.default,
      { renderLabel: renderLabel, defaultCollapsed: true },
      function () {
        return renderObjectDetails(keys, data);
      }
    )
  );
}

function renderObjectDetails(keys, data) {
  return keys.map(function (key) {
    var value = data[key];
    var node = renderValue(value, false, null, true);
    if (node) {
      return _react2.default.createElement(
        'div',
        { key: key, className: 'jsobject-row' },
        _react2.default.createElement(_Collapse2.default, { hidden: true }),
        _react2.default.createElement(
          'span',
          { className: 'jsobject-key', title: key },
          key,
          ':'
        ),
        _react2.default.createElement(
          'span',
          { className: 'jsobject-value' },
          node
        )
      );
    } else {
      var renderRowLabel = function renderRowLabel(onClick, collapsed) {
        return _react2.default.createElement(
          'div',
          { className: 'jsobject-row jsobject-label', onClick: onClick },
          _react2.default.createElement(_Collapse2.default, { collapsed: collapsed }),
          _react2.default.createElement(
            'span',
            { className: 'jsobject-key', title: key },
            key,
            ': '
          ),
          _react2.default.createElement(
            'span',
            { className: 'jsobject-value' },
            getObjectSummary(value)
          )
        );
      };
      return _react2.default.createElement(JSObject, { key: key, data: value, renderLabel: renderRowLabel });
    }
  });
}

JSObject.propTypes = {
  data: _react.PropTypes.any.isRequired,
  renderLabel: _react.PropTypes.func,
  preview: _react.PropTypes.any,
  ignoreLabelClick: _react.PropTypes.bool
};

exports.default = JSValue;