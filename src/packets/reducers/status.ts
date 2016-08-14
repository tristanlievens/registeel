import { Action, Reducer } from 'redux'
import * as _ from 'lodash'
import { StatusState } from '../../stateDeclarations'


const initialState: StatusState = {
  isAfk: false,
  isWaiting: true,
}

const status: Reducer<StatusState> = (state: StatusState = initialState, action: Action): StatusState => {
  switch (action.type) {
    case 'SYSTEM_MESSAGE':
      return _.assign<{}, StatusState>({}, state, { isAfk: (action as any).isAfk })
    case 'TOGGLE_WAITING': 
      return _.assign<{}, StatusState>({}, state, { isWaiting: (action as any).isWaiting })
    default:
      return state
  }
}

export default status