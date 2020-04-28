'use strict'

const {Client} = require('discord.js')
const {readdir} = require('fs')
const PostgreSQL = require('pg')

/**
 * @class Hydrobot
 * @extends Client
 */

class Hydrobot extends Client {

  /**
   * @param options - Toutes les options du Client
   */

  constructor (options) {
    super(options)

    if (!options) {
      throw new Error('Options cannot be empty')
    }

    this.database = new PostgreSQL.Client({
      user: 'postgres',
      host: 'localhost',
      database: 'postgres',
      password: '4162'
    })

    this.commands = []
    this.aliases = []

    this.config = require('./config.js')
    this.logger = require('./utils/logger.js')
    this.functions = require('./utils/function.js')
    this.emote = require('./utils/emotes.js')
  }

  /**
   *
   * @param commandPath
   * @param commandName
   * @returns {*}
   */

  loadCommand (commandPath, commandName) {
    try {
      const command = new (require(`${commandPath}/${commandName}`))(this)
      this.commands[command.help.name] = command

      command.conf.location = commandPath

      command.conf.aliases.forEach(alias => {
        this.aliases[alias] = command.help.name
      })
      return false
    } catch (e) {
      return `Unable to load command ${commandName}: ${e}`
    }

  }

  /**
   *
   * @param commandPath
   * @param commandName
   * @returns {*}
   */

  unloadCommand (commandPath, commandName) {
    let command

    if (this.commands[commandName]) {
      command = this.commands[commandName]
    } else if (this.aliases[commandName]) {
      command = this.commands[this.aliases[commandName]]
    }

    if (!command) return `La commande \`${commandName}\` n'existe pas :/`

    delete require.cache[require.resolve(`${commandPath}/${commandName}.js`)]
    return false
  }

}

/**
 *
 * @type {Hydrobot}
 */

const client = new Hydrobot({
  disableMentions: 'everyone',
  messageCacheLifetime: 900,
  messageCacheMaxSize: 300,
  messageSweepInterval: 180,
  partials: ['MESSAGE', 'GUILD_MEMBER', 'USER'],
  //ws: {
  // intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_BANS', 'GUILD_EMOJIS', 'GUILD_INVITES', 'GUILD_VOICE_STATES', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS']
  //}
})

/**
 *
 * @returns {Promise<string>} Token du Hydrobot
 */

const init = async () => {

  readdir('./src/commands', (err, files) => {

    if (err) return client.logger.error(err)
    client.logger.info(`${files.length} folders loaded`)

    files.forEach(async (path) => {
      client.logger.info(`Folder loaded : ${path}`)
      readdir(`./src/commands/${path}/`, (err, commands) => {
        commands.filter((file) => file.endsWith('.js')).forEach((command) => {
          const response = client.loadCommand(`./src/commands/${path}`, command)

          if (response) {
            client.logger.error(response)
          }
        })
      })
    })
  })

  readdir('./src/events/', (err, files) => {

    if (err) return client.logger.error(err)
    client.logger.info(`${files.length} events loaded`)

    files.filter(file => file.endsWith('.js')).forEach(events => {
      const event = require(`./src/events/${events}`)

      client.on(events.split('.')[0], event.bind(null, client))
      delete require.cache[require.resolve(`./src/events/${events}`)]
    })
  })

  client.database.connect()
    .then(() => client.logger.database('Connected to the PostgreSQL database'))
    .catch((err) => client.logger.error(`An error occured in PostgreSQL database : ${err}`))

  return client.login(client.config.token)

}

client.on('error', error => client.logger.error(error))
client.on('warn', warn => client.logger.warn(warn))

process.on('unhandledRejection', rejection => client.logger.error(rejection))

return init()
  .then(() => client.logger.info('Connected to the websocket'))
  .catch((err) => client.logger.error(`An error occured in websocket : ${err}`))

