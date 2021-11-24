/**
  const actionHandlers = {
    [SET_ITEM]: (state, { type, payload }) => ({ ...state, item: payload })
  }
 */

export const defaultActionHndler = (state, { payload }) => payload

export const createReducer = (actionHandlers, initialState = {}) => (
  state = initialState, action, appState = state,
) => {
  const handler = actionHandlers[action.type]
  return handler ? handler(state, action, appState) : state
}
