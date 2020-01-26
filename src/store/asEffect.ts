import {
  ActionChannelEffect,
  AllEffect,
  CallEffect,
  CancelEffect,
  CancelledEffect,
  CpsEffect,
  FlushEffect,
  ForkEffect,
  GetContextEffect,
  JoinEffect,
  PutEffect,
  RaceEffect,
  SelectEffect,
  SetContextEffect,
  TakeEffect
} from "redux-saga/effects";
export default {
  race: () => false
};

export type SagaEffect =
  | ActionChannelEffect
  | AllEffect<any>
  | CallEffect
  | CancelEffect
  | CancelledEffect
  | CpsEffect<any>
  | FlushEffect<any>
  | ForkEffect
  | GetContextEffect
  | JoinEffect
  | PutEffect
  | RaceEffect<any>
  | SelectEffect
  | SetContextEffect<any>
  | TakeEffect;
