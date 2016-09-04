import { Dispatch } from 'redux'
import * as locationActions from '../actions/location'

export const handleLoadLocation = (rawPacket: string, dispatch: Dispatch<any>) => {
  dispatch(locationActions.loadLocation([0,0], 'The Map'))
}
