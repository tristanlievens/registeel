import * as assert from 'assert'
import * as td from 'testdouble'
let actions = td.replace('../actions/login')
import { handleLoginError } from './login'

describe('#handleLoginError', () => {
  after(td.reset)
  it('should dispatch a username error login', () => {
    handleLoginError('1|', () => { })
    td.verify(actions.loginError('username', td.matchers.anything()))
  })
  it('should dispatch a password error login', () => {
    handleLoginError('2|', () => { })
    td.verify(actions.loginError('password', td.matchers.anything()))
  })
})
