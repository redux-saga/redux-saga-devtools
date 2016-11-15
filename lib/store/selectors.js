'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEffectName = getEffectName;
exports.getReactions = getReactions;
exports.getTaskForEffect = getTaskForEffect;
exports.getPathToEffect = getPathToEffect;
exports.isParentOf = isParentOf;
exports.matchCurrentAction = matchCurrentAction;

var _utils = require('redux-saga/utils');

var _constants = require('./constants');

/* eslint-disable no-cond-assign */
function getEffectName(state, effectId) {

  var effect = state.effectsById[effectId].effect;

  if (effect.root) {
    return '' + effect.saga.name;
  }

  var data = void 0;
  if (data = _utils.asEffect.take(effect)) {
    return 'take(' + (data.pattern || 'channel') + ')';
  } else if (data = _utils.asEffect.put(effect)) {
    return 'put(' + (data.channel ? data.action : data.action.type) + ')';
  } else if (data = _utils.asEffect.call(effect)) {
    return 'call(' + data.fn.name + ')';
  } else if (data = _utils.asEffect.cps(effect)) {
    return 'cps(' + data.fn.name + ')';
  } else if (data = _utils.asEffect.fork(effect)) {
    var type = data.detached ? 'spawn' : 'fork';
    return type + '(' + data.fn.name + ')';
  } else if (data = _utils.asEffect.join(effect)) {
    return 'join(' + data.name + ')';
  } else if (data = _utils.asEffect.cancel(effect)) {
    return 'cancel(' + data.name + ')';
  } else if (_utils.is.array(effect)) {
    return 'parallel';
  } else if (data = _utils.asEffect.race(effect)) {
    return 'race';
  } else if (data = _utils.asEffect.select(effect)) {
    return 'select(' + data.selector.name + ')';
  } else if (data = _utils.asEffect.actionChannel(effect)) {
    return 'actionChannel(' + data.pattern + ')';
  } else if (data = _utils.asEffect.cancelled(effect)) {
    return 'cancelled';
  } else if (data = _utils.asEffect.flush(effect)) {
    return 'flush(buffer)';
  } else if (_utils.is.iterator(effect)) {
    return effect.effect.name;
  } else {
    return String(effect);
  }
}

function getReactions(state, action) {
  var reactions = [];
  var effectsById = state.effectsById;
  Object.keys(effectsById).forEach(function (effectId) {
    var effect = effectsById[effectId];
    if (_utils.asEffect.take(effect.effect)) {
      var status = effect.status;
      if (status === _constants.STATUS_RESOLVED) {
        var result = effect.result;
        if (result === action) {
          var task = getTaskForEffect(state, effect);
          reactions.push(task);
        }
      }
    }
  });
  return reactions;
}

function getTaskForEffect(state, effect) {
  var parentId = effect.parentEffectId;
  while (parentId) {
    var parent = state.effectsById[parentId];
    if (parent.root || _utils.asEffect.fork(parent.effect) || _utils.asEffect.call(parent.effect)) {
      return parentId;
    }
    parentId = parent.parentEffectId;
  }
}

function getPathToEffect(state, effectId, rootEffectIds) {
  var path = state.effectsById[effectId].path;
  var k = 0;
  while (rootEffectIds.indexOf(path[k]) < 0) {
    k++;
  }
  return path.slice(k);
}

function isParentOf(effectsById, parentId, effectId) {
  effectId = effectsById[effectId].parentEffectId;
  while (effectId) {
    if (effectId === parentId) {
      return true;
    }
    effectId = effectsById[effectId].parentEffectId;
  }
  return false;
}

function matchCurrentAction(state, effectId) {
  var effect = state.effectsById[effectId];
  var currentAction = state.sharedRef.currentAction;

  return currentAction && _utils.asEffect.take(effect.effect) && effect.result === currentAction.action;
}