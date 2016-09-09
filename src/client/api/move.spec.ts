import * as td from 'testdouble'
import { configureMockClient } from '../testHelpers/factories'
import { Map } from './map'
const { send } = td.replace('../utils/encryption')
describe('locationApi', () => {
  after(td.reset)
  describe('#move', () => {
    // it('should be able to move up', done => {
    //   td.replace('./map', {
    //     map: () => {
    //       return {
    //         mapName: 'Viridian Cities'
    //       }
    //     }
    //   })
    //   const locationApi = require('./location')
    //   const client = configureMockClient({ location: { map: 'Viridian City' } })
    //   locationApi.move('up', client).then(() => {
    //     td.verify(send('test', client.connection))
    //   })
    // })
  })
})
