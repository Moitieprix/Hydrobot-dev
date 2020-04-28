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

    if (args.join(' ').match(new RegExp(/[^a-zA-Z-0-9\s]/))) return message.channel.send(message.language.get('ACHIEVEMENT_ASCII'))

    return message.channel.send({
      files: [{
        name: 'achievement.png',
        attachment: `https://www.minecraftskinstealer.com/achievement/a.php?i=${number}&h=Achievement Get!&t=${args.join(' ')}`
      }]

    })
  }
}
