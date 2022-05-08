interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
}

if (typeof window !== 'undefined') {
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
}
