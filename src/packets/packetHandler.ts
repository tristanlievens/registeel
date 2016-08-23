import { Store, Action } from 'redux'
import { loadBattle, updateBattleActions, loadTeam, loadLocation, loadTime, loadInventory, syncLocation, handleChat } from './actions'

const packetHandler = (packet: string, store:Store<any>, isReceiving: boolean) => {
  const action = <Action>getAction(packet, isReceiving)
  if (action.type === 'NO_ACTION') return
  store.dispatch(action)
}

export default packetHandler

const getAction = (packet: string, isReceiving: boolean):{} => {
  if (isReceiving && /^U/.test(packet)) return { type: 'NO_ACTION' } // just updating location of other player

  let [packetType, ...rawPacketContent] = packet.split('|.|')
  if (isReceiving) {
    switch (packetType) {
      case 'q': return loadLocation(rawPacketContent[0].split('|'))
      case 'E': return loadTime(rawPacketContent[0].split('|'))
      case 'd': return loadInventory(rawPacketContent)
      case '#': return loadTeam(rawPacketContent[0].split('\r\n'))
      case 'S': return syncLocation(rawPacketContent[0].split('|'))
      case "!": return loadBattle(rawPacketContent[0].split('|'))
      case "a": return updateBattleActions(rawPacketContent[0].split('|'))
      case 'w': return handleChat(rawPacketContent[0]) // chat message
      case 'C': return { type: 'NO_ACTION' } // loading channels
      case 'i': return { type: 'NO_ACTION' } // loading information about the player
      case '@': return { type: 'NO_ACTION' } // Load npc battlers
      case '*': return { type: 'NO_ACTION' } // Destory npcs
      case 'k': return { type: 'NO_ACTION' } // Map loading k|.|Seafoam B1F,m0,41,55,54,86,42,|
      case ')': return { type: 'NO_ACTION' } // Updating queue )|.|2|1|
      case '%': return { type: 'UPDATE_SURFING', isSurfing: /^1/.test(rawPacketContent[0]) }
      case '$': return { type: 'UPDATE_BIKING', isBiking: /^1/.test(rawPacketContent[0]) }
      case 'f': return { type: 'NO_ACTION' } // not identified
      case '[': return { type: 'NO_ACTION' } // not identified
      case 'y': return { type: 'NO_ACTION' } // not identified
      case '(': return { type: 'NO_ACTION' } // not identified
    }
  } else {
    switch(packetType) {
      case '#': return { type: 'MOVE', direction: rawPacketContent[0].split('|')[0] } // not identified
      case 'msg': return { type: 'NO_ACTION' } // msg|.|/bre| battle over
      case 'k': return { type: 'NO_ACTION' } // not identified
      case '2': return { type: 'NO_ACTION' } // not identified
      case 'g': return { type: 'NO_ACTION' } // Log in confirmation
      case ')': return { type: 'NO_ACTION' } // Log in confirmation
      case '_': return { type: 'NO_ACTION' } // not identified
    }
  }
  // console.log(isReceiving ? 'Receiving' : 'Sending')
  // console.log(packet)
  // console.log('============')
  return { type: 'NO_ACTION' }
}
