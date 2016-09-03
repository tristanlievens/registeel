import { until } from 'async'

import { fireLogin } from '../client/actions'
import { Client } from '../typings'

const login = (client: Client) => (
  new Promise((resolve, reject) => {
    client.store.dispatch(<any>fireLogin(process.env.USERNAME, process.env.PASSWORD, client.connection))
    until(
      () => !client.store.getState().login.isLoggingIn,
      next => setTimeout(() => {
        if (client.store.getState().login.queuePosition) {
          console.log("Queue position:", client.store.getState().login.queuePosition)
        }
        next()
      }, 500),
      () => {
        if (client.store.getState().login.isLoggedIn) {
          resolve()
        } else {
          reject("Login failed: incorrect username or password")
        }
      },
    )
  })
)

export const startBot = (client: Client) => {
  login(client)
    .then(() => {
      console.log('Successfully logged in!')
    })
}


