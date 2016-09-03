import { Dispatch } from 'redux'
var loginActions = require('../actions/login')

export const handleLoggedIn = (dispatch: Dispatch<any>): void => {
  loginActions.loggedIn(dispatch)
}

/**
 * `6|.|1|`: invalid user
 * `6|.|2|`: invalid password
 */
export const handleLoginError = (rawPacket: string, dispatch: Dispatch<any>) => {
  const reason: 'username' | 'password' = rawPacket.indexOf('1') === -1 ? 'password' : 'username'
  loginActions.loginError(reason, dispatch)
}
``
