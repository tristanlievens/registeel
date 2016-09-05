import { locationReducer } from './location'
import * as locationActions from '../actions/location'
import { expect } from 'chai'

describe('#locationReducer', () => {
  it('should load initial state login error', () => {
    const position: [number, number] = [1,2]
    const action: locationActions.LoadLocationAction = {
      type: 'LOAD_LOCATION',
      position,
      map: 'Koala Kingdom',
      isSurfing: false
    }
    const loadedState = locationReducer(undefined, action)
    expect(loadedState).to.include({
      position,
      map: 'Koala Kingdom',
      isSurfing: false
    })
  })
})
