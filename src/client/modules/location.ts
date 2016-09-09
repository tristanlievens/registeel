import { Reducer } from 'redux'
import { assign } from 'lodash'

/**
 * Location position is not set if the user is not logged in.
 */
export interface LocationState {
  position?: position
  map?: string
  isSurfing: boolean
  isBiking: boolean
}

const initialState: LocationState = {
  isSurfing: false,
  isBiking: false
}

type LocationAction = LoadLocationAction | MoveAction

export const locationReducer: Reducer<LocationState> = (state = initialState, action: LocationAction) => {
  switch (action.type) {
    case 'LOAD_LOCATION': return assign<{}, LocationState>({}, state, {
      position: action.position,
      map: action.map,
      isSurfing: action.isSurfing
    })
    case 'MOVE': return assign<{}, LocationState>({}, state, { position: action.position })
    default: return state
  }
}

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
