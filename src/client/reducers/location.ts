import { Reducer } from 'redux'
import { assign } from 'lodash'
import * as locationActions from '../actions/location'

/**
 * Location position is not set if the user is not logged in.
 */
export interface LocationState {
  position?: [number, number]
  map?: string
  isSurfing: boolean
  isBiking: boolean
}

const initialState: LocationState = {
  isSurfing: false,
  isBiking: false
}

type LocationAction = locationActions.LoadLocationAction

export const locationReducer: Reducer<LocationState> = (state: LocationState = initialState, action: LocationAction) => {
  switch (action.type) {
    case 'LOAD_LOCATION': return assign<{}, LocationState>({}, state, {
      position: action.position,
      map: action.map,
      isSurfing: action.isSurfing
     })
    default: return state
  }
}
