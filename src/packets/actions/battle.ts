interface pokemonProperties {
  id: number
  level: number
  maxHealth: number
  currentHealth?: number
  status: string
  gender: string
  isAlreadyCaught: boolean
  alternateForm: string
  isShiny?: boolean
  isWild?: boolean
}

interface loadBattleAction {
  type: string
  oppTrainerName: string
  oppPokemonCount: number
  opponentPokemon: pokemonProperties
  selectedPokemonIndex: number
}

export const loadBattle = (content: string[]): loadBattleAction => (
  {
    type: 'LOAD_BATTLE',
    oppTrainerName: content[6],
    oppPokemonCount: content[8].length === 0 ? 1 : parseInt(content[8]),
    opponentPokemon: {
      id: parseInt(content[0]),
      level: parseInt(content[1]),
      maxHealth: parseInt(content[2]),
      status: content[9],
      gender: content[10],
      isAlreadyCaught: content[11] === "1",
      alternateForm: content[12],
      isShiny: content[5] === "1",
      isWild: content[6].length === 0 && content[8].length === 0,
    },
    selectedPokemonIndex: parseInt(content[3]) - 1, // 0 to 3
  }
)

interface battleStats {
  status: string
}

interface updateBattleAction {
  type: string,
  oppPokemon: battleStats,
  ownPokemon: battleStats,
  pp: {},
  isFinished: boolean,
  selectedPokemonIndex?: number,
  opponentPokemon?: pokemonProperties,
}

export const updateBattleActions = (content: string[]): updateBattleAction => {
  const battleMessages = content[4].split('\r\n')
  return battleMessages.reduce((action, message) => {
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
  },
  <updateBattleAction>{
    type: 'LOAD_BATTLE_ACTIONS',
    oppPokemon: {},
    ownPokemon: {},
    pp: {},
    isFinished: false,
  })
}

const handleDamage = (props: string[], action: updateBattleAction): updateBattleAction => {
  let stats = {
    currentHealth: parseInt(props[2]),
    maxHealth: parseInt(props[3]),
    status: props[6],
  }
  if (props[1] === 'Enemy') {
    Object.assign({}, action.oppPokemon, stats)
  } else {  // props[1] === Playername
    Object.assign({}, action.ownPokemon, stats)
  }
  return action
}

const handleStatus = (props: string[], action: updateBattleAction): updateBattleAction => {
  if (props[1] === 'Enemy') {
    action.oppPokemon.status = props[2]
  } else { // props[1] === Playername
    action.ownPokemon.status = props[2]
  }
  return action
}

const handlePp = (props: string[], action: updateBattleAction): updateBattleAction => {
  if (props[2] === "0") return action
  action.pp[parseInt(props[2])] = props.slice(3,7).map(pp => parseInt(pp))
  return action
}

const handleSwitch = (props: string[], action: updateBattleAction): updateBattleAction => {
  console.log("Switcharoo", props)
  if (props[1] === "Enemy") { // Enemy changes pokemon
    action.opponentPokemon = {
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
