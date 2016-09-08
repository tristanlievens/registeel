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
