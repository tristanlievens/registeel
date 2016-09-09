import { Reducer } from 'redux'
import { assign } from 'lodash'
import * as locationActions from '../actions/location'

/**
 * Location position is not set if the user is not logged in.
 */
export interface LocationState {
  position?: locationActions.position
  map?: string
  isSurfing: boolean
  isBiking: boolean
}

const initialState: LocationState = {
  isSurfing: false,
  isBiking: false
}

type LocationAction = locationActions.LoadLocationAction | locationActions.MoveAction

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
