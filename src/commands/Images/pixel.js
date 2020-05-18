'use strict'

const Command = require('../../../core/Command.js')
const { read, MIME_PNG } = require('jimp')

module.exports = class Pixel extends Command {
  constructor (client) {
    super(client, {
      name: 'pixel',
      cooldown: 5,
      plugin: 'images',
      botpermissions: ['ATTACH_FILES'],
      usage: (language, prefix) => language.get('IMAGE_USAGE', prefix, 'pixel'),
      category: (language) => language.get('UTILS').IMAGE_CATEGORY,
      examples: (language, prefix) => language.get('IMAGE_EXAMPLE', prefix, 'pixel')
    })
  }

  async run (message, args) {
    const user = await this.client.functions.userFilter(message, args)

    if (!user) return

    read(user.displayAvatarURL({ format: 'png', size: 256 }), (_err, avatar) => {
      avatar.resize(256, 256)
      avatar.pixelate(5)

      avatar.getBuffer(MIME_PNG, (_err, buffer) => {
        return message.channel.send({ files: [{ name: 'pixel.png', attachment: buffer }] })
      })
    })
  }
}
