import React from 'react'
import { Provider } from 'react-redux'
import SagaMonitorUI from 'containers/SagaMonitorUI'
import createSagaMonitor from 'store/createSagaMonitor'

export function SagaMonitor({monitor}) {
  return (
    <Provider store={monitor.store}>
      <SagaMonitorUI />
    </Provider>
  )
}

export {
  createSagaMonitor
}
