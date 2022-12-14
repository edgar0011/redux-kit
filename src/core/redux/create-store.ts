import {
  createStore as createReduxStore, applyMiddleware, compose, Reducer, Action, Middleware, AnyAction,
} from 'redux'
import { Saga, Task } from 'redux-saga'

import { Params } from './types'

export type Store = {
  runSaga: (saga: Saga, name?: string | null, params?: Params | null) => boolean
  stopSaga: (saga: Saga, name: any) => void
  createReducer: (reducers: Reducer) => Reducer
  addReducer: (asyncReducers: Reducer, name: string | string[], reducer: Reducer) => Reducer
  replaceReducer: (reducers: Reducer) => Reducer
  injectReducer: (rname: string | string[], reducer: Reducer) => void
  injectReducerAndSaga: (params: SagaOptions) => void
  getState: () => Record<string, unknown>
  dispatch: (action: unknown) => void
  sagas: Record<string, Saga>
  asyncReducers: Reducer<any, AnyAction>
  sagaTasks: Record<string, Task | null>
}

type Options = {
  initialState: Record<string, unknown>
  runSaga: (saga: Saga, params?: Params | null) => Task
  createReducer: (reducers: Reducer) => Reducer
  addReducer: (asyncReducers: Reducer, name: string | string[], reducer: Reducer) => Reducer
}

type SagaOptions = {
  path: string[]
  saga: Saga
  reducer: Reducer
}

// TODO initial state as separte argument, to correspond to the original createStore
export const createStore = (
  reducer: Reducer<unknown, Action<any>>, middlewares: Middleware[], options: Options,
): Store => {
  // eslint-disable-next-line no-nested-ternary
  const composeEnhancers = (typeof window === 'undefined')
    ? compose
    : (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        shouldHotReload: false,
      })
      : compose)

  const store = createReduxStore(
    reducer,
    options.initialState || {},
    composeEnhancers(applyMiddleware(...middlewares)),
  ) as Store

  store.sagas = {}
  store.sagaTasks = {}
  store.asyncReducers = {} as Reducer<any, AnyAction>

  // eslint-disable-next-line default-param-last
  const runSaga = (saga: Saga, name: null | string = null, params?: Params | null) => {
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

  const stopSaga = (saga: Saga, name: string) => {
    const derivedName = name || saga.name

    if (store.sagaTasks[derivedName]) {
      const task = store.sagaTasks[derivedName]

      if (task && (!task.isRunning() || task.isCancelled())) {
        store.sagaTasks[derivedName] = null
        return
      }
      try {
        task?.cancel()
        // TODO invesitage result(), error(), toPromise())
        store.sagaTasks[derivedName] = null
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    }
  }

  // https://github.com/zalmoxisus/redux-devtools-extension/issues/351
  const injectReducer = (name: string | string[], reducer: Reducer) => {
    options.addReducer(store.asyncReducers, name, reducer)
    store.replaceReducer(options.createReducer(store.asyncReducers))
  }

  const injectReducerAndSaga = ({ path, saga, reducer }: SagaOptions) => {
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
