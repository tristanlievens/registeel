import { Dispatch } from 'redux'
import * as loginActions from '../actions/login'

export const handleLoggedIn = (dispatch: Dispatch<any>): void => {
  dispatch(loginActions.loggedIn())
}

/**
 * `6|.|1|`: invalid user
 * `6|.|2|`: invalid password
 */
export const handleLoginError = (rawPacket: string, dispatch: Dispatch<any>) => {
  const reason: 'username' | 'password' = rawPacket.indexOf('1') === -1 ? 'password' : 'username'
  dispatch(loginActions.loginError(reason))
}

export const handleUpdateQueue = (rawPacket: string, dispatch: Dispatch<any>) => {
  const queuePosition: number = parseInt(/^(\d+)\|.*$/.exec(rawPacket)[1])
  dispatch(loginActions.updateQueue(queuePosition))
}
