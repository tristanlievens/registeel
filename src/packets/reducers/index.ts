import { Action, Reducer, combineReducers } from 'redux'
import { State, LocationState } from '../../../index.d.ts'
import { LocationAction, MoveAction } from '../actions'
import * as _ from 'lodash'

import location from './location'
import pokemonTeam from './pokemonTeam'

const reducers = combineReducers<State>({
  location,
  pokemonTeam,
})

export default reducers
