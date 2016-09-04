import { expect } from 'chai'
import * as td from 'testdouble'
const encryption = td.replace('../utils/encryption')
import { fireLogin, updateQueue } from './login'
import { VERSION, HASH } from '../utils/constants'
import configureMockStore from 'redux-mock-store';
const mockStore = configureMockStore()

describe('LoginActions', () => {
  describe('#fireLogin', () => {
    it('should send the proper message', () => {
      const store = mockStore()
      store.dispatch(fireLogin('theUsername', 'thePassword', <any>{}))
      //td.verify(encryption.send) 
    })
  })
  describe('#updateQueue', () => {
    it('should return the proper action', () => {
      expect(updateQueue(108)).to.deep.equal({type: 'QUEUE_POSITION_UPDATE', position: 108})
    })
  })
})
