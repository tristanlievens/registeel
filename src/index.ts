require('dotenv').config()
import "source-map-support/register"
import { start } from './client'
import { startBot, onlyLogin } from './bot'
const theArguments = process.argv.slice(2)

start()
// .then(startBot)
.then(onlyLogin)
.then(() => console.log('done!'))
.catch(err => console.log("something bad errored", err))

