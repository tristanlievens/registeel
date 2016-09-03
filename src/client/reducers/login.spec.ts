import { loginReducer } from './login'
import { expect } from 'chai'


const initialState = loginReducer(undefined, { type: "INIT" })
describe('#loginReducer', () => {
  it('should handle successful login happypath', () => {
    const loggingInState = loginReducer(undefined, { type: 'LOGGING_IN' })
    const loggedInState = loginReducer(loggingInState, { type: 'LOGGED_IN' })
    expect(loggingInState).to.include({ isLoggedIn: false, isLoggingIn: true })
    expect(loggedInState).to.include({ isLoggedIn: true, isLoggingIn: false })
  })

  it('should handle login error', () => {
    const loggingInState = loginReducer(undefined, { type: 'LOGGING_IN' })
    const loginErrorState = loginReducer(loggingInState, {
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
