import { Action, Reducer, combineReducers } from 'redux'
import { LocationAction, MoveAction } from '../actions'
import { State } from '../../stateDeclarations'

import location from './location'
import pokemonTeam from './pokemonTeam'
import status from './status'
import battle from './battle'

const reducers = combineReducers<State>({
  location,
  pokemonTeam,
  status,
  battle,
})

export default reducers
