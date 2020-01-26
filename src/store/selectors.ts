import { STATUS_RESOLVED } from "./constants";
import { State } from "./types";
import is from "@redux-saga/is";
import { SagaEffect } from "./asEffect";

/* eslint-disable no-cond-assign */
export function getEffectName(state: State, effectId: string) {
  const effect: SagaEffect = state.effectsById[effectId].effect;

  if (state.rootEffectIds.includes(effectId)) {
    return `${effect.saga.name}`;
  } else if (is.iterator(effect)) {
    return effect.effect.name;
  } else if (is.array(effect)) {
    return "parallel";
  }

  switch (effect.type) {
    case "PUT": {
      return `put(${
        effect.payload.channel
          ? effect.payload.action
          : effect.payload.action.type
      })`;
    }

    case "CALL":
      return `call(${effect.payload.fn.name})`;

    case "CPS":
      return `cps(${effect.payload.fn.name})`;

    case "FORK":
      const type = effect.payload.detached ? "spawn" : "fork";
      return `${type}(${effect.payload.fn.name})`;

    case "JOIN":
      return `join${effect.payload}`;

    case "CANCEL":
      return `cancel${effect.payload}`;

    case "RACE":
      return `race`;

    case "SELECT":
      return `select(${effect.payload.selector.name})`;

    case "ACTION_CHANNEL":
      return `actionChannel(${effect.payload.pattern})`;

    case "CANCELLED":
      return "cancelled";

    case "FLUSH":
      return "flush(buffer)";

    default:
      return String(effect);
  }
}

export function getReactions(state, action) {
  let reactions = [];
  const effectsById = state.effectsById;
  Object.keys(effectsById).forEach(effectId => {
    const effect = effectsById[effectId];
    if (asEffect.take(effect.effect)) {
      const status = effect.status;
      if (status === STATUS_RESOLVED) {
        const result = effect.result;
        if (result === action) {
          const task = getTaskForEffect(state, effect);
          reactions.push(task);
        }
      }
    }
  });
  return reactions;
}

export function getTaskForEffect(state, effect) {
  let parentId = effect.parentEffectId;
  while (parentId) {
    const parent = state.effectsById[parentId];
    if (
      parent.root ||
      asEffect.fork(parent.effect) ||
      asEffect.call(parent.effect)
    ) {
      return parentId;
    }
    parentId = parent.parentEffectId;
  }
}

export function getPathToEffect(state, effectId, rootEffectIds) {
  let path = state.effectsById[effectId].path;
  let k = 0;
  while (rootEffectIds.indexOf(path[k]) < 0) {
    k++;
  }
  return path.slice(k);
}

export function isParentOf(effectsById, parentId, effectId) {
  effectId = effectsById[effectId].parentEffectId;
  while (effectId) {
    if (effectId === parentId) {
      return true;
    }
    effectId = effectsById[effectId].parentEffectId;
  }
  return false;
}

export function matchCurrentAction(state, effectId) {
  const effect = state.effectsById[effectId];
  const currentAction = state.sharedRef.currentAction;

  return (
    currentAction &&
    asEffect.take(effect.effect) &&
    effect.result === currentAction.action
  );
}
