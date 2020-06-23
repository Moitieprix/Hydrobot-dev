'use strict'

const Command = require('../../classes/Command')
const { read, MIME_PNG } = require('jimp')

module.exports = class Slap extends Command {
  constructor (client) {
    super(client, {
      name: 'slap',
      cooldown: 5,
      plugin: 'images',
      botpermissions: ['ATTACH_FILES'],
      usage: (language, prefix) => language.get('IMAGE_USAGE', prefix, 'slap'),
      category: (language) => language.get('UTILS').IMAGE_CATEGORY,
      examples: (language, prefix) => language.get('IMAGE_EXAMPLE', prefix, 'slap')
    })
  }

  async run (message, args) {
    if (!args[0]) {
      return message.channel.send(message.language.get('SLAP_ARGS'))
    }

    const user = await this.client.functions.userFilter(message, args)

    if (!user) {
      return
    }

    try {
      const mask = await read('./images/templates/mask.png')
      const avatarAuthor = await read(message.author.displayAvatarURL({ format: 'png', size: 256 }))
      const avatarMentionned = await read(user.displayAvatarURL({ format: 'png', size: 256 }))
      const template = await read('./images/templates/plate_slap.png')

      template.resize(512, 256)
      mask.resize(100, 100)
      avatarAuthor.resize(100, 100)
      avatarMentionned.resize(100, 100)

      avatarAuthor.mask(mask)
      template.composite(avatarAuthor, 205, 35)

      avatarMentionned.mask(mask)
      template.composite(avatarMentionned, 85, 90)

      const buffer = await template.getBufferAsync(MIME_PNG)

      message.channel.send({
        files: [{
          name: 'slap.png',
          attachment: buffer
        }]
      })
    } catch (e) {
      message.channel.send(message.language.get('ERRORS').IMAGE_ERROR(e))
    }
  }
}
