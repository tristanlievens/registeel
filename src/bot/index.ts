import { until } from 'async'
import { login as loginApi } from '../client/api/login'
import { Client } from '../typings'
import { move, moveTo } from './move'
import { waitOnAction } from '../client/utils'

const handleQueueUpdates = (client: Client) => (
  new Promise((resolve, reject) => {
    until(
      () => !client.store.getState().login.isLoggingIn,
      next => setTimeout(() => {
        if (client.store.getState().login.position) console.log("Queue position:", client.store.getState().login.position)
        next()
      }, 500),
      () => {
        if (client.store.getState().login.isLoggedIn) {
          resolve()
        } else {
          reject(`Login failed: incorrect ${client.store.getState().login.loginErrorReason}`)
        }
      },
    )
  })
)

const login = (client: Client) => (
  loginApi(process.env.PRO_USERNAME, process.env.PRO_PASSWORD, client)
    .then(() => handleQueueUpdates(client))
)

export const waitForMapLoaded = (mapName: string, client: Client) => (
  new Promise(resolve => {
    if (client.store.getState().location.map === mapName) resolve()
    console.log("waiting for map to load", mapName)
    waitOnAction('LOAD_LOCATION', client).then(resolve)
  })
)

export const startBot = (client: Client) => {
  return login(client)
    // .then(() => console.log('Successfully logged in!'))
    // .then(() => console.log('map loaded, starting to move'))
    // .then(() => moveTo("Viridian City", client))
    // .then(() => waitForMapLoaded("Viridian City", client))
    // .then(() => moveTo("Pokecenter Viridian", client))
    // .then(() => waitForMapLoaded("Pokecenter Viridian", client))
    .then(() => moveTo([9, 16], client)) // nurse joy
    .then(() => process.exit())
    .catch((error) => {
      console.log("bot errored", error)
      process.exit()
    })
}

export const onlyLogin = (client: Client) => {
  return login(client)
}
