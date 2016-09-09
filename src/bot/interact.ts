import { Client } from '../typings'
import { getMap } from '../client/api/map'
import { interact as interactApi } from '../client/api/interact'
import { moveTo } from './move'
import * as _ from 'lodash'

export const interact = (npcLocation: [number, number], choices: number[] = [], client: Client) => (
  getMap(client.store.getState().location.map, client.mapConnection)
  .then(map => {
    let npc = _.find(map.npcs, npc => npc.position[0] === npcLocation[0] && npc.position[1] === npcLocation[1])
    if (!npc) throw new Error(`No npc found at ${npcLocation}.`)
    return npc
  })
  .then(npc => interactApi(npc, choices, client))
)
