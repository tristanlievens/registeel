import { Action, Reducer } from 'redux'
import { LocationState } from '../../../index.d.ts'
import { LocationAction, MoveAction } from '../actions'
import * as _ from 'lodash'

const initialLocation:LocationState = {
  posX: 0,
  posY: 0,
  map: 'No map',
}

const location:Reducer<LocationState> = (state: LocationState = initialLocation, action: Action): LocationState => {
  switch(action.type) {
    case 'LOAD_LOCATION':
      return (Object as any).assign({}, state, _.pick((action as LocationAction), 'posX', 'posY', 'map'))
    case 'MOVE':
      let stateUpdate: {}
      switch((action as MoveAction).direction) {
        case 'r': stateUpdate = { posX: state.posX + 1 }; break
        case 'l': stateUpdate = { posX: state.posX - 1 }; break
        case 'u': stateUpdate = { posY: state.posY + 1 }; break
        case 'd': stateUpdate = { posY: state.posY - 1 }; break
      }
      return (Object as any).assign({}, state, stateUpdate)
    default:
      return state
  }
}

export default location
