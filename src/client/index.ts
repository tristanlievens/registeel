import { Socket } from 'net'

import configureStore from './configureStore'
import { Client } from '../typings'
import { openMapConnection } from './api/map'
import handleData from './packetHandler'

const RED_SERVER = '46.28.203.224'
const BLUE_SERVER = '46.28.207.53'
const YELLOW_SERVER = '46.28.205.63'
const HOST = RED_SERVER
const PORT = 800

export * from './actions'
export * from './reducers'

export const start = () => (
  new Promise<Client>(resolve => {
    let connection = new Socket()
    const store = configureStore()
    connection.on('data', data => handleData(data.toString("binary"), store.dispatch))
    connection.connect(PORT, HOST, () => {
      openMapConnection().then(mapConnection => resolve({ store, connection, mapConnection }))
    })
  })
)
