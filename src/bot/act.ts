import { Store } from 'redux'
import { State } from '../stateDeclarations'
import handleBattle from './handleBattle'

const act = (store: Store<State>): void => {
  if (!store.getState().status.isWaiting) return 
  const next = () => store.dispatch({ type: 'TOGGLE_WAITING', isWaiting: true })
  store.dispatch({ type: 'TOGGLE_WAITING', isWaiting: false })
  handleState(store.getState(), next)
}

export default act

const handleState = (state: State, next): void => {
  if (state.battle.isBattling) return handleBattle(state, next)
}