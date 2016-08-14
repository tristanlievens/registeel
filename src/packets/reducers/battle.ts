import { Action, Reducer } from 'redux'
import { LoadBattleAction, UpdateBattleAction } from '../actions'
import * as _ from 'lodash'

const initialState: BattleState = {
  isBattling: false,
}

const battle: Reducer<BattleState> = (state: BattleState = initialState, action: Action): BattleState => {
  switch (action.type) {
    case 'LOAD_BATTLE':
      return _.assign<{}, BattleState>(
        { isBattling: true },
        _.pick(action as LoadBattleAction, 'oppPokemonCount', 'oppPokemon', 'selectedPokemonIndex')
      )
    case 'UPDATE_BATTLE':
      if ((action as UpdateBattleAction).isFinished) return { isBattling: false }
      return _.assign<{}, BattleState>({}, state,
        {
          oppPokemon: _.assign<{}, OppPokemonProperties>(
            {},
            state.oppPokemon,
            (action as UpdateBattleAction).newOppPokemon
          ),
        }
      )
    default:
      return state
  }
}

export default battle