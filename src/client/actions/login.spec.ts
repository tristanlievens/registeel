import * as td from 'testdouble'
import { expect } from 'chai'
import { Socket } from 'net'
const encryption = td.replace('../utils/encryption')
import { fireLogin, LoggingInAction } from './login'
import { VERSION, HASH } from '../utils/constants'
import configureMockStore from 'redux-mock-store';
const mockStore = configureMockStore()

describe('LoginActions', () => {
  after(() => td.reset())
  describe('#fireLogin', () => {
    it('should send the proper message', () => {
      const connection = td.object(Socket)
      const expectedAction: LoggingInAction = { type: 'LOGGING_IN' }
      expect(fireLogin('theUsername', 'thePassword', connection)).to.deep.equal(expectedAction)
      td.verify(encryption.send(`+|.|theUsername|.|thePassword|.|${VERSION}|.|${HASH}|`, connection))
    })
  })
})
