import * as assert from 'assert'
import { handlePacket } from './index'

describe('#handlePacket', () => {
  it('should dispatch a successful login', done => {
    handlePacket('5|.|0|', action => {
      assert.deepEqual(action, { type: "LOGGED_IN" })
      done()
    })
  })

  it('should dispatch error login', done => {
    handlePacket('6|.|1|', action => {
      assert.deepEqual(action, {
        type: 'LOGIN_ERROR',
        reason: 'username'
      })
      done()
    })
  })
})
