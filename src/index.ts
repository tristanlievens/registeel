require('dotenv').config()
import { start } from './client'
import { startBot } from './bot'

const theArguments = process.argv.slice(2)

start().then(startBot).catch(err => console.log("something bad errored", err))

