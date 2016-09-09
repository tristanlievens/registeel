import { Reducer } from 'redux'
import { UpdateScriptAction } from '../actions/lastScript'

export const lastScriptReducer: Reducer<number> = (state: number = null, action: UpdateScriptAction) => {
  if (action.type === 'UPDATE_SCRIPT') return action.scriptId
  return state
}
