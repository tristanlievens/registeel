import { Action, Reducer, combineReducers } from 'redux'
import { LoginState, loginReducer as login } from './login'
import { LocationState, locationReducer as location } from './location'
import { lastScriptReducer as lastScript } from './lastScript'

export interface State {
  login: LoginState
  location: LocationState
  lastAction: Action
  lastScript: number
}

export const rootReducer = combineReducers<State>({
  login,
  location,
  lastScript,
  lastAction: (state: Action = { type: 'INIT' }, action: Action) => action
})

