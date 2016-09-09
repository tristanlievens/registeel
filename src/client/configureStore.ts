import { createStore, compose, StoreEnhancer, Reducer, Store } from 'redux'
import * as devTools from 'remote-redux-devtools'
import { persistStore, autoRehydrate, storages } from 'redux-persist'
import * as _ from 'lodash'

import { rootReducer, State } from './modules'

const configureStore = (initialState?): Store<State> => {
  let enhancers
  if (_.includes(['test', 'production'], process.env.NODE_ENV)) {
    enhancers = compose()
  } else { // development
    enhancers = compose(<StoreEnhancer<State>>devTools({ realtime: true, maxAge: 200 }))
  }
  const store = createStore<State>(rootReducer, initialState, enhancers)
  return store
}

export default configureStore
