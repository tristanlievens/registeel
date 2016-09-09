import { expect } from 'chai'
import * as moveBot from './move'

const map = {
  colliders: [
    [0, 1, 1, 0, 1],
    [0, 0, 0, 0, 1]
  ],
  links: [],
  npcs: [],
}

const locationState = { position: [0, 0] }
const expectedPath: [number, number][] = [[0, 0], [0, 1], [1, 1], [2, 1], [3, 1], [3, 0]]

describe('moveBot', () => {
  describe('#findPath', () => {
    it('should find a proper path', () => {
      expect(moveBot.findPath([3, 0], <any>map, <any>locationState)).to.deep.equal(expectedPath)
    })
  })

  describe('#directionifyPath', () => {
    it('should directionify the path properly', () => {
      const expectedDirections = ['down', 'right', 'right', 'right', 'up']
      expect(moveBot.directionifyPath(expectedPath)).to.deep.equal(expectedDirections)
    })
  })
})
