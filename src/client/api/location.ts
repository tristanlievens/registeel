import * as locationActions from '../actions/location'
import { Client } from '../../typings'
import { send } from '../utils/encryption'
import { getMap, Map } from './map'
import { LocationState } from '../reducers/location'
import * as _ from 'lodash'

export const move = (direction: locationActions.direction, client: Client): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (client.store.getState().location.map) resolve()
    else reject('Map is not loaded yet.')
  })
    .then(() => getMap(client.store.getState().location.map, client.mapConnection))
    .then(map => new Promise<void>((resolve, reject) => {
      const location = client.store.getState().location
      if (!canMove(direction, location, map)) reject('Not valid movement')
      execMove(direction, client)
      const destinationPosition = getDestinationPosition(direction, location, map)
      client.store.dispatch(locationActions.fireMove(destinationPosition))
      resolve()
    }))
}

/**
 * TODO:
 * - handle blocking npcs
 * - handle ledges
 * - handle bridges
 */
const canMove = (direction: locationActions.direction, location: LocationState, map: Map) => {
  const destinationPos = calculateNewPosition(location.position, direction)
  if (!insideBounds(destinationPos, map)) return false
  const destinationCollider = getCollider(destinationPos, map)
  if (_.includes([1, 11, 13], destinationCollider)) return false
  if (!location.isSurfing && 5 == destinationCollider) return false
  return true
}

const getDestinationPosition = (direction: locationActions.direction, location: LocationState, map: Map) => {
  const tempDestinationPos = calculateNewPosition(location.position, direction)
  const destinationCollider = getCollider(tempDestinationPos, map)
  if (getCollider(tempDestinationPos, map) == 2) {
    if (direction === 'down') return calculateNewPosition(tempDestinationPos, 'down')
    throw new Error('This is not a vlid move.')
  }
  return tempDestinationPos
}

const getCollider = (position: [number, number], map: Map) => map.colliders[position[1]][position[0]]

const insideBounds = (position: [number, number], map: Map) => (
  position[0] >= 0 && position[0] <= map.width && position[1] >= 0 && position[1] <= map.height
)

const calculateNewPosition = (oldPosition: locationActions.position, direction: locationActions.direction)
  : locationActions.position => {
  switch (direction) {
    case 'up': return [oldPosition[0], oldPosition[1] - 1]
    case 'down': return [oldPosition[0], oldPosition[1] + 1]
    case 'left': return [oldPosition[0], oldPosition[1] - 1]
    case 'right': return [oldPosition[0], oldPosition[1] + 1]
  }
}


const execMove = (direction: locationActions.direction, client: Client) => {
  let directionChar
  switch (direction) {
    case 'up': directionChar = 'u'; break
    case 'down': directionChar = 'd'; break
    case 'left': directionChar = 'l'; break
    case 'right': directionChar = 'r'; break
  }
  send(`#|.|${directionChar}|`, client.connection)
}
