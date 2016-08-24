import { move, reverseSequence, Move } from './moves'
import * as Robot from 'robotjs'

const keyTap = (key: string, delay = 1500) => (
  new Promise(resolve => {
    Robot.keyTap(key),
      setTimeout(resolve, delay)
  })
)

export const usePokeCenter = (store, options: { map?: string } = {}): Promise<{}> => {
  let movementSequence: Move[]
  if (options.map === 'Pokecenter Cinnabar') {
    movementSequence = [
      { steps: 5, direction: 'up' },
      { steps: 4, direction: 'left' },
      { steps: 1, direction: 'up' },
    ]
  }
  return new Promise(resolve => {
    Promise.resolve(null)
      .then(() => move(movementSequence, store))
      .then(() => keyTap('space')) // start intereaction
      .then(() => keyTap('space')) // greeting
      .then(() => keyTap('space')) // welcome
      .then(() => keyTap('1')) // choose for heal
      .then(() => keyTap('space', 2500)) // let's heal!
      .then(() => keyTap('space')) // take care!
      .then(() => keyTap('space')) // bye!
      .then(() => move(reverseSequence(movementSequence), store))
      .then(resolve)
  })
}
