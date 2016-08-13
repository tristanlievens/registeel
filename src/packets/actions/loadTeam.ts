export const loadTeam = (content: string[]): {} => (
  {
    type: 'LOAD_TEAM',
    pokemon: content.map(rawPokemon => loadPokemon(rawPokemon.split('|'))),
  }
)

const loadPokemon = (props: string[]): {} => (
  {
    uid: parseInt(props[0]), // id in the party
    id: parseInt(props[1]),
    maxHealth: parseInt(props[5]),
    currentHealth: parseInt(props[6]),
    moves: [
      { id: parseInt(props[7]), maxPp: parseInt(props[11]), currentPp: parseInt(props[15]) },
      { id: parseInt(props[8]), maxPp: parseInt(props[12]), currentPp: parseInt(props[16]) },
      { id: parseInt(props[9]), maxPp: parseInt(props[13]), currentPp: parseInt(props[17]) },
      { id: parseInt(props[10]), maxPp: parseInt(props[14]), currentPp: parseInt(props[18]) },
    ],
    experience: {
      currentLevel: parseInt(props[3]),
      baseExperience: parseInt(props[28]),
      totalLevelExperience: parseInt(props[19]),
    },
    isShiny: props[20] === '1',
    status: props[21], // eg. 'BPOISON'
    gender: props[22], // eg. 'M'
    originalTrainer: props[29],
    regionId: parseInt(props[47]), // Kanto = 1, Johto = 2, Hoenn = 3
    form: parseInt(props[48]), // 🤔
    natureId: parseInt(props[36]),
    abilityId: parseInt(props[38]),
    happiness: parseInt(props[37]),
    itemHeld: props[40],
    stats:  {
      stats: loadStats(props.slice(23, 28).map(stat => parseInt(stat))),
      iv: loadStats(props.slice(30, 35).map(stat => parseInt(stat))),
      ev: loadStats(props.slice(41, 46).map(stat => parseInt(stat))),
    }
  }
)

const loadStats = (statsArray: number[]):{} => (
  {
    attack: statsArray[0],
    defence: statsArray[1],
    speed: statsArray[2],
    specialAttack: statsArray[3],
    specialDefense: statsArray[4],
  }
)
