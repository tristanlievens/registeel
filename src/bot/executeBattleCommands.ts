import * as robot from 'robotjs'

export const executeAttack = (moveIndex: number, next): void => {
  robot.keyTap('1')
  setTimeout(() => {
    robot.keyTap((moveIndex + 1).toString())
    next()
  }, 1000)
}

export const executeRun = (next) => {
  robot.keyTap('4')
  next()
}