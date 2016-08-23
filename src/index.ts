require('dotenv').config()
import { createStore, compose, StoreEnhancer, Reducer } from 'redux'
import * as devTools from 'remote-redux-devtools'
import { persistStore, autoRehydrate, storages } from 'redux-persist'

import act from './bot/act'
import packetSniffer from './packets/packetSniffer'
import reducers from './packets/reducers'
import storageAdaptor from './storageAdaptor'
import { AsyncNodeStorage } from 'redux-persist-node-storage'
import { State } from './stateDeclarations'

const theArguments = process.argv.slice(2)

const enhancers = compose(
  <StoreEnhancer<State>>autoRehydrate(),
  <StoreEnhancer<State>>devTools({ realtime: true, maxAge: 200 })
)

let store = createStore<State>(reducers, undefined, enhancers)
persistStore(store, { storage: new AsyncNodeStorage('./localStorage') })
packetSniffer(store)
store.subscribe(() => act(store))
