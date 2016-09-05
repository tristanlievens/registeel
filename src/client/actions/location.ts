export type direction = 'up' | 'down' | 'left' | 'right'

export interface MoveAction {
  type: 'MOVE'
  direction: direction
}

export const fireMove = (direction: direction): MoveAction => {
  return {
    type: 'MOVE',
    direction
  }
}

export type position = [number, number]

export interface LoadLocationAction {
  type: 'LOAD_LOCATION'
  position: position
  map: string
  isSurfing: boolean
}

export const handleLoadLocation = (rawPacket: string): LoadLocationAction => {
  const content = rawPacket.split('|')
  return {
    type: 'LOAD_LOCATION',
    position: [parseInt(content[1]), parseInt(content[2])],
    map: content[0],
    isSurfing: content[4] === '1',
  }
}
