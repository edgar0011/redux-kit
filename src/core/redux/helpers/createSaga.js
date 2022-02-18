import { all, takeLatest, debounce, throttle, call, getContext } from 'redux-saga/effects'

// TODO test, then move to redux-kit

export const createSaga = (action, trigger = takeLatest, sagaFn, contextKeys, ms = 1000) => {
  const nameWatcher = `${action}SagaWatcher`
  const name = `${action}Saga`
  const sagaWatcher = function* sagaWatcher() {
    const saga = function* saga(action) {
      let contexts
      if (contextKeys) {
        contexts = yield all(contextKeys.map((key) => getContext(key)))
      }
      yield call(sagaFn, action, contexts)
    }
    Object.defineProperty(saga, 'name', { value: name, configurable: true })
    saga.toString = function toString () {
      return this.name
    }
    if (trigger === debounce || trigger === throttle) {
      yield trigger(ms, action, saga)
    } else {
      yield trigger(action, saga)
    }
  }
  Object.defineProperty(sagaWatcher, 'name', { value: nameWatcher, configurable: true })
  sagaWatcher.toString = function toString () {
    return this.name
  }
  return sagaWatcher
}
