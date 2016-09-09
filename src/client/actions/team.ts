import { Pokemon } from '../reducers/team'

export interface UpdateTeamAction {
  type: 'UPDATE_TEAM'
  pokemon: Pokemon[]
}

export const handleUpdateTeam = (rawPacket: string): UpdateTeamAction => {
  const teamData = rawPacket.split('\r\n').slice(0, -1)
  const pokemon = teamData.map<Pokemon>((pokemonDataString) => {
    const data = pokemonDataString.split('|')
    return {
      uid: parseInt(data[0]),
      id: parseInt(data[1]),
      maxHealth: parseInt(data[5]),
      currentHealth: parseInt(data[6]),
      isShiny: (data[20] == "1"),
      status: data[21],
      gender: data[22],
      originalTrainer: data[29],
      regionId: parseInt(data[47]),
      form: parseInt(data[48]),
      natureId: parseInt(data[36]),
      abilityId: parseInt(data[38]),
      happiness: parseInt(data[37]),
      itemHeld: data[40],
      moves: [
        { index: 1, id: parseInt(data[7]), maxPp: parseInt(data[11]), currentPp: parseInt(data[15]) },
        { index: 2, id: parseInt(data[8]), maxPp: parseInt(data[12]), currentPp: parseInt(data[16]) },
        { index: 3, id: parseInt(data[9]), maxPp: parseInt(data[13]), currentPp: parseInt(data[17]) },
        { index: 4, id: parseInt(data[10]), maxPp: parseInt(data[14]), currentPp: parseInt(data[18]) },
      ],
      experience: {
        currentLevel: parseInt(data[3]),
        baseExperience: parseInt(data[28]),
        totalLevelExperience: parseInt(data[19]),
      },
      stats: {
        stats: { attack: parseInt(data[23]), defence: parseInt(data[24]), speed: parseInt(data[25]), specialAttack: parseInt(data[26]), specialDefense: parseInt(data[27]) },
        iv: { attack: parseInt(data[30]), defence: parseInt(data[31]), speed: parseInt(data[32]), specialAttack: parseInt(data[33]), specialDefense: parseInt(data[34]) },
        ev: { attack: parseInt(data[41]), defence: parseInt(data[42]), speed: parseInt(data[43]), specialAttack: parseInt(data[44]), specialDefense: parseInt(data[45]) },
      },
    }
  })
  return {
    type: 'UPDATE_TEAM',
    pokemon
  }
}
