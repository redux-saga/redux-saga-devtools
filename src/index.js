import React from 'react'
import { Provider } from 'react-redux'
import { default as SagaMonitorView, DockedSagaMonitorView } from './containers/SagaMonitorView'
import createSagaMonitor from './store/createSagaMonitor'

export function DockableSagaView({ monitor, darkTheme }) {
  return (
    <Provider store={monitor.store}>
      <DockedSagaMonitorView darkTheme={darkTheme} />
    </Provider>
  )
}

export function SagaView({ monitor, darkTheme }) {
  return (
    <Provider store={monitor.store}>
      <SagaMonitorView darkTheme={darkTheme} />
    </Provider>
  )
}

export {
  createSagaMonitor
}
