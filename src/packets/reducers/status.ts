import { Action, Reducer } from 'redux'
import * as _ from 'lodash'

const initialState = {
  isAfk: false,
}

const status:Reducer<{}> =  (state: {} = initialState, action: Action): {} => {
  switch(action.type) {
    case 'SYSTEM_MESSAGE':
      return _.assign<{}, {}>({}, state, { isAfk: (action as any).isAfk })
    default:
      return state
  }
}

export default status