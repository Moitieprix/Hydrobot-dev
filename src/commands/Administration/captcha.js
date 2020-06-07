'use strict'

const { MessageEmbed } = require('discord.js')
const Command = require('../../../core/Command.js')

module.exports = class Captcha extends Command {
  constructor (client) {
    super(client, {
      name: 'badwords',
      cooldown: 5,
      permission: ['ADMINISTRATOR'],
      botpermissions: ['EMBED_LINKS', 'MANAGE_MESSAGES'],
      usage: (language, prefix) => language.get('BADWORDS_USAGE', prefix),
      category: (language) => language.get('UTILS').GUILDADMIN_CATEGORY,
      examples: (language, prefix) => language.get('BADWORDS_EXAMPLE', prefix)
    })
  }

  async run (message, args, res) {
    const data = res.rows[0].captcha[0]

    switch (args[0]) {
      case 'set-channel':
        break

      case 'add-role':
        break

      case 'remove-role':
        break

      case 'set-time':
        break

      case 'set-attempts':
        break
    }
  }
}
