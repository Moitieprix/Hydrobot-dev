'use strict'

const Command = require('../../../core/Command.js')
const { read, MIME_PNG } = require('jimp')

module.exports = class Blur extends Command {
  constructor (client) {
    super(client, {
      name: 'blur',
      cooldown: 5,
      plugin: 'images',
      botpermissions: ['ATTACH_FILES'],
      usage: (language, prefix) => language.get('IMAGE_USAGE', prefix, 'blur'),
      category: (language) => language.get('UTILS').IMAGE_CATEGORY,
      examples: (language, prefix) => language.get('IMAGE_EXAMPLE', prefix, 'blur')
    })
  }

  async run (message, args) {
    const user = await this.client.functions.userFilter(message, args)

    if (!user) return

    read(user.displayAvatarURL({ format: 'png', size: 256 }), (_err, avatar) => {
      avatar.resize(256, 256)
      avatar.blur(5)

      avatar.getBuffer(MIME_PNG, (_err, buffer) => {
        return message.channel.send({ files: [{ name: 'blur.png', attachment: buffer }] })
      })
    })
  }
}
