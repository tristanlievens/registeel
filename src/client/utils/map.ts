import { Socket } from 'net'
import { memoize } from 'lodash'
import { intToByteArray } from './byteOperators'
import * as fs from 'fs'
import { StringDecoder } from 'string_decoder'
import * as zlib from 'zlib'

const HOST = '95.183.48.126'
const PORT = 803

export const openMapConnection = () => {
  return new Promise<Socket>(resolve => {
    const connection = new Socket()
    connection.on('data', (binary) => parseMapBinary(binary, connection)) // get mapname from binary
    connection.on('end', () => console.log('Map connection ended'))
    connection.connect(PORT, HOST, () => resolve(connection))
  })
}

const downloadMap = (mapName: string, mapConnection: Socket) => {
  return new Promise(resolve => {
    const packet = `r${mapName}.pm`.split('').map(char => char.charCodeAt(0))
    const header = intToByteArray(packet.length + 4)
    const buffer = Buffer.from(header.concat(packet))
    mapConnection.write(buffer)
    mapConnection.on(mapName, (parsedMap) => resolve(parsedMap))
  })
}

let memorizedBuffer = new Buffer('')

export const parseMapBinary = (binary: Buffer, connection: Socket) => {
  memorizedBuffer = Buffer.concat([memorizedBuffer, binary])
  if (binary.length % 1448 === 0) return // full buffer, map not yet finished
  const header = memorizedBuffer.slice(0, 4)
  const content = memorizedBuffer.slice(4)
  memorizedBuffer = new Buffer('')
  const type = String.fromCharCode(content.readInt8(0))
  if (type !== 'm') return
  const mapNameLength = content.readInt8(1)
  const mapName = content.slice(2, 2 + mapNameLength).toString()
  const map = content.slice(2 + mapNameLength)
  zlib.gunzip(map, (err, buffer: Buffer) => {
    if (buffer.readInt16LE(0) !== 2) return
    const height = buffer.readInt32LE(2)
    const width = buffer.readInt32LE(10)
    let colliders: number[][] = []
    let bufferPosition = 18
    for (let y = 0; y < height; y++) {
      let row = []
      for (let x = 0; x < width; x++) {
        row.push(buffer.readUInt16LE(bufferPosition))
        if (buffer.readUInt16LE(bufferPosition) !== 1 && buffer.readUInt16LE(bufferPosition) !== 0) console.log(x, y, buffer.readUInt16LE(bufferPosition))
        bufferPosition += 2
      }
      colliders.push(row)
    }
    connection.emit(mapName.replace('.pm', ''), colliders)
  })
}


export const map = memoize(downloadMap)
