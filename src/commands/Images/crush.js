'use strict'

const Command = require('../../classes/Command')
const { read, MIME_PNG, BLEND_DESTINATION_OVER } = require('jimp')

module.exports = class Crush extends Command {
  constructor (client) {
    super(client, {
      name: 'crush',
      cooldown: 5,
      plugin: 'images',
      botpermissions: ['ATTACH_FILES'],
      usage: (language, prefix) => language.get('IMAGE_USAGE', prefix, 'crush'),
      category: (language) => language.get('UTILS').IMAGE_CATEGORY,
      examples: (language, prefix) => language.get('IMAGE_EXAMPLE', prefix, 'crush')
    })
  }

  async run (message, args) {
    if (!args[0]) {
      message.channel.send(message.language.get('CRUSH_ARGS'))
      return
    }

    const user = await this.client.functions.userFilter(message, args)

    if (!user) {
      return
    }

    try {
      const mask = await read('./images/templates/mask.png')
      const avatarAuthor = await read(message.author.displayAvatarURL({ format: 'png', size: 256 }))
      const avatarMentionned = await read(user.displayAvatarURL({ format: 'png', size: 256 }))
      const template = await read('./images/templates/plate_crush.png')

      avatarAuthor.resize(50, 50)
      avatarMentionned.resize(165, 165)
      template.resize(256, 370)
      mask.resize(50, 50)

      avatarMentionned.rotate(8)
      template.composite(avatarMentionned, 60, 180, { mode: BLEND_DESTINATION_OVER })
      avatarAuthor.mask(mask)
      template.composite(avatarAuthor, 175, 22)

      const buffer = await template.getBufferAsync(MIME_PNG)

      message.channel.send({
        files: [{
          name: 'crush.png',
          attachment: buffer
        }]
      })
    } catch (e) {
      message.channel.send(message.language.get('ERRORS').IMAGE_ERROR(e))
    }
  }
}
