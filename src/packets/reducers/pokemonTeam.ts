import { Action, Reducer } from 'redux'
import { LoadTeamAction, UpdateBattleAction} from '../actions'
import * as _ from 'lodash'

const initialState: PokemonTeamState = []

const pokemonTeam: Reducer<PokemonTeamState> = (state: PokemonTeamState = initialState, action: Action): PokemonTeamState => {
  switch (action.type) {
    case 'LOAD_TEAM':
      return (action as LoadTeamAction).pokemon
    case 'UPDATE_BATTLE':
      return state.map((pokemon, index) => {
        let theAction = <UpdateBattleAction>action
        if (index !== theAction.selectedPokemonIndex) return pokemon
        return _.assign<{}, Pokemon>({}, pokemon, {
          moves: pokemon.moves.map((move, index) => (
          _.assign<{}, PokemonMove>({}, move, { currentPp: theAction.pp[index] })
          )),
          status: theAction.newOwnStats.status,
          currentHealth: theAction.newOwnStats.currentHealth,
          maxHealth: theAction.newOwnStats.maxHealth,
        })
      })
    default:
      return state
  }
}

export default pokemonTeam
