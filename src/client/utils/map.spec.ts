import * as td from 'testdouble'
import { Socket } from 'net'
import { expect } from 'chai'
import * as fs from 'fs'
import * as  path from 'path'
import { parseMapBinary } from './map'

describe('MapUtils', () => {
  describe('#parseMapBinary', () => {
    it('should handle a normal new binary file', done => {
      let connection = new Socket()
      let buf = fs.readFileSync(path.join(process.cwd(), 'fixtures', 'MapBinary'))
      parseMapBinary(buf, connection)
      connection.on('Viridian City House 1', map => done())
    })
  })
})
