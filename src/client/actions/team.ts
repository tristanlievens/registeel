import { Pokemon } from '../reducers/team'

export interface UpdateTeamAction {
    type: 'TEAM_UPDATE'
    pokemon: Pokemon[]
}

export const handleUpdateTeam = (rawPacket: string): UpdateTeamAction => {
    const teamData: string[] = rawPacket.split('\r\n')
    const newPokemon: Pokemon[] = []
    for(let i = 0; i < teamData.length; i ++) {
        if(teamData[i] != '') {
            const data: string[] = teamData[i].split('|')
            
            let currentPokemon: Pokemon
            currentPokemon.uid = parseInt(data[0])
            currentPokemon.id = parseInt(data[1])
            currentPokemon.maxHealth = parseInt(data[5])
            currentPokemon.currentHealth = parseInt(data[6])

            currentPokemon.moves[0].index = 1
            currentPokemon.moves[0].id = parseInt(data[7])
            currentPokemon.moves[0].maxPp = parseInt(data[11])
            currentPokemon.moves[0].currentPp = parseInt(data[15])

            currentPokemon.moves[1].index = 2
            currentPokemon.moves[1].id = parseInt(data[8])
            currentPokemon.moves[1].maxPp = parseInt(data[12])
            currentPokemon.moves[1].currentPp = parseInt(data[16])
            
            currentPokemon.moves[2].index = 3
            currentPokemon.moves[2].id = parseInt(data[9])
            currentPokemon.moves[2].maxPp = parseInt(data[13])
            currentPokemon.moves[2].currentPp = parseInt(data[17])
            
            currentPokemon.moves[3].index = 4
            currentPokemon.moves[3].id = parseInt(data[10])
            currentPokemon.moves[3].maxPp = parseInt(data[14])
            currentPokemon.moves[3].currentPp = parseInt(data[18])

            currentPokemon.experience.currentLevel = parseInt(data[3])
            currentPokemon.experience.baseExperience = parseInt(data[28])
            currentPokemon.experience.totalLevelExperience = parseInt(data[19])

            currentPokemon.isShiny = (data[20] == "1")
            currentPokemon.status = data[21]
            currentPokemon.gender = data[22]

            currentPokemon.originalTrainer = data[29]
            currentPokemon.regionId = parseInt(data[47])
            currentPokemon.form = parseInt(data[48])

            currentPokemon.natureId = parseInt(data[36])
            currentPokemon.abilityId = parseInt(data[38])
            currentPokemon.happiness = parseInt(data[37])
            currentPokemon.itemHeld = data[40]

            currentPokemon.stats.stats.attack = parseInt(data[23])
            currentPokemon.stats.stats.defence = parseInt(data[24])
            currentPokemon.stats.stats.speed = parseInt(data[25])
            currentPokemon.stats.stats.specialAttack = parseInt(data[26])
            currentPokemon.stats.stats.specialDefense = parseInt(data[27])
            
            currentPokemon.stats.iv.attack = parseInt(data[30])
            currentPokemon.stats.iv.defence = parseInt(data[31])
            currentPokemon.stats.iv.speed = parseInt(data[32])
            currentPokemon.stats.iv.specialAttack = parseInt(data[33])
            currentPokemon.stats.iv.specialDefense = parseInt(data[34])

            currentPokemon.stats.ev.attack = parseInt(data[41])
            currentPokemon.stats.ev.defence = parseInt(data[42])
            currentPokemon.stats.ev.speed = parseInt(data[43])
            currentPokemon.stats.ev.specialAttack = parseInt(data[44])
            currentPokemon.stats.ev.specialDefense = parseInt(data[45])

            newPokemon[i] = currentPokemon
            console.log(currentPokemon)
        }
    }
    return {
        type: 'TEAM_UPDATE',
        pokemon: newPokemon
    }
}