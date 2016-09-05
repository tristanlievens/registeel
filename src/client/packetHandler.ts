import * as locationActions from './actions/location'
import * as loginActions from './actions/login'
import { decrypt } from './utils/encryption'
import { handleUpdateTeam } from './actions/team'

import { Store, Dispatch } from 'redux'

const handleData = (encryptedData: string, dispatch: Dispatch<any>): void => {
  decrypt(encryptedData)
    .split('.\\\r\n')
    .forEach(packet => handlePacket(packet, dispatch))
}

export default handleData

export const handlePacket = (packet: string, dispatch: Dispatch<any>): void => {
  console.log(packet)
  let [packetType, ...rawPacketContent] = packet.split('|.|')
  switch (packetType) {
    case '5': dispatch(loginActions.handleLoggedIn()); break
    case '6': dispatch(loginActions.handleLoginError(rawPacketContent[0])); break
    case ')': dispatch(loginActions.handleUpdateQueue(rawPacketContent[0])); break
    case 'q': dispatch(locationActions.handleLoadLocation(rawPacketContent[0])); break
    case 'E': return // loadTime(rawPacketContent[0].split('|'))
    case 'd': return // loadInventory(rawPacketContent)
    case '#': dispatch(handleUpdateTeam(rawPacketContent[0])); break
    case 'S': return // syncLocation(rawPacketContent[0].split('|'))
    case "!": return // loadBattle(rawPacketContent[0].split('|'))
    case "a": return // updateBattleActions(rawPacketContent[0].split('|'))
    case 'w': return // handleChat(rawPacketContent[0]) // chat message
    case 'C': return // { type: 'NO_ACTION' } // loading channels
    case 'i': return // { type: 'NO_ACTION' } // loading information about the player
    case '@': return // { type: 'NO_ACTION' } // Load npc battlers
    case '*': return // { type: 'NO_ACTION' } // Destory npcs
    case 'k': return // { type: 'NO_ACTION' } // Map loading k|.|Seafoam B1F,m0,41,55,54,86,42,|
    case '%': return // { type: 'UPDATE_SURFING', isSurfing: /^1/.test(rawPacketContent[0]) }
    case '$': return // { type: 'UPDATE_BIKING', isBiking: /^1/.test(rawPacketContent[0]) }
    case 'f': return // { type: 'NO_ACTION' } // not identified
    case '[': return // { type: 'NO_ACTION' } // not identified
    case 'y': return // { type: 'NO_ACTION' } // not identified
    case '(': return // { type: 'NO_ACTION' } // not identified
  }
}
