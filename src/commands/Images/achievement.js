'use strict'

const Command = require('../../../core/Command.js')

module.exports = class Achievement extends Command {
  constructor (client) {
    super(client, {
      name: 'achievement',
      cooldown: 5,
      plugin: 'images',
      botpermissions: ['ATTACH_FILES'],
      usage: (language, prefix) => language.get('ACHIEVEMENT_USAGE', prefix),
      category: (language) => language.get('UTILS').IMAGE_CATEGORY,
      examples: (language, prefix) => language.get('ACHIEVEMENT_EXAMPLE', prefix)
    })
  }

  run (message, args) {
    const number = this.client.functions.getRandomInt(1, 39)

    if (!args[0]) return message.channel.send(message.language.get('ACHIEVEMENT')[0])

    if (args.join(' ').length > 24) return message.channel.send(message.language.get('ACHIEVEMENT')[1])

    const text = encodeURIComponent(args.join(' ')).replace('%20', '+')

    return message.channel.send({
      files: [{
        name: 'achievement.png',
        attachment: `https://minecraftskinstealer.com/achievement/${number}/Achievement+Get%21/${text}`
      }]

    })
  }
}
