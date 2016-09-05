import { expect } from 'chai'
import * as locationActions from './location'

describe('LocationActions', () => {
  describe('#handleLoadLocation', () => {
    it('should return the proper location action', () => {
      const expectedAction: locationActions.LoadLocationAction = {
        type: 'LOAD_LOCATION',
        position: [1,2],
        map: 'Koala Kingdom',
        isSurfing: false
      }
      expect(locationActions.handleLoadLocation('Koala Kingdom|1|2|1|0|')).to.deep.equal(expectedAction)
    })
  })

  describe('#fireMove', () => {
    it('should return a proper moved action', () => {
      const action: locationActions.MoveAction = { type: 'MOVE', direction: 'up' }
      expect(locationActions.fireMove('up')).to.deep.equal(action)
    })
  })
})
