const Command = require('../../../core/Command.js')

class Language extends Command {
  constructor (client) {
    super(client, {
      name: 'language',
      usage: 'language <langue / reset>',
      enabled: true,
      category: (language) => language.get('UTILS').GUILDADMIN_CATEGORIE,
      aliases: [],
      permission: ['ADMINISTRATOR'],
      botpermissions: ['EMBED_LINKS'],
      examples: 'h!language fr \nh!language reset',
      owner: false,
      nsfw: false,
      plugin: false
    })
  }

  run (message, args) {
    return message.channel.send('[PROCHAINEMENT]')
  }
}

module.exports = Language
