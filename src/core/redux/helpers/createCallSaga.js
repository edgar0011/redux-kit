import { call } from 'redux-saga/effects'

export const createCallSaga = (callee, defaultParams = [], name = 'callSaga') => {
  // eslint-disable-next-line default-param-last
  const saga = function* saga (params = [], calleParams) {
    try {
      const response = yield call(calleParams || callee, ...[...defaultParams, ...params])

      return { response }
    } catch (error) {
      return { error }
    }
  }

  Object.defineProperty(saga, 'name', { value: name, configurable: true })
  saga.toString = function toString () {
    return this.name
  }

  return saga
}
