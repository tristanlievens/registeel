import { Client } from '../typings'
import { getMap, Map } from '../client/api/map'
import { move as moveApi } from '../client/api/location'
import { LocationState } from '../client/reducers/location'
import { direction } from '../client'
import * as _ from 'lodash'

export const move = (moves: direction[], client: Client) => {
  moves.reduce((promiseAcc, direction) => {
    return promiseAcc
      .then(() => moveApi(direction, client))
      .then(() => wait())
  }, Promise.resolve())
}

const wait = (timeout?: number) => (
  new Promise(resolve => setTimeout(resolve, timeout | Math.floor(Math.random() * 2000) + 750))
)


export const moveTo = (mapName: string, client: Client) => (
  getMap(client.store.getState().location.map, client.mapConnection)
    .then(map => new Promise((resolve, reject) => {
      const link = _.find(map.links, link => link.destinationMap === mapName)
      if (!link) reject(`${mapName} has no link with the current map`)

    }))
)

const findPath = (target: [number, number], map: Map, location: LocationState) => {

}
