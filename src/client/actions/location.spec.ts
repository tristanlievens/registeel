import { expect } from 'chai'
import * as locationActions from './location'

describe('LocationActions', () => {
  describe('#loadLocation', () => {
    it('should return the proper location action', () => {
      const expectedAction: locationActions.LoadLocationAction = {
        type: 'LOAD_LOCATION',
        position: [1,2],
        map: 'Koala Kingdom',
      }
      expect(locationActions.loadLocation([1,2], 'Koala Kingdom')).to.deep.equal(expectedAction)
    })
  })
})
