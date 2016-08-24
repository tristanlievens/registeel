import { Store } from 'redux'
import { State, LocationState } from '../stateDeclarations'
import handleBattle from './handleBattle'
import * as Robot from 'robotjs'
import * as async from 'async'
import { color } from 'd3-color'

interface TargetLocation {
  targetPos: number
  isHorizontal: boolean
}

const gotoLocation = (path: TargetLocation, store: Store<State>, done): void => {
  console.log("Going to", path);

  let key
  const startLocation = store.getState().location
  if (path.isHorizontal) key = (path.targetPos < startLocation.posX ? 'a' : 'd')
  else key = (path.targetPos < startLocation.posY ? 'w' : 's')
  Robot.keyToggle(key, 'down')
  const keepMoving = (store: Store<State>): void => {
    setTimeout(() => {
      const state = store.getState()
      console.log('current', path.isHorizontal ? state.location.posX : state.location.posY, 'target', path.targetPos)
      const hasArrived = (path.isHorizontal ? state.location.posX : state.location.posY) === path.targetPos
      if (hasArrived) {
        Robot.keyToggle(key, 'up')
        done()
      }
      else if (state.battle.isBattling) {
        Robot.keyToggle(key, 'up')
        handleBattle(store, () => {
          Robot.keyToggle(key, 'down')
          keepMoving(store)
        })
      }
      else keepMoving(store)
    }, 100)
  }
  keepMoving(store)
}

export const followPath = (rawPath: TargetLocation | TargetLocation[], store: Store<State>, done): void => {
  let path: TargetLocation[] = rawPath as any
  if (rawPath.constructor !== Array) path = [rawPath as TargetLocation]
  async.series(path.map(targetLocation => (
    resolve => gotoLocation(targetLocation, store, resolve)
  )), done)
}

export interface Move {
  steps: number
  direction: 'right' | 'left' | 'up' | 'down'
}

export const move = (rawSequence: Move | Move[], store: Store<State>) => {
  const calculateTargetPath = (steps, direction, store): TargetLocation => {
    const currentLocation = store.getState().location
    switch (direction) {
      case 'right':
        return { isHorizontal: true, targetPos: currentLocation.posX + steps }
      case 'left':
        return { isHorizontal: true, targetPos: currentLocation.posX - steps }
      case 'up':
        return { isHorizontal: false, targetPos: currentLocation.posY - steps }
      case 'down':
        return { isHorizontal: false, targetPos: currentLocation.posY + steps }
    }
  }
  let sequence: Move[] = rawSequence as Move[]
  if (sequence.constructor !== Array) sequence = [rawSequence as Move]
  return new Promise(resolve => {
    async.series(sequence.map(theMove => (
      next => gotoLocation(calculateTargetPath(theMove.steps, theMove.direction, store), store, next)
    )), resolve)
  })
}

/**
 * !! Coordinates differ from setup to setup.
 * Horrible hack, as the surf window is not accessible with the keyboard, and moves vertically every time.
 */
export const surf = (direction: 'w' | 'a' | 's' | 'd' = null) => {
  const moveMouseSurfButton = (tryY = 470) => {
    Robot.moveMouse(354, tryY)
    let rgb = color(`#${Robot.getPixelColor(354, tryY)}`).rgb()
    let greeness = rgb.g / (rgb.g + rgb.b + rgb.r) || 0
    if (greeness < 0.6) return moveMouseSurfButton(tryY - 1)
  }
  return new Promise(resolve => {
    // Chaning direction tap can be ignored because of previous keytoggle
    setTimeout(() => {
      if (direction) Robot.keyTap(direction)
      Robot.keyTap('space')
      moveMouseSurfButton()
      Robot.mouseClick()
      resolve()
    }, direction ? 1000 : 0)
  })
}

export const reverseSequence = (sequence: Move[], options: { entersMap?: boolean } = {}): Move[] => {
  const reverseDirection = (direction): 'right' | 'left' | 'up' | 'down' => {
    switch (direction) {
      case 'up': return 'down'
      case 'down': return 'up'
      case 'left': return 'right'
      case 'right': return 'left'
    }
  }
  let reversedSequence = sequence
    .reverse()
    .map(theMove => ({ steps: theMove.steps, direction: reverseDirection(theMove.direction) }))
  if (options.entersMap) reversedSequence[0].steps --
  return reversedSequence
}

export const mapTransition = (mapName: string, store: Store<State>) => {
  const isLoaded = (done) => {
    setTimeout(() => {
      if (store.getState().location.map === mapName) return setTimeout(done, 1000)
      isLoaded(done)
    }, 100)
  }
  return new Promise(resolve => isLoaded(resolve))
}

