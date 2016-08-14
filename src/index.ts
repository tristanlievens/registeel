require('dotenv').config()
import { createStore, compose, StoreEnhancer } from 'redux'
import * as devTools from 'remote-redux-devtools'

import act from './bot'
import packetSniffer from './packets'
import reducers from './packets/reducers'

const theArguments = process.argv.slice(2)

let store = createStore<State>(reducers, <StoreEnhancer<State>>devTools({realtime: true, maxAge: 200}))

packetSniffer(store)
store.subscribe(() => act(store.getState()))
