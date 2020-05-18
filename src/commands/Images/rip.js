'use strict'

const Command = require('../../../core/Command.js')
const { read, MIME_PNG, BLEND_DESTINATION_OVER } = require('jimp')

module.exports = class Rip extends Command {
  constructor (client) {
    super(client, {
      name: 'rip',
      cooldown: 5,
      plugin: 'images',
      botpermissions: ['ATTACH_FILES'],
      usage: (language, prefix) => language.get('IMAGE_USAGE', prefix, 'rip'),
      category: (language) => language.get('UTILS').IMAGE_CATEGORY,
      examples: (language, prefix) => language.get('IMAGE_EXAMPLE', prefix, 'rip')
    })
  }

  async run (message, args) {
    const user = await this.client.functions.userFilter(message, args)

    if (!user) return

    read('./images/plate_rip.png', (_err, image) => {
      image.resize(400, 256)

      read(user.displayAvatarURL({ format: 'png', size: 256 }), (_err, avatar) => {
        avatar.resize(60, 60)
        avatar.rotate(3)
        image.composite(avatar, 55, 25, { mode: BLEND_DESTINATION_OVER })

        image.getBuffer(MIME_PNG, (_err, buffer) => {
          return message.channel.send({ files: [{ name: 'rip.png', attachment: buffer }] })
        })
      })
    })
  }
}
