'use strict'

const Command = require('../../../core/Command.js')
const { read, MIME_PNG } = require('jimp')

module.exports = class Wasted extends Command {
  constructor (client) {
    super(client, {
      name: 'wasted',
      cooldown: 5,
      plugin: 'images',
      botpermissions: ['ATTACH_FILES'],
      usage: (language, prefix) => language.get('IMAGE_USAGE', prefix, 'wasted'),
      category: (language) => language.get('UTILS').IMAGE_CATEGORY,
      examples: (language, prefix) => language.get('IMAGE_EXAMPLE', prefix, 'wasted')
    })
  }

  async run (message, args) {
    const user = await this.client.functions.userFilter(message, args)

    if (!user) return

    try {
      const avatar = await read(user.displayAvatarURL({ format: 'png', size: 256 }))
      const template = await read('./images/templates/plate_wasted.png')

      template.resize(150, 150)

      avatar.greyscale()
      avatar.gaussian(3)
      avatar.composite(template, 50, 60)

      const buffer = await avatar.getBufferAsync(MIME_PNG)

      message.channel.send({
        files: [{
          name: 'wasted.png',
          attachment: buffer
        }]
      })
    } catch (e) {
      message.channel.send(message.language.get('ERRORS').IMAGE_ERROR(e))
    }
  }
}
