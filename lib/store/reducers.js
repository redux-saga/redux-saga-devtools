'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.rootEffectIds = rootEffectIds;
exports.effectIds = effectIds;
exports.effectsById = effectsById;
exports.effectsByParentId = effectsByParentId;
exports.dispatchedActions = dispatchedActions;
exports.sharedRef = sharedRef;

var _utils = require('redux-saga/utils');

var _redux = require('redux');

var _constants = require('./constants');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var CHILDREN = Symbol('CHILDREN');

function getPathToEffect(effect, effectsById) {
  var effectId = effect.effectId;
  var path = [effectId];

  while (effectId) {
    effectId = effect.parentEffectId;
    if (effectId) {
      path.push(effectId);
      effect = effectsById[effectId];
    }
  }
  return path.reverse();
}

function rootEffectIds() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments[1];

  if (action.type === _constants.EFFECT_TRIGGERED && action.effect.root) {
    return [].concat(_toConsumableArray(state), [action.effect.effectId]);
  }
  return state;
}

function effectIds() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments[1];

  switch (action.type) {
    case _constants.EFFECT_TRIGGERED:
      return state.concat(action.effect.effectId);
    default:
      return state;
  }
}

function effectsById() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  var effectId = void 0,
      effect = void 0,
      newState = void 0;
  switch (action.type) {
    case _constants.EFFECT_TRIGGERED:
      effect = action.effect;
      effectId = effect.effectId;
      newState = _extends({}, state, _defineProperty({}, effectId, _extends({}, effect, _defineProperty({
        status: _constants.STATUS_PENDING,
        start: action.time,
        path: effect.parentEffectId ? getPathToEffect(effect, state) : [effectId]
      }, CHILDREN, []))));
      /**
        ugly  hack. store children along with the effects
        this shouldn't be accessed by any other outside UI
        it's only there so the maybeSetRaceWinner could access race's children
      **/
      var parent = state[effect.parentEffectId];
      if (parent && _utils.asEffect.race(parent.effect)) {
        parent[CHILDREN].push(effect);
      }
      return newState;

    case _constants.EFFECT_RESOLVED:
      effectId = action.effectId;
      effect = state[effectId];
      newState = _extends({}, state, _defineProperty({}, effectId, settleEffect(effect, action)));
      return maybeSetRaceWinner(effect, action.result, newState);
    case _constants.EFFECT_REJECTED:
      effectId = action.effectId;
      return _extends({}, state, _defineProperty({}, effectId, settleEffect(state[effectId], action, true)));
    case _constants.EFFECT_CANCELLED:
      effectId = action.effectId;
      return _extends({}, state, _defineProperty({}, effectId, cancelEffect(state[effectId], action)));
    default:
      return state;
  }
}

function settleEffect(effect, action, isError) {
  return _extends({}, effect, {
    result: action.result,
    error: action.error,
    status: isError ? _constants.STATUS_REJECTED : _constants.STATUS_RESOLVED,
    end: action.time,
    time: action.time - effect.start
  });
}

function cancelEffect(effect, action) {
  return _extends({}, effect, {
    status: _constants.STATUS_CANCELLED,
    end: action.time,
    time: action.time - effect.start
  });
}

function effectsByParentId() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  if (action.type === _constants.EFFECT_TRIGGERED) {
    var effect = action.effect;
    var parentId = effect.parentEffectId;
    if (parentId) {
      var siblings = state[parentId];
      return _extends({}, state, _defineProperty({}, parentId, !siblings ? [effect.effectId] : [].concat(_toConsumableArray(siblings), [effect.effectId])));
    }
  }
  return state;
}

function maybeSetRaceWinner(effect, result, state) {
  if (_utils.asEffect.race(effect.effect)) {
    var label = Object.keys(result)[0];
    var children = effect[CHILDREN];
    for (var i = 0; i < children.length; i++) {
      var ch = children[i];
      if (ch.label === label) {
        // we mutate the state, b/c we know it's already a new generated state from effectsById
        state[ch.effectId] = _extends({}, state[ch.effectId], {
          winner: true
        });
        return state;
      }
    }
  }
  return state;
}

function dispatchedActions() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var monitorAction = arguments[1];

  if (monitorAction.type === _constants.ACTION_DISPATCHED) {
    var id = monitorAction.id,
        action = monitorAction.action,
        time = monitorAction.time,
        isSagaAction = monitorAction.isSagaAction;

    return state.concat({ id: id, action: action, time: time, isSagaAction: isSagaAction });
  }
  return state;
}

function sharedRef() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  if (action.type === _constants.SET_SHARED_REF) {
    return _extends({}, state, _defineProperty({}, action.key, action.sharedRef));
  }
  return state;
}

exports.default = (0, _redux.combineReducers)({
  rootEffectIds: rootEffectIds,
  effectIds: effectIds,
  effectsById: effectsById,
  effectsByParentId: effectsByParentId,
  dispatchedActions: dispatchedActions,
  sharedRef: sharedRef
});