import { Store } from 'redux'
import { State, LocationState } from '../stateDeclarations'
import handleBattle from './handleBattle'
import * as Robot from 'robotjs'
import * as async from 'async'

interface TargetLocation {
  targetPos: number
  isHorizontal: boolean
}

const gotoLocation = (path: TargetLocation, store: Store<State>, done): void => {
  let key
  const startLocation = store.getState().location
  if (path.isHorizontal) key = (path.targetPos < startLocation.posX ? 'a' : 'd')
  else key = (path.targetPos < startLocation.posY ? 'w' : 's')
  Robot.keyToggle(key, 'down')
  const keepMoving = (store: Store<State>): void => {
    setTimeout(() => {
      const state = store.getState()
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

export const move = (steps: number, direction: 'right' | 'left' | 'up' | 'down', store: Store<State>, done) => {
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
  gotoLocation(calculateTargetPath(steps, direction, store), store, done)
}


/**
 * !! Coordinates differ from setup to setup.
 * Horrible hack, as the surf window is not accessible with the keyboard, and moves vertically every time.
 */
export const surf = (done) => {
  const moveMouseSurfButton = (tryY = 470) => {
    Robot.moveMouse(354, tryY)
    if (Robot.getPixelColor(354, tryY) !== '10270d') moveMouseSurfButton(tryY - 1)
  }
  Robot.keyTap('space')
  moveMouseSurfButton()
  Robot.mouseClick()
  done()
}

