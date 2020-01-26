import { SAGA_ACTION } from "@redux-saga/symbols";
import createSagaMonitor from "../createSagaMonitor";
import { CHILDREN } from "../reducers";
import * as c from "../constants";

const getEffectId = eff => eff.effectId;

test("reducers", () => {
  let currentTime;
  const monitor = createSagaMonitor({ time: () => currentTime });

  const time_root = (currentTime = 0);
  const rootEffect = { saga: undefined, args: [], effectId: "0" };
  monitor.rootSagaStarted(rootEffect);

  const time_1 = (currentTime = 1);
  const effect_1 = {
    effectId: "1",
    parentEffectId: "0",
    effect: { race: true }
  };
  monitor.effectTriggered(effect_1);

  const time_2 = (currentTime = 2);
  const effect_2 = { effectId: "2", parentEffectId: "0", effect: {} };
  monitor.effectTriggered(effect_2);

  const time_1_1 = (currentTime = 3);
  const effect_1_1 = {
    effectId: "1_1",
    parentEffectId: "1",
    label: "1_1",
    effect: {}
  };
  monitor.effectTriggered(effect_1_1);

  const time_1_2 = (currentTime = 4);
  const effect_1_2 = {
    effectId: "1_2",
    parentEffectId: "1",
    label: "1_2",
    effect: {}
  };
  monitor.effectTriggered(effect_1_2);

  const result_1_1 = "result_1_1";
  const time_result = (currentTime = 10);
  monitor.effectResolved(effect_1_1.effectId, result_1_1);
  monitor.effectResolved(effect_1.effectId, {
    [effect_1_1.effectId]: result_1_1
  });
  monitor.effectCancelled(effect_1_2.effectId);

  const error_2 = "error_2";
  const time_error = (currentTime = 12);
  monitor.effectRejected(effect_2.effectId, error_2);

  const state = monitor.store.getState();

  expect(state.rootEffectIds).toEqual([rootEffect.effectId]);

  expect(state.effectIds).toEqual(
    [rootEffect, effect_1, effect_2, effect_1_1, effect_1_2].map(getEffectId)
  );

  expect(state.effectsByParentId).toEqual({
    [rootEffect.effectId]: [effect_1, effect_2].map(getEffectId),
    [effect_1.effectId]: [effect_1_1, effect_1_2].map(getEffectId)
  });

  let effect = { ...state.effectsById[rootEffect.effectId] };
  delete effect[CHILDREN];
  expect(effect).toEqual({
    effect: {
      saga: rootEffect.saga,
      args: rootEffect.args
    },
    effectId: rootEffect.effectId,
    status: c.STATUS_PENDING,
    start: time_root,
    path: [rootEffect.effectId]
  });

  effect = { ...state.effectsById[effect_1.effectId] };
  delete effect[CHILDREN];

  expect(effect).toEqual({
    ...effect_1,
    status: c.STATUS_RESOLVED,
    start: time_1,
    path: [rootEffect, effect_1].map(getEffectId),
    result: { [effect_1_1.effectId]: result_1_1 },
    error: undefined,
    end: time_result,
    time: time_result - time_1
  });

  effect = { ...state.effectsById[effect_2.effectId] };
  delete effect[CHILDREN];

  expect(effect).toEqual({
    ...effect_2,
    status: c.STATUS_REJECTED,
    start: time_2,
    path: [rootEffect, effect_2].map(getEffectId),
    result: undefined,
    error: error_2,
    end: time_error,
    time: time_error - time_2
  });

  effect = { ...state.effectsById[effect_1_1.effectId] };
  delete effect[CHILDREN];

  expect(effect).toEqual({
    ...effect_1_1,
    status: c.STATUS_RESOLVED,
    start: time_1_1,
    path: [rootEffect, effect_1, effect_1_1].map(getEffectId),
    result: result_1_1,
    error: undefined,
    end: time_result,
    time: time_result - time_1_1,
    winner: true
  });

  effect = { ...state.effectsById[effect_1_2.effectId] };
  delete effect[CHILDREN];

  expect(effect).toEqual({
    ...effect_1_2,
    status: c.STATUS_CANCELLED,
    start: time_1_2,
    path: [rootEffect, effect_1, effect_1_2].map(getEffectId),
    end: time_result,
    time: time_result - time_1_2
  });

  const action = { type: "ACTION", [SAGA_ACTION]: true };
  const time_action = (currentTime = 14);
  monitor.actionDispatched(action);

  expect(monitor.store.getState().dispatchedActions).toEqual([
    {
      id: time_action,
      action,
      time: time_action,
      isSagaAction: true
    }
  ]);

  const sharedRef = {};
  monitor.store.dispatch({
    type: c.SET_SHARED_REF,
    key: "global",
    sharedRef
  });

  expect(monitor.store.getState().sharedRef).toEqual({
    global: sharedRef
  });
});
