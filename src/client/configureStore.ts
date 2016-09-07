import { createStore, compose, StoreEnhancer, Reducer, Store } from 'redux'
import * as devTools from 'remote-redux-devtools'
import { persistStore, autoRehydrate, storages } from 'redux-persist'

import { rootReducer, State } from './reducers'

const configureStore = (initialState?): Store<State> => {
  let enhancers = compose()
  if (process.env.NODE_ENV == 'development') {
    enhancers = compose(<StoreEnhancer<State>>devTools({ realtime: true, maxAge: 200 }))
  }
  const store = createStore<State>(rootReducer, initialState, enhancers)
  return store
}

export default configureStore
