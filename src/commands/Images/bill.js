'use strict'

const Command = require('../../../core/Command.js')
const { read, MIME_PNG, BLEND_DESTINATION_OVER } = require('jimp')

module.exports = class Bill extends Command {
  constructor (client) {
    super(client, {
      name: 'bill',
      cooldown: 5,
      plugin: 'images',
      botpermissions: ['ATTACH_FILES'],
      usage: (language, prefix) => language.get('IMAGE_USAGE', prefix, 'bill'),
      category: (language) => language.get('UTILS').IMAGE_CATEGORY,
      examples: (language, prefix) => language.get('IMAGE_EXAMPLE', prefix, 'bill')
    })
  }

  async run (message, args) {
    const user = await this.client.functions.userFilter(message, args)

    if (!user) return

    read(user.displayAvatarURL({ format: 'png', size: 256 }), (_err, avatar) => {
      avatar.resize(177, 177)

      read('./images/plate_bill.png', (_err, image) => {
        image.composite(avatar, 87, 0, { mode: BLEND_DESTINATION_OVER })

        image.getBuffer(MIME_PNG, (_err, buffer) => {
          return message.channel.send({ files: [{ name: 'bill.png', attachment: buffer }] })
        })
      })
    })
  }
}
