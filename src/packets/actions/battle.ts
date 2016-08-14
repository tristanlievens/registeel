import { Action } from 'redux'
import * as _ from 'lodash'

export interface LoadBattleAction extends Action {
  oppTrainerName: string
  oppPokemonCount: number
  oppPokemon: OppPokemonProperties
  selectedPokemonIndex: number
  content?: string[]
}

// Not sure about status and isWild
export const loadBattle = (content: string[]): LoadBattleAction => (
  {
    type: 'LOAD_BATTLE',
    oppTrainerName: content[6],
    oppPokemonCount: content[8].length === 0 ? 1 : parseInt(content[8]),
    oppPokemon: {
      id: parseInt(content[0]),
      maxHealth: parseInt(content[1]),
      currentHealth: parseInt(content[1]),
      level: parseInt(content[2]),
      status: content[10],
      gender: content[9],
      isAlreadyCaught: content[11] === "1",
      alternateForm: content[12],
      isShiny: content[5] === "1",
      isWild: content[6].length === 0 && content[8].length === 0,
    },
    selectedPokemonIndex: parseInt(content[3]) - 1,
    content: content
  }
)

interface UpdatedStats {
  status: string
  currentHealth: number
  maxHealth: number
}

export interface UpdateBattleAction extends Action {
  newOppPokemon?: OppPokemonProperties
  newOppStats: UpdatedStats
  newOwnStats: UpdatedStats
  pp: number[]
  isFinished: boolean
  selectedPokemonIndex: number,
  content: string[]
}

export const updateBattleActions = (content: string[]): UpdateBattleAction => {
  const battleMessages = content[4].split('\r\n')
  const initialUpdateBattleAction =
    <UpdateBattleAction>{
      type: 'UPDATE_BATTLE',
      newOppStats: {},
      newOwnStats: {},
      pp: {},
      isFinished: false,
      content: content
    }
  return battleMessages.reduce(updateActionWithMessage, initialUpdateBattleAction)
}

const updateActionWithMessage = (action: UpdateBattleAction, message: string) => {
  if (message === 'E-B') {
    action.isFinished = true
    return action
  }
  let props = message.split(':')
  switch (props[0]) {
    case 'D':
      return handleDamage(props, action)
    case 'S':
      return handleStatus(props, action)
    case 'P':
      return handlePp(props, action)
    case 'C':
      return handleSwitch(props, action)
  }
  return action
}

const handleDamage = (props: string[], action: UpdateBattleAction): UpdateBattleAction => {
  let stats: UpdatedStats = {
    currentHealth: parseInt(props[2]),
    maxHealth: parseInt(props[3]),
    status: props[6],
  }
  if (props[1] === 'Enemy' || props[1] === '') {
    action.newOppStats = _.assign<{}, UpdatedStats>({}, action.newOppStats, stats)
  } else {  // props[1] === Playername
    action.newOwnStats = _.assign<{}, UpdatedStats>({}, action.newOwnStats, stats)
  }
  return action
}

const handleStatus = (props: string[], action: UpdateBattleAction): UpdateBattleAction => {
  if (props[1] === 'Enemy') {
    action.newOppStats.status = props[2]
  } else { // props[1] === Playername
    action.newOwnStats.status = props[2]
  }
  return action
}

const handlePp = (props: string[], action: UpdateBattleAction): UpdateBattleAction => {
  if (props[2] === "0") return action
  action.selectedPokemonIndex = parseInt(props[2]) - 1
  action.pp = props.slice(3, 7).map(pp => parseInt(pp))
  return action
}

const handleSwitch = (props: string[], action: UpdateBattleAction): UpdateBattleAction => {
  console.log("Switcharoo", props)
  if (props[1] === "Enemy") { // Enemy changes pokemon
    action.newOppPokemon = {
      id: parseInt(props[2]),
      level: parseInt(props[3]),
      maxHealth: parseInt(props[5]),
      currentHealth: parseInt(props[6]),
      status: props[8],
      gender: props[9],
      isAlreadyCaught: props[10] === '1',
      alternateForm: props[11],
      isShiny: props[4] === '1',
    }
  } else { // User changes pokemon
    action.selectedPokemonIndex = parseInt(props[7]) - 1
  }
  return action
}
