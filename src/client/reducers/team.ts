import { Reducer } from 'redux'
import { UpdateTeamAction } from '../actions/team'

export interface PokemonMove {
  id: number
  maxPp: number
  currentPp: number
  index: number
}

export interface PokemonStats {
  attack: number
  defence: number
  speed: number
  specialAttack: number
  specialDefense: number
}

export interface Pokemon {
  uid: number
  id: number
  maxHealth: number
  currentHealth: number
  moves: PokemonMove[]
  experience: {
    currentLevel: number
    baseExperience: number
    totalLevelExperience: number
  },
  isShiny: boolean
  status: string
  gender: string
  originalTrainer: string
  regionId: number
  form: number
  natureId: number
  abilityId: number
  happiness: number
  itemHeld: string
  stats: {
    stats: PokemonStats
    iv: PokemonStats
    ev: PokemonStats
  }
  content?: string[]
}

export type TeamState = Pokemon[]

const initialState: TeamState = []

export const teamReducer: Reducer<TeamState> = (state: TeamState = initialState, action: UpdateTeamAction) => {
  switch (action.type) {
    case 'UPDATE_TEAM': return action.pokemon
    default: return state
  }
}
