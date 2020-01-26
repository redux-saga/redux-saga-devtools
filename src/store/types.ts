import { Effect } from "redux-saga";

export type State = {
  effectsById: { [key: string]: { effect: Effect } };
};
