import { expect } from 'chai'
import * as loginActions from './login'

describe('LoginActions', () => {
  describe('#fireLogin', () => {
    it('should send the proper message', () => {
      const expectedAction: loginActions.LoggingInAction = { type: 'LOGGING_IN' }
      expect(loginActions.fireLoggingIn()).to.deep.equal(expectedAction)
    })
  })

  describe('#handleLoggedIn', () => {
    it('should return the proper action', () => {
      const action: loginActions.LoggedInAction = { type: 'LOGGED_IN' }
      expect(loginActions.handleLoggedIn()).to.deep.equal(action)
    })
  })


  describe('#handleLoginError', () => {
    it('should handle password failure', () => {
      const action: loginActions.LoginErrorAction = { type: 'LOGIN_ERROR', reason: 'username' }
      expect(loginActions.handleLoginError('1|')).to.deep.equal(action)
    })
  })

  describe('#updateQueue', () => {
    it('should return the proper action', () => {
      const action: loginActions.QueuePositionUpdateAction = { type: 'QUEUE_POSITION_UPDATE', position: 108 }
      expect(loginActions.handleUpdateQueue('108|0|')).to.deep.equal(action)
    })
  })
})
