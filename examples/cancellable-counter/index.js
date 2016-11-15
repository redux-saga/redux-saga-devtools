import "babel-polyfill"
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { take } from 'redux-saga/effects'
import { SagaMonitor, createSagaMonitor } from '../../src'

import reducer from './reducers'
import rootSaga from './sagas'
import Counter from './components/Counter'

const monitor = createSagaMonitor()
const sagaMiddleware = createSagaMiddleware({sagaMonitor: monitor})
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga)
sagaMiddleware.run(function* anotherSaga() {
  yield take('SOMETHING')
})


ReactDOM.render(
  <div>
    <Provider store={store}>
      <div style={{margin: 10}}><Counter /></div>
    </Provider>
    <SagaMonitor monitor={monitor}  />
  </div>,
  document.getElementById('root')
);
