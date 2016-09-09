import { Action, Reducer, combineReducers } from 'redux'
import { LoginState, loginReducer as login } from './login'
import { LocationState, locationReducer as location } from './location'

export interface State {
  login: LoginState
  location: LocationState
  lastAction: Action
}

const lastAction = (state: Action = { type: 'INIT' }, action: Action) => action

export const rootReducer = combineReducers<State>({
  login,
  location,
  lastAction: (state: Action = { type: 'INIT' }, action: Action) => action
})
