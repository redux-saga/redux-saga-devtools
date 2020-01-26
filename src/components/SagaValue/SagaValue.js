import React from "react";
import * as is from "@redux-saga/is";
import { CHANNEL_END_TYPE } from "@redux-saga/symbols";
import JSValue from "../JSValue";
import SagaRef from "../../containers/SagaRef";

export default function SagaValue({ value, label, isIdentifier }) {
  if (is.channel(value)) {
    return <SagaRef object={value}>{label || "Channel"}</SagaRef>;
  } else if (CHANNEL_END_TYPE && value === CHANNEL_END_TYPE) {
    return <JSValue value={"END"} isIdentifier={true} />;
  } else {
    return <JSValue value={value} label={label} isIdentifier={isIdentifier} />;
  }
}
