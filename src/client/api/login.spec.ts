// import chai = require('chai')
// chai.use(require('chai-as-promised'))
// const expect = chai.expect
import { expect } from 'chai'
import * as td from 'testdouble'
import { VERSION, HASH } from '../utils/constants'
import { State } from '../reducers'
import { configureMockClient } from '../testHelpers/factories'

const { send } = td.replace('../utils/encryption')
import { login } from './login'
describe('loginApi', () => {
  describe('#login', () => {
    it.only('should send proper login script', done => {
      const client = configureMockClient()
      let promise = login('theUsername', 'thePassword', client)
      promise.then(() => {
        td.verify(send(`+|.|theUsername|.|thePassword|.|${VERSION}|.|${HASH}|`, client.connection))
        done()
      })
    })
  })
})
