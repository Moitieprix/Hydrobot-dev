'use strict'

const Command = require('../../../core/Command.js')

module.exports = class Autorole extends Command {
  constructor (client) {
    super(client, {
      name: 'autorole',
      usage: (language, prefix) => language.get('AUTOROLE_USAGE', prefix),
      enabled: true,
      category: (language) => language.get('UTILS').GUILDADMIN_CATEGORIE,
      aliases: [],
      permission: ['ADMINISTRATOR'],
      botpermissions: ['EMBED_LINKS', 'MANAGE_MESSAGES'],
      examples: (language, prefix) => language.get('AUTOROLE_EXEMPLE', prefix),
      owner: false,
      cooldown: 5,
      nsfw: false,
      plugin: false
    })
  }

  run (message, args) {

  }
}
