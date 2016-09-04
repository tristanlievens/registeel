import { Client } from '../../typings'
import { Socket } from 'net'
import { send } from '../utils/encryption'
import { Dispatch } from 'redux'
import { VERSION, HASH } from '../utils/constants'

export interface LoggingInAction {
  type: 'LOGGING_IN'
}

export const fireLogin = (username: string, password: string, connection: Socket): LoggingInAction => {
  send(`+|.|${username}|.|${password}|.|${VERSION}|.|${HASH}|`, connection)
  return {
    type: 'LOGGING_IN'
  }
}

export interface LoggedInAction {
  type: 'LOGGED_IN'
}

export const loggedIn = (): LoggedInAction => ({ type: 'LOGGED_IN' })

export interface LoginErrorAction {
  type: 'LOGIN_ERROR'
  reason: 'password' | 'username'
}

export const loginError = (reason: 'password' | 'username'): LoginErrorAction => {
  return {
    type: 'LOGIN_ERROR',
    reason,
  }
}
