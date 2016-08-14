import { findProMove, Move as MoveInfo } from 'unown'
import * as _ from 'lodash'
import { State, PokemonMove } from '../stateDeclarations'
import { executeAttack, executeRun } from './executeBattleCommands'

const handleBattle = (state: State, next): void => {
  defaultAttack(state, next)
}

export default handleBattle

const defaultAttack = (state: State, next): void => {
  const ownPokemon = state.pokemonTeam[state.battle.selectedPokemonIndex]
  const availableMoves: { index: number, data: MoveInfo }[] =
    ownPokemon.moves
      .filter(move => move.currentPp > 0)
      .map(move => ({ index: move.index, data: findProMove(move.id) }))
  if (availableMoves.length === 0) return executeRun(next)
  const chosenMove = availableMoves.sort((moveA, moveB) => {
    if (moveA.data.accuracy !== moveB.data.accuracy) return moveB.data.accuracy - moveA.data.accuracy
    return moveB.data.power - moveA.data.power
  })[0]
  executeAttack(chosenMove.index, next)
}
