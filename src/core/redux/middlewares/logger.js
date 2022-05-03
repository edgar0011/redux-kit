/* eslint-disable no-console */
export const logger = (store) => (next) => (action) => {
  const state = store.getState()

  console.log('REDUX LOGGER: state')
  console.log(state)
  console.log('REDUX LOGGER: action')
  console.log(action)
  return next(action)
}
