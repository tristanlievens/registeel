import { expect } from 'chai'
import * as td from 'testdouble'
import { Socket } from 'net'
const encryption = td.replace('../utils/encryption')
import { fireLogin, updateQueue, LoggingInAction } from './login'
import { VERSION, HASH } from '../utils/constants'

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
  describe('#updateQueue', () => {
    it('should return the proper action', () => {
      expect(updateQueue(108)).to.deep.equal({type: 'QUEUE_POSITION_UPDATE', position: 108})
    })
  })
})
