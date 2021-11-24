export const configureSaga = ({
  props,
  onError,
  sagaMonitor,
  effectMiddleware,
  ...additionalParams
}) => {
  const context = {
    // TODO handele these props more carefully, like memoizeing strict control over naming,
    // distribuition of naming/redux store slice to sagas....
    ...props,
    ...additionalParams,
  }

  return {
    context,
    onError,
    sagaMonitor,
    effectMiddleware,
  }
}
