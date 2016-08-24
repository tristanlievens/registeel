import { Store } from 'redux'
import { State, LocationState } from '../stateDeclarations'
import handleBattle from './handleBattle'
import { followPath, move, mapTransition, Move } from './moves'
import { usePokeCenter } from './utils'
import * as Robot from 'robotjs'

const act = (store: Store<State>, done): void => {
  Promise.resolve(null)
    .then(() => move({ steps: 1, direction: 'up' }, store))
    .then(() => mapTransition('Pokecenter Cinnabar', store))
    .then(() => usePokeCenter(store, { map: "Pokecenter Cinnabar" }))
    .then(done)
}

export default act
