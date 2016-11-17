import React from 'react'
import { Provider } from 'react-redux'
import SagaMonitorView from './containers/SagaMonitorView'
import createSagaMonitor from './store/createSagaMonitor'

export function DockableSagaView({monitor}) {
  return (
    <Provider store={monitor.store}>
      <SagaMonitorView />
    </Provider>
  )
}

export {
  createSagaMonitor
}
