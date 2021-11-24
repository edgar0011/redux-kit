/* eslint-disable global-require, no-param-reassign, no-underscore-dangle */

import { createStore as createReduxStore, applyMiddleware, compose } from 'redux'

// TODO initial state as separte argument, to correspond to the original createStore
export const createStore = (reducer, middlewares, options) => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      shouldHotReload: false,
    })
    : compose
  const store = createReduxStore(
    reducer,
    options.initialState || {},
    composeEnhancers(applyMiddleware(...middlewares)),
  )

  store.sagas = {}
  store.sagaTasks = {}
  store.asyncReducers = {}

  const runSaga = (saga, name, params) => {
    const derivedName = name || saga.name
    console.log('runSaga')
    console.log('saga, name, params')
    console.log(saga, name, params)
    console.log('derivedName', derivedName)
    console.log('store.sagas[derivedName]', store.sagas[derivedName])
    if (!store.sagas[derivedName]) {
      store.sagas[derivedName] = saga
      store.sagaTasks[derivedName] = options.runSaga(saga, params)
      return true
    }
    return false
  }
  const stopSaga = (saga, name) => {
    const derivedName = name || saga.name
    if (store.sagaTasks[derivedName]) {
      const task = store.sagaTasks[derivedName]
      if (!task.isRunning() || task.isCancelled()) {
        store.sagaTasks[derivedName] = null
        return
      }
      try {
        task.cancel()
        // TODO invesitage result(), error(), toPromise())
        store.sagaTasks[derivedName] = null
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    }
  }

  // https://github.com/zalmoxisus/redux-devtools-extension/issues/351
  const injectReducer = (name, reducer) => {
    options.addReducer(store.asyncReducers, name, reducer)
    store.replaceReducer(options.createReducer(store.asyncReducers))
  }

  const injectReducerAndSaga = ({ path, saga, reducer }) => {
    injectReducer([...path], reducer)
    runSaga(saga)
  }

  return {
    ...store,
    runSaga,
    stopSaga,
    injectReducer,
    injectReducerAndSaga,
  }
}
