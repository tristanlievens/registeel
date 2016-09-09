<img src="http://cdn.bulbagarden.net/upload/thumb/2/22/379Registeel.png/250px-379Registeel.png" align="right" />
# Registeel
The crossplatform Pokemon Revolution Bot, inspired by [Proshine](https://github.com/Silv3rPRO/proshine).

## Build and use

1. Clone the project
2. Add your username and password to a `.env` file in the project's root:

```javascript
// .env
PRO_USERNAME=theUsername
PRO_PASSWORD=thePassword
```

3. Build the project: `npm install --production`. This will also run the prepublish hook install the typigns and the building the code
4. Run Registeel with `npm start`.

## Collaboration
if using linux you may need to run `sudo apt-get install libpcap0.8-dev` if you're getting a build error

## MVP checklist

- [x] location
  - [x] design location state 
  - [x] handle location syncs
- [ ] pokemon team (hector wip)
  - [ ] design team state 
  - [ ] handle initial load 
  - [ ] handle updates to team (eg. during battle)
- [ ] battle  
  - [ ] design state 
  - [ ] handle updates
- [ ] inventory 
  - [ ] state 
  - [ ] load (and updates?)
- [ ] Bot
  - [ ] moving
    - [x] basic commands
    - [ ] add logic to read map to calculate possible movement
  - [ ] battle
- [ ] Map parsing
 - [x] basic map colliders parsing
 - [x] multipacket maps parsing
 - [ ] other prop parsing (doors, ice, etc) 
