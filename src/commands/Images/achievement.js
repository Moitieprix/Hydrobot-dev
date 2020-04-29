'use strict'

const Command = require('../../../core/Command.js')

module.exports = class Achievement extends Command {
  constructor (client) {
    super(client, {
      name: 'achievement',
      cooldown: 5,
      enabled: true,
      owner: false,
      nsfw: false,
      plugin: 'image',
      aliases: [],
      permission: [],
      botpermissions: ['ATTACH_FILES'],
      description: (language) => language.get('ACHIEVEMENT_DESC'),
      usage: (language, prefix) => language.get('ACHIEVEMENT_USAGE', prefix),
      category: (language) => language.get('UTILS').IMAGE_CATEGORIE,
      examples: (language, prefix) => language.get('ACHIEVEMENT_EXEMPLE', prefix)
    })
  }

  run (message, args) {
    const number = this.client.functions.getRandomInt(1, 39)

    if (!args[0]) return message.channel.send(message.language.get('ACHIEVEMENT_ARGS'))

    if (args.join(' ').length > 24) return message.channel.send(message.language.get('ACHIEVEMENT_LENGTH'))

    const text = encodeURIComponent(args.join(' ')).replace('%20', '+')

    return message.channel.send({
      files: [{
        name: 'achievement.png',
        attachment: `https://minecraftskinstealer.com/achievement/${number}/Achievement+Get%21/${text}`
      }]

    })
  }
}
