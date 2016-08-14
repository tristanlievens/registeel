import { Pokemon as DatabasePokemon } from 'unown'

export interface OppPokemonProperties {
  id: number
  level: number
  maxHealth: number
  currentHealth: number
  status: string
  gender: string
  isAlreadyCaught: boolean
  alternateForm: string
  isShiny?: boolean
  isWild?: boolean
}

export interface BattleState {
  isBattling: boolean
  oppPokemonCount?: number
  oppPokemon?: OppPokemonProperties
  selectedPokemonIndex?: number
}

export interface LocationState {
  posX: number
  posY: number
  map: string
  isSurfing: boolean
  isBiking: boolean
}

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

type PokemonTeamState = Pokemon[]

export interface StatusState {
  isAfk: boolean
  isWaiting: boolean // is the bot waiting for a new action
}

export interface State {
  location: LocationState
  battle: BattleState
  pokemonTeam: PokemonTeamState
  status: StatusState
}
