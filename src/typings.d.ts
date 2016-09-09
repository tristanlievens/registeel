import { Socket } from 'net'
import { Store } from 'redux'
import { State } from './client/modules'

export type Client = { store: Store<State>, connection: Socket, mapConnection: Socket }
