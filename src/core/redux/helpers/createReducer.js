/**
  const actionHandlers = {
    [SET_ITEM]: (state, { type, ...payload }) => ({ ...state, item: payload })
  }
 */

export const defaultActionHndler = (state, { payload }) => payload

export const createReducer = (actionHandlers, initialState = {}) => (
  // eslint-disable-next-line default-param-last
  state = initialState, action, appState = state,
) => {
  const handler = actionHandlers[action.type]

  return handler ? handler(state, action, appState) : state
}

// export const defaultActionHandlers
// = (keyValue: string, actions: Rectord<string, (payload: unknown) => unknown>): Record<string, string> => {

//   /*

//     [postActions.LOAD_POSTS]: (state = {}) => ({ ...state, loading: true }),
//   [postActions.POSTS_DATA_LOADED]: (state = {}, { data }) => ({
//     ...state, data, error: null, loading: false }),
//   [postActions.POSTS_LOAD_ERROR]: (state = {}, { error }) => ({
//     ...state, error, loading: false }),
//   */
//  return {

//   [actions.LOAD_POSTS]: (state = {}) => ({ ...state, loading: true }),
//   [postActions.POSTS_DATA_LOADED]: (state = {}, { data }) => ({
//     ...state, data, error: null, loading: false }),
//   [postActions.POSTS_LOAD_ERROR]: (state = {}, { error }) => ({
//     ...state, error, loading: false }),
//  }
// }
