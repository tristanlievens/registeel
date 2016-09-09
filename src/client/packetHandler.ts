import * as locationActions from './modules/location'
import * as loginActions from './modules/login'
import { handleUpdateTeam } from './modules/team'
import { handleUpdateScript } from './modules/lastScript'
import { decrypt, send } from './utils/encryption'

import { Store, Dispatch } from 'redux'
import { Client } from '../typings'

const handleData = (encryptedData: string, client: Client): void => {
  decrypt(encryptedData)
    .split('.\\\r\n')
    .filter(packet => packet.length > 0)
    .forEach(packet => handlePacket(packet, client))
}

export default handleData

export const handlePacket = (packet: string, client: Client): void => {
  if(packet[0] === 'U') return
  let [packetType, ...rawPacketContent] = packet.split('|.|')
  switch (packetType) {
    case '5': handleLoggedIn(rawPacketContent[0], client); break
    case '6': client.store.dispatch(loginActions.handleLoginError(rawPacketContent[0])); break
    case ')': client.store.dispatch(loginActions.handleUpdateQueue(rawPacketContent[0])); break
    case 'q': handleLoadLocation(rawPacketContent[0], client); break
    case '.': send('_', client.connection); break // ProcessCommands
    case "'": send("'", client.connection); break // ProcessCommands
    case 'R': client.store.dispatch(handleUpdateScript(rawPacketContent)); break
    case 'E': return // loadTime(rawPacketContent[0].split('|'))
    case 'd': return // loadInventory(rawPacketContent)
    case '#': client.store.dispatch(handleUpdateTeam(rawPacketContent[0])); break
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
    // default: console.log('Unhandled', packet)
  }
}

const handleLoadLocation = (rawPacket: string, client: Client) => {
  const action = locationActions.handleLoadLocation(rawPacket)
  send(`k|.|${action.map.toLowerCase()}`, client.connection)
  send('S', client.connection)
  client.store.dispatch(locationActions.handleLoadLocation(rawPacket))
}


const handleLoggedIn = (rawPacket: string, client: Client) => {
  send(')', client.connection)
  send('_', client.connection)
  send('g', client.connection)
  client.store.dispatch(loginActions.handleLoggedIn())
}
