import { Socket } from 'net'
import { memoize } from 'lodash'
import { intToByteArray } from '../utils/byteOperators'
import * as fs from 'fs'
import * as zlib from 'zlib'
import BufferReader = require('buffer-reader')

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
  return new Promise<Map>(resolve => {
    const packet = `r${mapName}.pm`.split('').map(char => char.charCodeAt(0))
    const header = intToByteArray(packet.length + 4)
    const buffer = Buffer.from(header.concat(packet))
    mapConnection.write(buffer)
    mapConnection.once(mapName, (parsedMap: Map) => resolve(parsedMap))
  })
}

export const getMap = memoize(downloadMap)

let memorizedBuffer = new Buffer('')

export const parseMapBinary = (binary: Buffer, connection: Socket): void => {
  memorizedBuffer = Buffer.concat([memorizedBuffer, binary])
  if (binary.length % 1448 === 0) return // full buffer, map not yet finished
  const rawReader = new BufferReader(memorizedBuffer)
  memorizedBuffer = new Buffer('')
  const header = rawReader.nextBuffer(4)
  const contentReader = new BufferReader(rawReader.restAll())
  const type = contentReader.nextString(1)
  if (type !== 'm') return
  const mapNameLength = contentReader.nextInt8()
  const mapName = contentReader.nextString(mapNameLength)
  const mapBuffer = contentReader.restAll()
  zlib.gunzip(mapBuffer, (err, buffer: Buffer) => {
    console.log("Unzipped buffer length", buffer.length)
    connection.emit(mapName.replace('.pm', ''), parseMapContent(buffer, mapName))
  })
}

interface Link {
  position: [number, number]
  destinationPosition: [number, number]
  destinationMap: string
}

export interface Npc {
  name: string
  position: [number, number]
  losLength: number
  path: string
  id: number
  npcDialogue: string
}

export interface Map {
  colliders: number[][]
  height: number
  width: number
  mapName: string
  isOutside: boolean
  npcs: Npc[]
  links: Link[]
  weather: string
}

const parseMapContent = (buffer: Buffer, mapName?: string): Map => {
  console.log(mapName)
  const reader = new BufferReader(buffer)
  const colliders = parseTiles(reader)
  const tiles1 = parseTiles(reader)
  const tiles2 = parseTiles(reader)
  const tiles3 = parseTiles(reader)
  const tiles4 = parseTiles(reader)
  const weather = parseString(reader)
  reader.move(4)
  const isOutside = reader.nextInt8() === 1 // 0 for inside
  const region = parseString(reader) // 1 for kanto
  reader.move(2)
  const links = parseLinks(reader)
  reader.move(2)
  const npcs = parseNpcs(reader)
  return {
    mapName,
    npcs,
    links,
    weather,
    isOutside,
    colliders,
    height: colliders.length,
    width: colliders[0].length,
  }
}

const parseString = (reader): string => {
  const wordLength = reader.nextUInt16LE()
  return reader.nextString(wordLength)
}

const parseTiles = (reader): number[][] => {
  if (reader.nextInt16LE() !== 2) return
  const height = reader.nextInt32LE()
  reader.move(4)
  const width = reader.nextInt32LE()
  reader.move(4)
  let tiles: number[][] = []
  for (let y = 0; y < height; y++) {
    let row = []
    for (let x = 0; x < width; x++) row.push(reader.nextUInt16LE())
    tiles.push(row)
  }
  return tiles
}

const parseLinks = (reader): Link[] => {
  const linkCount = reader.nextInt16LE() - 1
  reader.move(16)
  let links: Link[] = []
  for (let i = 0; i < linkCount; i++) {
    const destinationMap = parseString(reader)
    const position: [number, number] = [reader.nextInt16LE(), reader.nextInt16LE()]
    const destinationPosition: [number, number] = [reader.nextInt16LE(), reader.nextInt16LE()]
    links.push({
      destinationMap,
      position,
      destinationPosition,
    })
  }
  return links
}

const parseNpcs = (reader): Npc[] => {
  const npcCount = reader.nextInt16LE() - 1
  reader.move(90)
  const npcs = []
  for (let i = 0; i < npcCount; i++) {
    const name = parseString(reader)
    const position: [number, number] = [reader.nextInt16LE(), reader.nextInt16LE()]
    reader.move(1)
    const losLength = reader.nextInt8()
    reader.move(2)
    const npcDialogue = parseString(reader)
    const path = parseString(reader) // eg. UUPPDDPP == [up, up, pause, pause, down, down, pause, pause]
    reader.move(28)
    const isBattler = reader.nextInt16LE() === 1 // 0 for not battler
    reader.move(10)
    const id = reader.nextInt16LE()
    if (name !== 'TileScript') {
      npcs.push({
        name,
        position,
        losLength,
        path,
        id,
        npcDialogue
      })
    }
    reader.move(28)
  }
  return npcs
}

/**
 * colliders:
 * 0: walkable
 * 1: not walkable
 * 2: jumpable ledge
 * 5: water
 * 9: bridge
 * 10: start of bridge
 * 7: sth with walkable next to start of bridge
 * 8: sth with walkable next to 7
 * 14: sth with an impenatrable height difference
 * 11: cutable
 * 13: smashable
 */
