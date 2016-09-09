import * as duck from './location'
import { assign } from 'lodash'
import { expect } from 'chai'

describe('LocationDuck', () => {
  describe('#locationReducer', () => {
    it('should load initial location', () => {
      const position: duck.position = [1, 2]
      const action: duck.LoadLocationAction = {
        type: 'LOAD_LOCATION',
        position,
        map: 'Koala Kingdom',
        isSurfing: false
      }
      const loadedState = duck.locationReducer(undefined, action)
      expect(loadedState).to.include({
        position,
        map: 'Koala Kingdom',
        isSurfing: false
      })
    })

    it('should handle move', () => {
      const action: duck.MoveAction = {
        type: 'MOVE',
        position: [10, 9]
      }
      const initialState = duck.locationReducer(undefined, { type: 'INIT' })
      const positionedState = assign<{}, duck.LocationState>({}, initialState, { position: [10, 10] })
      const movedState = duck.locationReducer(positionedState, action)
      expect(movedState.position).to.deep.equal([10, 9])
    })
  })
  describe('LocationActions', () => {
    describe('#handleLoadLocation', () => {
      it('should return the proper location action', () => {
        const expectedAction: duck.LoadLocationAction = {
          type: 'LOAD_LOCATION',
          position: [1, 2],
          map: 'Koala Kingdom',
          isSurfing: false
        }
        expect(duck.handleLoadLocation('Koala Kingdom|1|2|1|0|')).to.deep.equal(expectedAction)
      })
    })

    describe('#fireMove', () => {
      it('should return a proper moved action', () => {
        const action: duck.MoveAction = { type: 'MOVE', position: [10, 9] }
        expect(duck.fireMove([10, 9])).to.deep.equal(action)
      })
    })
  })
})

