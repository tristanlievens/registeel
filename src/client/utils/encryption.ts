import { map } from 'lodash'
import { Socket } from 'net'

export const decrypt = (message: string): string => {
  return map(message, (c, i) => String.fromCharCode(c.charCodeAt(0) ^ 1)).join('') // XOR cipher by 1
}

export const encrypt = decrypt

export const send = (message: string, connection: Socket) => {
  connection.write(encrypt(message + '.\\\r\n'))
}
