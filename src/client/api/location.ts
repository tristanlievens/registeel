import * as locationActions from '../actions/location'
import { Client } from '../../typings'
import { send } from '../utils/encryption'

export const move = (direction: locationActions.direction, client: Client) => {
  // TODO: check if the move is possible
  let directionChar
  switch (direction) {
    case 'up': directionChar = 'u'; break
    case 'down': directionChar = 'd'; break
    case 'left': directionChar = 'l'; break
    case 'right': directionChar = 'r'; break
  }
  send(`#|.|${directionChar}|`, client.connection)
  client.store.dispatch(locationActions.fireMove(direction))
  return Promise.resolve(null)
}
