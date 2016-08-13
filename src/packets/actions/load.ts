export const loadLocation = (content: string[]): {} => (
  {
    type: 'LOAD_LOCATION',
    map: content[0],
    posX: parseInt(content[1]),
    posY: parseInt(content[2]),
    isSurfing: content[4] === '1',
  }
)

export const syncLocation = (content: string[]): {} => {
  if(content.length === 0 || content[0].length === 0 ) return { type: 'NO_ACTION' }
  return {
    type: 'LOAD_LOCATION',
    map: content[0],
    posX: parseInt(content[1]),
    posY: parseInt(content[2]),
  }
}

export const loadTime = (content: string[]): {} => (
  {
    type: 'LOAD_TIME',
    time: content[0],
    weather: content[1],
  }
)

export const loadInventory = (content: string[]): {} => (
  {
    type: 'LOAD_INVENTORY',
    money: parseInt(content[0]),
    coins: parseInt(content[1]),
    items: content[2].split('\r\n').map(itemString => (
      {
        name: itemString.split('|')[0],
        id: itemString.split('|')[1],
        quantity: itemString.split('|')[2],
        scope: itemString.split('|')[3],
      }
    ))
  }
)
