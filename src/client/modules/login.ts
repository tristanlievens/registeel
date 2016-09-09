import { Reducer } from 'redux'
import { assign } from 'lodash'

export interface LoginState {
  isLoggingIn: boolean
  isLoggedIn: boolean
  position?: number
  loginErrorReason?: 'password' | 'username'
}

const initialState: LoginState = {
  isLoggingIn: false,
  isLoggedIn: false,
}

type LoginAction = LoggingInAction | LoggedInAction | LoginErrorAction | QueuePositionUpdateAction

export const loginReducer: Reducer<LoginState> = (state: LoginState = initialState, action: LoginAction) => {
  switch (action.type) {
    case 'LOGGING_IN': return assign<{}, LoginState>({}, state, { isLoggingIn: true })
    case 'LOGGED_IN': return assign<{}, LoginState>({}, state, { isLoggingIn: false, isLoggedIn: true })
    case 'LOGIN_ERROR': return assign<{}, LoginState>({}, state,
      { isLoggingIn: false, loginErrorReason:  action.reason},
    )
    case 'QUEUE_POSITION_UPDATE': return assign<{}, LoginState>({}, state, {position: action.position})
    default: return state
  }
}

export interface LoggingInAction {
  type: 'LOGGING_IN'
}

export const fireLoggingIn = (): LoggingInAction => {
  return {
    type: 'LOGGING_IN'
  }
}

export interface LoggedInAction {
  type: 'LOGGED_IN'
}

export const handleLoggedIn = (): LoggedInAction => ({ type: 'LOGGED_IN' })

export interface LoginErrorAction {
  type: 'LOGIN_ERROR'
  reason: 'password' | 'username'
}

export const handleLoginError = (rawPacket: string): LoginErrorAction => {
  let reason
  switch(rawPacket.split('|')[0]) {
    case '1': reason = 'username'; break
    case '2': reason = 'password'; break
    case '3': reason = 'already loggedin'
  }
  return {
    type: 'LOGIN_ERROR',
    reason,
  }
}

export interface QueuePositionUpdateAction {
  type: 'QUEUE_POSITION_UPDATE'
  position: number
}

export const handleUpdateQueue = (rawPacket: string): QueuePositionUpdateAction => {
  return {
    type: 'QUEUE_POSITION_UPDATE',
    position: parseInt(/^(\d+)\|.*$/.exec(rawPacket)[1])
  }
}

