require('dotenv').config()
import act from './bot'
import packetSniffer from './packets'
import reducers from './packets/reducers'
import { createStore, compose, StoreEnhancer } from 'redux'

const theArguments = process.argv.slice(2)
console.log(theArguments)
console.log(__dirname)

let initialState:State = {}
let store = createStore<State>(reducers, initialState)

packetSniffer(store)
store.subscribe(() => act(store.getState()))
