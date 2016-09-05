import * as td from 'testdouble'
import { Socket } from 'net'
import mockConfigureStore from 'redux-mock-store'
import { VERSION, HASH } from '../utils/constants'
import { State } from '../reducers'


const encryption = td.replace('../utils/encryption')
const configureStore = mockConfigureStore()
import { login } from './login'
describe('loginApi', () => {
  after(td.reset)
  describe('#login', () => {
    it('should send proper login script', () => {
      const connection = td.object(Socket)
      const store = configureStore()
      login('theUsername', 'thePassword', { connection, store })
      td.verify(encryption.send(`+|.|theUsername|.|thePassword|.|${VERSION}|.|${HASH}|`, connection))
    })
  })
})
