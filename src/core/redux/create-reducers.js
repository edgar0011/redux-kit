/* eslint-disable no-param-reassign */
import { path as pathSelector, assocPath } from 'ramda'

import earlCombineReducers from './combineReducers'
// ======================================================
// Async reducer injector
// ======================================================
let pathReducersMap = {}

export const addReducer = (reducersMap, name, reducer) => {
  if (Array.isArray(name) && name.length === 1) {
    // eslint-disable-next-line prefer-destructuring
    name = name[0]
  }
  if (Array.isArray(name)) {
    if (pathSelector(name, pathReducersMap)) {
      return
    }
    const path = name.concat()
    const rootName = name.shift()
    pathReducersMap = assocPath(path, reducer, pathReducersMap)
    // TODO mweiser improve for paths longer than 2
    const composite = { ...pathReducersMap[rootName] }
    reducersMap[rootName] = earlCombineReducers(composite)
  } else {
    if (Object.prototype.hasOwnProperty.call(reducersMap, name)) {
      return
    }
    reducersMap[name] = reducer
  }
}

export const createReducerFactory = (staticReducers) => (asyncReducers) => earlCombineReducers({
  ...staticReducers,
  ...asyncReducers,
})
