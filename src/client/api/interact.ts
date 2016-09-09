import { Client } from '../../typings'
import { send } from '../utils/encryption'
import { getMap, Map, Npc } from './map'
import { waitOnAction } from '../utils'
import * as _ from 'lodash'


// add throttleing
export const interact = (npc: Npc, choices: number[] = [], client: Client) => {
  send(`N|.|${npc.id}`, client.connection)
  return choices.reduce<Promise<void>>((promiseAcc, choice) => {
    console.log(`making the ${choice}`)
    return promiseAcc
      .then(() => sendChoice(choice, client))
  }, Promise.resolve(null))
}

const sendChoice = (choice: number, client: Client) => (
  waitOnAction('UPDATE_SCRIPT', client)
    .then(() => send(`R|.|${client.store.getState().lastScript}|.|${choice}`, client.connection))
)
