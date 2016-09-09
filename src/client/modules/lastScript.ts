import { Reducer } from 'redux'

export const lastScriptReducer: Reducer<number> = (state: number = null, action: UpdateScriptAction) => {
  if (action.type === 'UPDATE_SCRIPT') return action.scriptId
  return state
}

export interface UpdateScriptAction {
  type: 'UPDATE_SCRIPT'
  scriptId: number
}

// R|.|3|.|-1|.|Good morning, Trainer!-=-Welcome to Viridian City Pokemon Center.-=-Would you like me to heal your Pokemon?-#-Yes, please.-#-No, thanks.
export const handleUpdateScript = (rawPacketContent: string[]): UpdateScriptAction => {
  const scriptId = parseInt(rawPacketContent[1])
  return {
    type: 'UPDATE_SCRIPT',
    scriptId
  }
}
