import { asEffect } from "redux-saga/utils";
import { combineReducers } from "redux";
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
  STATUS_CANCELLED
} from "./constants";

export const CHILDREN = Symbol("CHILDREN");

function getPathToEffect(effect, effectsById) {
  let effectId = effect.effectId;
  const path = [effectId];

  while (effectId) {
    effectId = effect.parentEffectId;
    if (effectId) {
      path.push(effectId);
      effect = effectsById[effectId];
    }
  }
  return path.reverse();
}

export function rootEffectIds(state = [], action) {
  if (action.type === EFFECT_TRIGGERED && action.effect.root) {
    return [...state, action.effect.effectId];
  }
  return state;
}

export function effectIds(state = [], action) {
  switch (action.type) {
    case EFFECT_TRIGGERED:
      return state.concat(action.effect.effectId);
    default:
      return state;
  }
}

export function effectsById(state = {}, action) {
  let effectId, effect, newState;
  switch (action.type) {
    case EFFECT_TRIGGERED:
      effect = action.effect;
      effectId = effect.effectId;
      newState = {
        ...state,
        [effectId]: {
          ...effect,
          status: STATUS_PENDING,
          start: action.time,
          path: effect.parentEffectId
            ? getPathToEffect(effect, state)
            : [effectId],
          [CHILDREN]: []
        }
      };
      /**
        ugly  hack. store children along with the effects
        this shouldn't be accessed by any other outside UI
        it's only there so the maybeSetRaceWinner could access race's children
      **/
      const parent = state[effect.parentEffectId];
      if (parent && asEffect.race(parent.effect)) {
        parent[CHILDREN].push(effect);
      }
      return newState;

    case EFFECT_RESOLVED:
      effectId = action.effectId;
      effect = state[effectId];
      newState = {
        ...state,
        [effectId]: settleEffect(effect, action)
      };
      return maybeSetRaceWinner(effect, action.result, newState);
    case EFFECT_REJECTED:
      effectId = action.effectId;
      return {
        ...state,
        [effectId]: settleEffect(state[effectId], action, true)
      };
    case EFFECT_CANCELLED:
      effectId = action.effectId;
      return {
        ...state,
        [effectId]: cancelEffect(state[effectId], action)
      };
    default:
      return state;
  }
}

function settleEffect(effect, action, isError) {
  return {
    ...effect,
    result: action.result,
    error: action.error,
    status: isError ? STATUS_REJECTED : STATUS_RESOLVED,
    end: action.time,
    time: action.time - effect.start
  };
}

function cancelEffect(effect, action) {
  return {
    ...effect,
    status: STATUS_CANCELLED,
    end: action.time,
    time: action.time - effect.start
  };
}

export function effectsByParentId(state = {}, action) {
  if (action.type === EFFECT_TRIGGERED) {
    const effect = action.effect;
    const parentId = effect.parentEffectId;
    if (parentId) {
      const siblings = state[parentId];
      return {
        ...state,
        [parentId]: !siblings
          ? [effect.effectId]
          : [...siblings, effect.effectId]
      };
    }
  }
  return state;
}

function maybeSetRaceWinner(effect, result, state) {
  if (asEffect.race(effect.effect)) {
    const label = Object.keys(result)[0];
    const children = effect[CHILDREN];
    for (var i = 0; i < children.length; i++) {
      const ch = children[i];
      if (ch.label === label) {
        // we mutate the state, b/c we know it's already a new generated state from effectsById
        state[ch.effectId] = {
          ...state[ch.effectId],
          winner: true
        };
        return state;
      }
    }
  }
  return state;
}

export function dispatchedActions(state = [], monitorAction) {
  if (monitorAction.type === ACTION_DISPATCHED) {
    const { id, action, time, isSagaAction } = monitorAction;
    return state.concat({ id, action, time, isSagaAction });
  }
  return state;
}

export function sharedRef(state = {}, action) {
  if (action.type === SET_SHARED_REF) {
    return { ...state, [action.key]: action.sharedRef };
  }
  return state;
}

export default combineReducers({
  rootEffectIds,
  effectIds,
  effectsById,
  effectsByParentId,
  dispatchedActions,
  sharedRef
});
