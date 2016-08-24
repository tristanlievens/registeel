import { findProMove, Move as MoveInfo } from 'unown'
import { Store } from 'redux'
import * as _ from 'lodash'
import { State, PokemonMove } from '../stateDeclarations'
import * as robot from 'robotjs'

const handleBattle = (store: Store<State>, done): void => {
  const handleAction = () => {
    if (!store.getState().battle.isBattling) return done()
    defaultAttack(store.getState(), handleAction)
  }
  // handle intro
  setTimeout(handleAction, 5000)
}

export default handleBattle

const defaultAttack = (state: State, done): void => {
  const chosenMove = chooseMove(state)
  if (!chosenMove) return executeRun(done)
  console.log("Trying to execute a attack:", chosenMove.data.identifier);
  executeAttack(chosenMove.index, done)
}

const chooseMove = (state: State): { index: number, data: MoveInfo } => {
  const ownPokemon = state.pokemonTeam[state.battle.selectedPokemonIndex]
  const availableMoves: { index: number, data: MoveInfo }[] =
    ownPokemon.moves
      .filter(move => move.currentPp > 0)
      .map(move => ({ index: move.index, data: findProMove(move.id) }))
  return availableMoves.sort((moveA, moveB) => {
    if (moveA.data.accuracy !== moveB.data.accuracy) return moveB.data.accuracy - moveA.data.accuracy
    return moveA.data.power - moveB.data.power
  })[0]
}

const executeAttack = (moveIndex: number, done): void => {
  robot.keyTap('1')
  setTimeout(() => {
    robot.keyTap((moveIndex + 1).toString())
    setTimeout(done, 5000)
  }, 1000)
}

const executeRun = (done) => {
  robot.keyTap('4')
  setTimeout(done, 3000)
}

const switchPokemon = (newPokemonIndex: number, done) => {
  robot.keyTap('2')
  setTimeout(() => {
    robot.keyTap((newPokemonIndex + 1).toString())
    setTimeout(done, 5000)
  })
}
