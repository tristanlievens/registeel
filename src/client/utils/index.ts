export * from './byteOperators'
export * from './constants'
export * from './encryption'

import { Client } from '../../typings'

export const waitOnAction = (type: string, client: Client) => (
  new Promise(resolve => {
    const unsub = client.store.subscribe(() => {
      if (client.store.getState().lastAction.type === type) {
        unsub()
        resolve()
      }
    })
  })
)
