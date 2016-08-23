import { Store } from 'redux'
import { State, LocationState } from '../stateDeclarations'
import handleBattle from './handleBattle'
import { followPath, move, surf } from './moves'
import * as Robot from 'robotjs'
import * as async from 'async'

const act = (store: Store<State>, done): void => {
  async.until(() => false, next => {
    async.series([
      resolve => move(5, 'left', store, resolve),
      resolve => move(5, 'right', store, resolve),
    ], next)
  }, done)
}

export default act
