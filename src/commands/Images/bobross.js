'use strict'

const Command = require('../../../core/Command.js')
const { read, MIME_PNG, BLEND_DESTINATION_OVER } = require('jimp')

module.exports = class Bobross extends Command {
  constructor (client) {
    super(client, {
      name: 'bobross',
      cooldown: 5,
      plugin: 'images',
      botpermissions: ['ATTACH_FILES'],
      usage: (language, prefix) => language.get('IMAGE_USAGE', prefix, 'bobross'),
      category: (language) => language.get('UTILS').IMAGE_CATEGORY,
      examples: (language, prefix) => language.get('IMAGE_EXAMPLE', prefix, 'bobross')
    })
  }

  async run (message, args) {
    const user = await this.client.functions.userFilter(message, args)

    if (!user) return

    try {
      const template = await read('./images/bobross.png')
      const avatar = await read(user.displayAvatarURL({ format: 'png', size: 256 }))

      template.resize(256, 280)
      avatar.resize(173, 173)
      template.composite(avatar, 15, 12, { mode: BLEND_DESTINATION_OVER })

      const buffer = await template.getAsyncBuffer(MIME_PNG)

      message.channel.send({
        files: [{
          name: 'bobross.png',
          attachment: buffer
        }]
      })
    } catch (e) {
      message.channel.send(message.language.get('ERRORS').IMAGE_ERROR(e))
    }
  }
}
