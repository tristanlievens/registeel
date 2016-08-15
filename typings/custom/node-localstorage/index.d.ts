interface NodeLocalStorage {
  LocalStorage: any
  storages: any
}

declare var nodeLocalStorage: NodeLocalStorage

declare module 'node-localstorage' {
  export = nodeLocalStorage
}
