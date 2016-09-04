export interface LoadLocationAction {
  type: 'LOAD_LOCATION',
  position: [number, number],
  map: string
}

export const loadLocation = (position: [number, number], map: string): LoadLocationAction => {
  return {
    type: 'LOAD_LOCATION',
    position,
    map,
  }
}
