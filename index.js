'use strict'

const { Client } = require('discord.js')
const { readdir, readFileSync } = require('fs')
const { Client: PgClient } = require('pg')
// const { parse } = require('toml')

const { parse } = require('./utils/modules/toml')

class Hydrobot extends Client {
  constructor () {
    super()

    this.commands = {}
    this.aliases = {}

    this.config = parse(readFileSync('./config.toml', 'utf-8'))
    this.logger = require('./utils/logger.js')
    this.functions = require('./utils/function.js')
    this.emote = require('./utils/emotes.js')

    this.database = new PgClient({
      user: this.config.database.user,
      host: this.config.database.host,
      database: this.config.database.database,
      password: this.config.database.password
    })
  }

  loadCommand (commandPath, commandName) {
    try {
      const command = new (require(`${commandPath}/${commandName}`))(this)
      this.commands[command.help.name] = command

      command.conf.location = commandPath

      for (const alias of command.conf.aliases) {
        this.aliases[alias] = command.help.name
      }

      return false
    } catch (e) {
      return `Unable to load command ${commandName}: ${e}`
    }
  }

  unloadCommand (commandPath, commandName) {
    let command

    if (this.commands[commandName]) {
      command = this.commands[commandName]
    } else if (this.aliases[commandName]) {
      command = this.commands[this.aliases[commandName]]
    }

    if (!command) {
      return `\`${commandName}\` command doesn't exist`
    }

    delete require.cache[require.resolve(`${commandPath}/${commandName}.js`)]
    return false
  }
}

const client = new Hydrobot({
  disableMentions: 'everyone',
  partials: ['MESSAGE', 'GUILD_MEMBER', 'USER'],
  ws: {
    intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_BANS', 'GUILD_EMOJIS', 'GUILD_INVITES', 'GUILD_VOICE_STATES', 'GUILD_PRESENCES', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'DIRECT_MESSAGES']
  }
})

const init = async () => {
  readdir('./src/commands', (err, files) => {
    if (err) {
      return client.logger.error(err)
    }

    client.logger.info(`${files.length} folders loaded`)

    for (const path of files) {
      client.logger.info(`Folder loaded : ${path}`)
      readdir(`./src/commands/${path}/`, (err, commands) => {
        if (err) {
          return client.logger.error(err)
        }

        for (const command of commands.filter((file) => file.endsWith('.js'))) {
          const response = client.loadCommand(`./src/commands/${path}`, command)

          if (response) {
            client.logger.error(response)
          }
        }
      })
    }
  })

  readdir('./src/events/', async (err, files) => {
    if (err) {
      return client.logger.error(err)
    }

    client.logger.info(`${files.length} events loaded`)

    for (const events of files.filter(file => file.endsWith('.js'))) {
      const event = require(`./src/events/${events}`)

      client.on(events.split('.')[0], event.bind(null, client))
      delete require.cache[require.resolve(`./src/events/${events}`)]
    }
  })

  client.database.connect()
    .then(() => client.logger.database('Connected to the PostgreSQL database'))
    .catch((err) => client.logger.error(`An error occured on PostgreSQL database : ${err}`))

  return client.login(client.config.token)
}

// client.on('error', error => client.logger.error(error.stack))
// client.on('warn', warn => client.logger.warn(warn))

// process.on('unhandledRejection', rejection => client.logger.error(rejection))

init()
  .then(() => client.logger.info('Connected to the websocket'))
  .catch((err) => client.logger.error(`An error occured on websocket : ${err}`))
