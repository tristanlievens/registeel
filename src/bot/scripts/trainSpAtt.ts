import { Store } from 'redux'
import { State, LocationState } from '../../stateDeclarations'
import handleBattle from '../handleBattle'
import { followPath, move, reverseSequence, mapTransition, Move, surf } from '../moves'
import { usePokeCenter } from '../utils'
import * as Robot from 'robotjs'

const arriveCinnabarIslandSequence: Move[] = [
  { steps: 6, direction: 'left' },
  { steps: 4, direction: 'up' },
]

const leaveCinnabarSeaSequence: Move[] = [
  { steps: 2, direction: 'down' },
  { steps: 15, direction: 'right' },
  { steps: 4, direction: 'up' },
  { steps: 5, direction: 'right' }, // to [45, 28]
]

const leaveCinnabar = (store) => (
  new Promise(done => {
    Promise.resolve(null)
      .then(() => move(reverseSequence(arriveCinnabarIslandSequence, { entersMap: true }), store))
      .then(() => surf('s'))
      .then(() => move(leaveCinnabarSeaSequence, store))
      .then(done)
  })
)

const arriveCinnabar = (store) => (
  new Promise(done => {
    Promise.resolve(null)
      .then(() => move(reverseSequence(leaveCinnabarSeaSequence, { entersMap: true }), store))
      .then(() => move(arriveCinnabarIslandSequence, store))
      .then(done)
  })
)
export const act = (store: Store<State>) => (
  new Promise(done => {
    Promise.resolve(null)
      // .then(() => arriveCinnabar(store))
      .then(() => mapTransition('Pokecenter Cinnabar', store))
      .then(() => usePokeCenter(store, { map: 'Pokecenter Cinnabar' }))
      .then(() => mapTransition('Cinnabar Island', store))
      .then(() => leaveCinnabar(store))
      .then(done)
  })
)
