import * as async from 'async'
import { Client } from '../typings'
import { getMap, Map } from '../client/api/map'
import { move as moveApi } from '../client/api/location'
import { LocationState } from '../client/reducers/location'
import { direction } from '../client'
import * as _ from 'lodash'

export const move = (moves: direction[], client: Client) => {
  return moves.reduce<Promise<void>>((promiseAcc, direction) => {
    return promiseAcc
      .then(() => moveApi(direction, client))
      .then(() => wait())
  }, Promise.resolve(null))
}

const wait = (timeout?: number) => (
  new Promise<void>(resolve => setTimeout(resolve, timeout | Math.floor(Math.random() * 1000) + 750))
)

export const moveTo = (rawTarget: string | [number, number], client: Client) => {
  let getTarget: (map: Map) => [number, number]
  let getLocation = () => client.store.getState().location
  let positionArrived = (target: [number, number]) => getLocation().position[0] === target[0] && getLocation().position[1] === target[1]
  let completionTest: (target: [number, number]) => boolean

  if (typeof rawTarget === 'string') {
    getTarget = (map => {
        const link = _.find(map.links, link => link.destinationMap === rawTarget) ||
          _.find(map.links, link => link.destinationMap === 'Link')
        if (!link) throw new Error(`${rawTarget} has no link with the current map ${map.mapName}.\nAvailable links: ${JSON.stringify(map.links)}`)
        return link.position
      })
    completionTest = (target) => positionArrived(target) || getLocation().map === rawTarget
  } else {
    getTarget = (map) => <[number, number]>rawTarget
    completionTest = positionArrived
  }

  return getMap(getLocation().map, client.mapConnection)
    .then(map => new Promise(resolve => {
      const target = getTarget(map)
      async.until(
        () => completionTest(target),
        next => {
          getPath(target, map, client)
          .then(path => move([path[0]], client))
          .then(() => next())
        },
        resolve,
      )
    }))
}

const getPath = (target: [number, number], map: Map, client: Client) => (
  new Promise<direction[]>((resolve, reject) => {
    const fullPath = findPath(target, map, client.store.getState().location)
    if (fullPath.length === 0) reject(`No path found to ${target} from ${JSON.stringify(client.store.getState().location)}`)
    resolve(directionifyPath(fullPath))
  })
)

export const directionifyPath = (fullPath: [number, number][]) => (
  _.reduce<[number, number], direction[]>(fullPath.slice(1), (acc, elem, index) => {
    const prevPosition = fullPath[index]
    if (elem[0] < prevPosition[0]) return acc.concat('left')
    else if (prevPosition[0] < elem[0]) return acc.concat('right')
    else if (elem[1] < prevPosition[1]) return acc.concat('up')
    else if (prevPosition[1] < elem[1]) return acc.concat('down')
    else throw new Error('generated path has two consecutive identical positions')
  }, [])
)

import Pathfinder = require('pathfinding')

export const findPath = (target: [number, number], map: Map, location: LocationState): [number, number][] => {
  let matrix = map.colliders.map(row => row.map(cell => cell === 0 ? 0 : 1))
  map.links
    .filter(link => !(link.position[0] === target[0] && link.position[1] === target[1]))
    .forEach(link => matrix[link.position[1]][link.position[0]] = 1)
  return new Pathfinder.BestFirstFinder().findPath(
    location.position[0], location.position[1],
    target[0], target[1],
    new Pathfinder.Grid(matrix)
  )
}
