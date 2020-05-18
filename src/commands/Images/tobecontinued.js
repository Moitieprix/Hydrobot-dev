'use strict'

const Command = require('../../../core/Command.js')
const { read, MIME_PNG } = require('jimp')

module.exports = class Tobecontinued extends Command {
  constructor (client) {
    super(client, {
      name: 'tobecontinued',
      cooldown: 5,
      plugin: 'images',
      botpermissions: ['ATTACH_FILES'],
      usage: (language, prefix) => language.get('IMAGE_USAGE', prefix, 'tobecontinued'),
      category: (language) => language.get('UTILS').IMAGE_CATEGORY,
      examples: (language, prefix) => language.get('IMAGE_EXAMPLE', prefix, 'tobecontinued')
    })
  }

  async run (message, args) {
    const user = await this.client.functions.userFilter(message, args)

    if (!user) return

    read(user.displayAvatarURL({ format: 'png', size: 256 }), (_err, avatar) => {
      avatar.resize(256, 256)
      avatar.sepia()

      read('./images/tobecontinued.png', (_err, image) => {
        image.resize(160, 130)
        avatar.composite(image, 90, 155)

        avatar.getBuffer(MIME_PNG, (_err, buffer) => {
          return message.channel.send({ files: [{ name: 'tobecontinued.png', attachment: buffer }] })
        })
      })
    })
  }
}
