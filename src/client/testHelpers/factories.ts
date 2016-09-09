import * as td from 'testdouble'
import { Socket } from 'net'
import { Client } from '../../typings'
import configureStore from '../configureStore'

export const configureMockClient = (initialState?) => {
  return {
    connection: new Socket(),
    mapConnection: new Socket(),
    store: configureStore(initialState)
  }
}
