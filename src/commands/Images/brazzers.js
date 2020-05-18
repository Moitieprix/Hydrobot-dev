'use strict'

const Command = require('../../../core/Command.js')
const { read, MIME_PNG } = require('jimp')

module.exports = class Brazzers extends Command {
  constructor (client) {
    super(client, {
      name: 'brazzers',
      cooldown: 5,
      plugin: 'images',
      botpermissions: ['ATTACH_FILES'],
      usage: (language, prefix) => language.get('IMAGE_USAGE', prefix, 'brazzers'),
      category: (language) => language.get('UTILS').IMAGE_CATEGORY,
      examples: (language, prefix) => language.get('IMAGE_EXAMPLE', prefix, 'brazzers')
    })
  }

  async run (message, args) {
    const user = await this.client.functions.userFilter(message, args)

    if (!user) return

    read(user.displayAvatarURL({ format: 'png', size: 256 }), (_err, avatar) => {
      avatar.resize(256, 256)

      read('./images/plate_brazzers.png', (_err, image) => {
        image.resize(100, 50)
        avatar.composite(image, 150, 210)

        avatar.getBuffer(MIME_PNG, (_err, buffer) => {
          return message.channel.send({ files: [{ name: 'brazzers.png', attachment: buffer }] })
        })
      })
    })
  }
}
