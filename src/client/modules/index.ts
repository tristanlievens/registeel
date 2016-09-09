import { Action, Reducer, combineReducers } from 'redux'
import { LoginState, loginReducer as login } from './login'
import { LocationState, locationReducer as location } from './location'
import { lastScriptReducer as lastScript } from './lastScript'
import { TeamState, teamReducer as team } from './team'

export interface State {
  login: LoginState
  location: LocationState
  lastAction: Action
  lastScript: number,
  team: TeamState
}

export const rootReducer = combineReducers<State>({
  login,
  location,
  lastScript,
  lastAction: (state: Action = { type: 'INIT' }, action: Action) => action,
  team
})

