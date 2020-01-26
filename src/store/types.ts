import { Effect } from "redux-saga";

export type State = {
  effectsById: { [key: number]: { effect: Effect } };
  rootEffectIds: number[];
};
