import { asEffect } from 'redux-saga/utils'
import { combineReducers } from 'redux'
import {
  EFFECT_TRIGGERED,
  EFFECT_RESOLVED,
  EFFECT_REJECTED,
  EFFECT_CANCELLED,
  ACTION_DISPATCHED,
  SET_SHARED_REF,
  STATUS_PENDING,
  STATUS_RESOLVED,
  STATUS_REJECTED,
  STATUS_CANCELLED,
} from './constants'
import produce from "immer";

const CHILDREN = Symbol('CHILDREN')

function getPathToEffect(effect, effectsById) {
  let effectId = effect.effectId
  const path = [effectId]

  while (effectId) {
    effectId = effect.parentEffectId
    if (effectId) {
      path.push(effectId)
      effect = effectsById[effectId]
    }
  }
  return path.reverse()
}

export function rootEffectIds(state = [], action) {
  return produce(state, draft => {
    if (action.type === EFFECT_TRIGGERED && action.effect.root) {
      draft.push(action.effect.effectId);
    }
  });
}

export function effectIds(state = [], action) {
  return produce(state, draft => {
    switch (action.type) {
      case EFFECT_TRIGGERED:
        draft.push(action.effect.effectId)
    }
  });
}

export function effectsById(state = {}, action) {
  let effect, effectId;
  return produce(state, draft => {
    switch (action.type) {
      case EFFECT_TRIGGERED:
        effect = action.effect
        effectId = effect.effectId
        draft[effectId] = {
          ...effect,
          status: STATUS_PENDING,
          start: action.time,
          path: effect.parentEffectId ? getPathToEffect(effect, state) : [effectId],
          [CHILDREN]: []
        };

        /**
          ugly  hack. store children along with the effects
          this shouldn't be accessed by any other outside UI
          it's only there so the maybeSetRaceWinner could access race's children
        **/
        const parent = draft[effect.parentEffectId]
        if (parent && asEffect.race(parent.effect)) {
          parent[CHILDREN].push(effect)
        }

        break;
      case EFFECT_RESOLVED:
        effectId = action.effectId
        effect = draft[effectId]
        settleEffect(draft[effectId], action);
        maybeSetRaceWinner(effect, action.result, draft)
        break;
      case EFFECT_REJECTED:
        effectId = action.effectId
        settleEffect(draft[effectId], action, true)
        break;
      case EFFECT_CANCELLED:
        effectId = action.effectId
        cancelEffect(draft[effectId], action);
    }
  });
}

function settleEffect(draftEffect, action, isError) {
  draftEffect.result = action.result;
  draftEffect.error = action.errot;
  draftEffect.status = isError ? STATUS_REJECTED : STATUS_RESOLVED;
  draftEffect.end = action.time;
  draftEffect.time = action.time - action.start;
}

function cancelEffect(draftEffect, action) {
  draftEffect.status = STATUS_CANCELLED;
  draftEffect.end = action.time;
  draftEffect.time = action.time - draftEffect.start;
}

export function effectsByParentId(state = {}, action) {
  return produce(state, draft => {
    if (action.type === EFFECT_TRIGGERED) {
      const effect = action.effect
      const parentId = effect.parentEffectId
      if (parentId) {
        if (!draft[parentId]) {
          draft[parentId] = [];
        }
        draft[parentId].push(effect.effectId);
      }
    }
  });
}

function maybeSetRaceWinner(effect, result, draft) {
  if (asEffect.race(effect.effect)) {
    const label = Object.keys(result)[0]
    const children = effect[CHILDREN]
    for (var i = 0; i < children.length; i++) {
      const ch = children[i]
      if (ch.label === label) {
        draft[ch.effectId].winner = true;
        break;
      }
    }
  }
}

export function dispatchedActions(state = [], monitorAction) {
  return produce(state, draft => {
    if (monitorAction.type === ACTION_DISPATCHED) {
      const { id, action, time, isSagaAction } = monitorAction
      draft.push({ id, action, time, isSagaAction })
    }
  });
}

export function sharedRef(state = {}, action) {
  return produce(state, draft => {
    if (action.type === SET_SHARED_REF) {
      draft[action.key] = action.sharedRef;
    }
  });
}

export default combineReducers({
  rootEffectIds,
  effectIds,
  effectsById,
  effectsByParentId,
  dispatchedActions,
  sharedRef,
})
