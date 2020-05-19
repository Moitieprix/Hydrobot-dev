'use strict'

const Command = require('../../../core/Command.js')

module.exports = class Language extends Command {
  constructor (client) {
    super(client, {
      name: 'language',
      cooldown: 5,
      enabled: false,
      aliases: ['lang', 'setlanguage', 'setlang'],
      permission: ['ADMINISTRATOR'],
      botpermissions: ['EMBED_LINKS'],
      usage: (language, prefix) => language.get('LANGUAGE_USAGE', prefix),
      category: (language) => language.get('UTILS').GUILDADMIN_CATEGORY,
      examples: (language, prefix) => language.get('LANGUAGE_EXAMPLE', prefix)
    })
  }

  run (message, args) {
    return message.channel.send('[PROCHAINEMENT]')
  }
}
