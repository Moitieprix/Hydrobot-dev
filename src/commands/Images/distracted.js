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
    const mask = await read('./images/mask.png')

    if (!args[0]) return message.channel.send(message.language.get('DISTRACTED_ARGS'))

    const user = await this.client.functions.userFilter(message, args)

    if (!user) return

    read('./images/plate_checkout.png', (_err, image) => {
      image.resize(370, 256)

      read(message.author.displayAvatarURL({ format: 'png', size: 256 }), (_err, avatar) => {
        mask.resize(60, 60)
        avatar.resize(60, 60)
        avatar.mask(mask)
        image.composite(avatar, 180, 35)

        read(user.displayAvatarURL({ format: 'png', size: 256 }), (_err, avatar2) => {
          mask.resize(85, 85)
          avatar2.resize(85, 85)
          avatar2.mask(mask)
          image.composite(avatar2, 70, 50)

          image.getBuffer(MIME_PNG, (_err, buffer) => {
            return message.channel.send({ files: [{ name: 'distracted.png', attachment: buffer }] })
          })
        })
      })
    })
  }
}
