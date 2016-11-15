'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createSagaMonitor;

var _utils = require('redux-saga/utils');

var _redux = require('redux');

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getTime() {
  if (typeof performance !== 'undefined' && performance.now) return performance.now();else return Date.now();
}

function createSagaMonitor() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$time = _ref.time,
      time = _ref$time === undefined ? getTime : _ref$time;

  var store = (0, _redux.createStore)(_reducers2.default);
  var dispatch = store.dispatch;

  function effectTriggered(effect) {
    dispatch({
      type: _constants.EFFECT_TRIGGERED,
      effect: effect,
      time: time()
    });
  }

  function effectResolved(effectId, result) {
    if (_utils.is.task(result)) {
      result.done.then(function (taskResult) {
        if (result.isCancelled()) effectCancelled(effectId);else effectResolved(effectId, taskResult);
      }, function (taskError) {
        effectRejected(effectId, taskError);
      });
    } else {
      var action = {
        type: _constants.EFFECT_RESOLVED,
        effectId: effectId,
        result: result,
        time: time()
      };
      dispatch(action);
    }
  }

  function effectRejected(effectId, error) {
    var action = {
      type: _constants.EFFECT_REJECTED,
      effectId: effectId,
      error: error,
      time: time()
    };
    dispatch(action);
  }

  function effectCancelled(effectId) {
    var action = {
      type: _constants.EFFECT_CANCELLED,
      effectId: effectId,
      time: time()
    };
    dispatch(action);
  }

  function actionDispatched(action) {
    var isSagaAction = action[_utils.SAGA_ACTION];
    var now = time();
    dispatch({
      type: _constants.ACTION_DISPATCHED,
      id: now,
      action: action,
      isSagaAction: isSagaAction,
      time: now
    });
  }

  return {
    get store() {
      return store;
    },
    effectTriggered: effectTriggered, effectResolved: effectResolved, effectRejected: effectRejected, effectCancelled: effectCancelled, actionDispatched: actionDispatched };
}