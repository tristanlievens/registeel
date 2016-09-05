import { locationReducer, LocationState } from './location'
import * as locationActions from '../actions/location'
import { assign } from 'lodash'
import { expect } from 'chai'

describe('#locationReducer', () => {
  it('should load initial location', () => {
    const position: locationActions.position = [1, 2]
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

  it('should handle move', () => {
    const action: locationActions.MoveAction = {
      type: 'MOVE',
      direction: 'up'
    }
    const initialState = locationReducer(undefined, { type: 'INIT' })
    const positionedState = assign<{}, LocationState>({}, initialState, { position: [10, 10] })
    const movedState = locationReducer(positionedState, action)
    expect(movedState.position).to.deep.equal([10, 9])
  })
})
