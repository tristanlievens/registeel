import * as assert from 'assert'
import * as td from 'testdouble'
// need for mock, to make sure the action is called with the proper params
const loginActionsMock = {
  loginError: function () { return JSON.stringify(arguments) },
  updateQueue: function () { return JSON.stringify(arguments) }
}
let actions = td.replace('../actions/login', loginActionsMock)
import { handleLoginError, handleUpdateQueue } from './login'
import configureMockStore from 'redux-mock-store'

const dispatch = td.function(configureMockStore()().dispatch)
describe('LoginHandler', () => {
  after(td.reset)
  describe('#handleLoginError', () => {
    it('should dispatch a username error login', () => {
      handleLoginError('1|', dispatch)
      td.verify(dispatch(actions.loginError('username')))
    })
    it('should dispatch a password error login', () => {
      handleLoginError('2|', dispatch)
      td.verify(dispatch(actions.loginError('password')))
    })
  })
  describe('#handleUpdateQueue', () => {
    it('should update the queue', () => {
      handleUpdateQueue('108|0|', dispatch)
      td.verify(dispatch(actions.updateQueue(108)))
    })
  })
})
