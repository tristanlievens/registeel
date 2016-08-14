import { Action, Reducer } from 'redux'
import { LocationAction, MoveAction } from '../actions'
import * as _ from 'lodash'

const initialLocation: LocationState = {
  posX: 0,
  posY: 0,
  map: 'No map',
  isSurfing: false,
  isBiking: false,
}

const location: Reducer<LocationState> = (state: LocationState = initialLocation, action: Action): LocationState => {
  switch (action.type) {
    case 'UPDATE_BIKING':
      return _.assign<{}, LocationState>({}, state, { isBiking: (action as any).isBiking })
    case 'UPDATE_SURFING':
      return _.assign<{}, LocationState>({}, state, { isBiking: false, isSurfing: (action as any).isSurfing })
    case 'LOAD_LOCATION':
      return _.assign<{}, LocationState>(
        {},
        state,
        _.pick(action as LocationAction, 'posX', 'posY', 'map', 'isSurfing')
      )
    case 'MOVE':
      let stateUpdate: {}
      switch ((action as MoveAction).direction) {
        case 'r': stateUpdate = { posX: state.posX + 1 }; break
        case 'l': stateUpdate = { posX: state.posX - 1 }; break
        case 'u': stateUpdate = { posY: state.posY - 1 }; break
        case 'd': stateUpdate = { posY: state.posY + 1 }; break
      }
      return _.assign<{}, LocationState>({}, state, stateUpdate)
    default:
      return state
  }
}

export default location
