import { all, takeLatest, debounce, throttle, call, getContext } from 'redux-saga/effects'

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

    if (trigger === 'debounce' || trigger === debounce || trigger?.name?.indexOf('debounce') === 0) {
      yield (trigger === 'debounce' ? debounce : trigger)(ms, action, saga)
    } else if (trigger === 'throttle' || trigger === throttle || trigger?.name?.indexOf('throttle') === 0) {
      yield (trigger === 'throttle' ? throttle : trigger)(ms, action, saga)
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
