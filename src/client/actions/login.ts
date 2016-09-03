import { Client } from '../../typings'
import { send } from '../utils/encryption'
import { Dispatch } from 'redux'
import { VERSION, HASH } from '../utils/constants'

export interface LoggingInAction {
  type: 'LOGGING_IN'
}

const loggingIn: LoggingInAction = {
  type: 'LOGGING_IN'
}

export const fireLogin = (username: string, password: string, client: Client) => {
  client.store.dispatch(loggingIn)
  send(`+|.|${username}|.|${password}|.|${VERSION}|.|${HASH}|`, client.connection)
}

export interface LoggedInAction {
  type: 'LOGGED_IN'
}

export const loggedIn = (dispatch: Dispatch<any>) => {
  const action: LoggedInAction = { type: 'LOGGED_IN' }
  dispatch(action)
}

export interface LoginErrorAction {
  type: 'LOGIN_ERROR'
  reason: 'password' | 'username'
}

export const loginError = (reason: 'password' | 'username', dispatch: Dispatch<any>) => {
  const action: LoginErrorAction = {
    type: 'LOGIN_ERROR',
    reason
  }
  dispatch(action)
}
