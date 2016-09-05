import { Socket } from 'net'

import configureStore from './configureStore'
import { Client } from '../typings'
import handleData from './packetHandler'

const RED_SERVER = '46.28.203.224'
const HOST = RED_SERVER
const PORT = 800

export const start = () => (
  new Promise<Client>(resolve => {
    let connection = new Socket()
    const store = configureStore()
    connection.on('data', data => handleData(data.toString("binary"), store.dispatch))
    connection.connect(PORT, HOST, () => resolve({ store, connection }))
  })
)
