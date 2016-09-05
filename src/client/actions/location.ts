export interface LoadLocationAction {
  type: 'LOAD_LOCATION',
  position: [number, number],
  map: string,
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
