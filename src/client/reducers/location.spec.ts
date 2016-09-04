import { locationReducer } from './location'
import { expect } from 'chai'


const initialState = locationReducer(undefined, { type: "INIT" })
describe('#loginReducer', () => {
  it('should handle successful login happypath', () => {
    const loggingInState = locationReducer(undefined, { type: 'LOGGING_IN' })
    const loggedInState = locationReducer(loggingInState, { type: 'LOGGED_IN' })
    expect(loggingInState).to.include({ isLoggedIn: false, isLoggingIn: true })
    expect(loggedInState).to.include({ isLoggedIn: true, isLoggingIn: false })
  })

  it('should handle login error', () => {
    const loggingInState = locationReducer(undefined, { type: 'LOGGING_IN' })
    const loginErrorState = locationReducer(loggingInState, {
      type: 'LOGIN_ERROR',
      reason: 'password',
    })
    expect(loginErrorState).to.include({
      isLoggedIn: false,
      isLoggingIn: false,
      loginErrorReason: 'password'
    })
  })
})
