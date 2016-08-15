interface ReduxPersist {
  persistStore: any
  autoRehydrate: any
  storages: any
}

declare var reduxPersist: ReduxPersist

declare module 'redux-persist' {
  export = reduxPersist
}
