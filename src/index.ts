require('dotenv').config()
import { createStore, compose, StoreEnhancer, Reducer } from 'redux'
import * as devTools from 'remote-redux-devtools'
import { persistStore, autoRehydrate, storages } from 'redux-persist'
import * as Robot from 'robotjs'

import act from './bot/act'
import packetSniffer from './packets/packetSniffer'
import reducers from './packets/reducers'
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

const waiter = (count = null) => (
  new Promise(resolve => setTimeout(() => {
    console.log(count)
    resolve()
  }, 1000))
)

if (!theArguments[0]) {
  Promise.resolve(null)
  // .then(() => waiter(3))
  // .then(() => waiter(2))
  // .then(() => waiter(1))
  .then(() => waiter(0))
  .then(() => act(store, () => {
    console.log('done')
    process.exit()
  }))
  // Robot.keyTap('tab', 'command')
  // act(store, () => {
  //   console.log('done')
  //   process.exit()
  // })
}

