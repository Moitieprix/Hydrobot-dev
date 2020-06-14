'use strict'

const Command = require('../../../core/Command.js')
const { read, MIME_PNG } = require('jimp')

module.exports = class Distracted extends Command {
  constructor (client) {
    super(client, {
      name: 'distracted',
      cooldown: 5,
      plugin: 'images',
      botpermissions: ['ATTACH_FILES'],
      usage: (language, prefix) => language.get('IMAGE_USAGE', prefix, 'distracted'),
      category: (language) => language.get('UTILS').IMAGE_CATEGORY,
      examples: (language, prefix) => language.get('IMAGE_EXAMPLE', prefix, 'distracted')
    })
  }

  async run (message, args) {
    if (!args[0]) {
      message.channel.send(message.language.get('DISTRACTED_ARGS'))
      return
    }

    const user = await this.client.functions.userFilter(message, args)

    if (!user) return

    try {
      const mask = await read('./images/templates/mask.png')
      const avatarAuthor = await read(message.author.displayAvatarURL({ format: 'png', size: 256 }))
      const avatarMentionned = await read(user.displayAvatarURL({ format: 'png', size: 256 }))
      const template = await read('./images/templates/plate_checkout.png')

      template.resize(370, 256)
      avatarAuthor.resize(60, 60)
      avatarMentionned.resize(85, 85)

      mask.resize(60, 60)
      avatarAuthor.mask(mask)
      template.composite(avatarAuthor, 180, 35)

      mask.resize(85, 85)
      avatarMentionned.mask(mask)
      template.composite(avatarMentionned, 70, 50)

      const buffer = await template.getBufferAsync(MIME_PNG)

      message.channel.send({
        files: [{
          name: 'distracted.png',
          attachment: buffer
        }]
      })
    } catch (e) {
      message.channel.send(message.language.get('ERRORS').IMAGE_ERROR(e))
    }
  }
}
