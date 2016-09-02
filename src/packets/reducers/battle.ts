import { Action, Reducer } from 'redux'
import * as _ from 'lodash'
import { LoadBattleAction, UpdateBattleAction } from '../actions'
import { BattleState, OppPokemonProperties } from '../../stateDeclarations'

const initialState: BattleState = {
  isBattling: false,
}

const battle: Reducer<BattleState> = (state: BattleState = initialState, action: LoadBattleAction | UpdateBattleAction): BattleState => {
  switch (action.type) {
    case 'LOAD_BATTLE':
      return _.assign<{}, BattleState>(
        { isBattling: true },
        _.pick(action, 'oppPokemonCount', 'oppPokemon', 'selectedPokemonIndex')
      )
    case 'UPDATE_BATTLE':
      if ((action as UpdateBattleAction).isFinished) return { isBattling: false }
      return _.assign<{}, BattleState>({}, state,
        {
          oppPokemon: _.assign<{}, OppPokemonProperties>(
            {},
            state.oppPokemon,
            action.newOppPokemon
          ),
        }
      )
    default:
      return state
  }
}

export default battle
