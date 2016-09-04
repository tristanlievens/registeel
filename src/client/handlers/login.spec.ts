import * as assert from 'assert'
import * as td from 'testdouble'
// need for mock, to make sure the action is called with the proper params
let actions = td.replace('../actions/login', { loginError: function () { return JSON.stringify(arguments) } })
import { handleLoginError } from './login'
import configureMockStore from 'redux-mock-store'

const dispatch = td.function(configureMockStore()().dispatch)

describe('#handleLoginError', () => {
  after(td.reset)
  it('should dispatch a username error login', () => {
    handleLoginError('1|', dispatch)
    td.verify(dispatch(actions.loginError('username')))
  })
  it('should dispatch a password error login', () => {
    handleLoginError('2|', dispatch)
    td.verify(dispatch(actions.loginError('password')))
  })
})
