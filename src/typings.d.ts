import { Socket } from 'net'
import { Store } from 'redux'
import { State } from './client/reducers'

export type Client = { store: Store<State>, connection: Socket }
