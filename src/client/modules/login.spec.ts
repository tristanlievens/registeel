import { expect } from 'chai'
import * as duck from './login'

const initialState = duck.loginReducer(undefined, { type: "INIT" })

describe('LoginDuck', () => {
  describe('#loginReducer', () => {
    it('should handle successful login happypath', () => {
      const loggingInState = duck.loginReducer(undefined, { type: 'LOGGING_IN' })
      const loggedInState = duck.loginReducer(loggingInState, { type: 'LOGGED_IN' })
      expect(loggingInState).to.include({ isLoggedIn: false, isLoggingIn: true })
      expect(loggedInState).to.include({ isLoggedIn: true, isLoggingIn: false })
    })

    it('should handle login error', () => {
      const loggingInState = duck.loginReducer(undefined, { type: 'LOGGING_IN' })
      const loginErrorState = duck.loginReducer(loggingInState, {
        type: 'LOGIN_ERROR',
        reason: 'password',
      })
      expect(loginErrorState).to.include({
        isLoggedIn: false,
        isLoggingIn: false,
        loginErrorReason: 'password'
      })
    })

    it('should update queue position', () => {
      const updatingQueuePosition: duck.QueuePositionUpdateAction = { type: 'QUEUE_POSITION_UPDATE', position: 108 }
      const updatedQueueState = duck.loginReducer(undefined, updatingQueuePosition)
      expect(updatedQueueState).to.include({
        position: 108
      })
    })
  })

  describe('LoginActions', () => {
    describe('#fireLogin', () => {
      it('should send the proper message', () => {
        const expectedAction: duck.LoggingInAction = { type: 'LOGGING_IN' }
        expect(duck.fireLoggingIn()).to.deep.equal(expectedAction)
      })
    })

    describe('#handleLoggedIn', () => {
      it('should return the proper action', () => {
        const action: duck.LoggedInAction = { type: 'LOGGED_IN' }
        expect(duck.handleLoggedIn()).to.deep.equal(action)
      })
    })

    describe('#handleLoginError', () => {
      it('should handle password failure', () => {
        const action: duck.LoginErrorAction = { type: 'LOGIN_ERROR', reason: 'username' }
        expect(duck.handleLoginError('1|')).to.deep.equal(action)
      })
    })

    describe('#updateQueue', () => {
      it('should return the proper action', () => {
        const action: duck.QueuePositionUpdateAction = { type: 'QUEUE_POSITION_UPDATE', position: 108 }
        expect(duck.handleUpdateQueue('108|0|')).to.deep.equal(action)
      })
    })
  })
})
