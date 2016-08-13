require('dotenv').config()

import act from './bot'
import packetSniffer from './packets'
import reducers from './packets/reducers'
import { createStore, compose, StoreEnhancer } from 'redux'
import { State } from '../index.d.ts'

const theArguments = process.argv.slice(2)
console.log('Call arguments:',theArguments)

let store = createStore<State>(reducers)

packetSniffer(store)
store.subscribe(() => act(store.getState()))
const looper = () => {
  setTimeout(() => {
    console.log('State:', store.getState())
    looper()
  }, 5000)
}
looper()
