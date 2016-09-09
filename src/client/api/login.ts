import { Client } from '../../typings'
import { fireLoggingIn } from '../actions'
import { send } from '../utils/encryption'
import { VERSION, HASH } from '../utils/constants'

export const login = (username: string, password: string, client: Client) => {
  return new Promise(resolve => {
    send(`+|.|${username}|.|${password}|.|${VERSION}|.|${HASH}`, client.connection)
    client.store.dispatch(fireLoggingIn())
    resolve()
  })
}
