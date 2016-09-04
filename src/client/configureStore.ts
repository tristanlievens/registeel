import { createStore, compose, StoreEnhancer, Reducer, Store } from 'redux'
import * as devTools from 'remote-redux-devtools'
import { persistStore, autoRehydrate, storages } from 'redux-persist'

import { rootReducer, State } from './reducers'

const configureStore = (): Store<State> => {
  const enhancers = compose(
    // <StoreEnhancer<State>>autoRehydrate(),
    <StoreEnhancer<State>>devTools({ realtime: true, maxAge: 200 })
  )

  let store = createStore<State>(rootReducer, undefined, enhancers)
  // persistStore(store, { storage: new AsyncNodeStorage('./localStorage') })
  return store
}

export default configureStore
