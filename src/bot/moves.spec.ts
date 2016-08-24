import * as assert from 'assert'
import * as moves from './moves'
describe('#reverseSequence', () => {
  it('should return the proper reversed sequence', () => {
    let movementSequence: moves.Move[] = [
      { steps: 5, direction: 'up' },
      { steps: 4, direction: 'left' },
      { steps: 1, direction: 'up' },
    ]
    let expectedSequence = [
      { steps: 1, direction: 'down' },
      { steps: 4, direction: 'right' },
      { steps: 5, direction: 'down' },
    ]
    assert.deepEqual(moves.reverseSequence(movementSequence), expectedSequence)
  })
})
