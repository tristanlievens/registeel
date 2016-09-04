import { until } from 'async'

import { fireLogin } from '../client/actions'
import { Client } from '../typings'

const login = (client: Client) => (
  new Promise((resolve, reject) => {
    client.store.dispatch(fireLogin(process.env.PRO_USERNAME, process.env.PRO_PASSWORD, client.connection))
    until(
      () => !client.store.getState().login.isLoggingIn,
      next => setTimeout(() => {
        if (client.store.getState().login.position) {
          console.log("Queue position:", client.store.getState().login.position)
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
