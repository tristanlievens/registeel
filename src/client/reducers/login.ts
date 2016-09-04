import { Reducer } from 'redux'
import { assign } from 'lodash'
import { LoggingInAction, LoggedInAction, LoginErrorAction, QueuePositionUpdateAction } from '../actions/login'

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
