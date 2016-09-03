import { Action, Reducer, combineReducers } from 'redux'
import { LoginState, loginReducer as login } from './login'

export interface State {
  login: LoginState
}

export const rootReducer = combineReducers<State>({
  login
})
