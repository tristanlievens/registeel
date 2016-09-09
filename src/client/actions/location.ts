export type direction = 'up' | 'down' | 'left' | 'right'
export type position = [number, number]

export interface MoveAction {
  type: 'MOVE'
  position: position
}

export const fireMove = (position: position): MoveAction => {
  return {
    type: 'MOVE',
    position
  }
}

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
