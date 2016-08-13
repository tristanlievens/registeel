import { Action, Reducer } from 'redux'
import { PokemonTeamState } from '../../../index.d.ts'
import { LoadTeamAction } from '../actions'

const initialState:PokemonTeamState = []

const pokemonTeam:Reducer<PokemonTeamState> =
      (state: PokemonTeamState = initialState, action: Action): PokemonTeamState => {
  console.log(action)
  switch(action.type) {
    case 'LOAD_TEAM':
      return (action as LoadTeamAction).pokemon
    default:
      return state
  }
}

export default pokemonTeam
