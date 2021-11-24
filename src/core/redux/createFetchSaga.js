import { createCallSaga } from './createCallSaga'

export const createFetchSaga = (url, config, name = 'fetchSaga') => (
  createCallSaga(fetch, [url, config], name)
)

export const fetcher = createCallSaga(fetch)
