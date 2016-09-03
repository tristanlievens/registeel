import * as td from 'testdouble'
const encryption = td.replace('../utils/encryption')
import { fireLogin } from './login'
import { VERSION, HASH } from '../utils/constants'
import configureMockStore from 'redux-mock-store';
const mockStore = configureMockStore()

describe('LoginActions', () => {
  describe('#fireLogin', () => {
    it('should send the proper message', () => {
      const store = mockStore()
      store.dispatch(fireLogin('theUsername', 'thePassword', <any>{}))
      td.verify(encryption.send)
    })
  })
})
