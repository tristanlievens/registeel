export interface LocationState {
  posX: number
  posY: number
  map: string
}

export type PokemonTeamState = any[]

export interface State {
  location: LocationState
}
