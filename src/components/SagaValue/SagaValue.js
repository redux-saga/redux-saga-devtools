import React from 'react'
import { is, CHANNEL_END } from 'redux-saga/utils'
import JSValue from 'components/JSValue'
import SagaRef from 'containers/SagaRef'

export default function SagaValue({value, label, isIdentifier}) {
  if(is.channel(value)) {
    return <SagaRef object={value}>{label || 'Channel'}</SagaRef>
  }
  else if(CHANNEL_END && value === CHANNEL_END) {
    return <JSValue value={'END'} isIdentifier={true} />
  }
  else {
    return <JSValue value={value} label={label} isIdentifier={isIdentifier} />
  }
}
