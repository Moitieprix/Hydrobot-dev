'use strict'

const Command = require('../../../core/Command.js')
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
    const mask = await read('./images/mask.png')

    if (!args[0]) return message.channel.send(message.language.get('CRUSH_ARGS'))

    const user = await this.client.functions.userFilter(message, args)

    if (!user) return

    read(user.displayAvatarURL({ format: 'png', size: 256 }), (_err, avatar) => {
      avatar.resize(165, 165)
      avatar.rotate(8)

      read('./images/plate_crush.png', (_err, image) => {
        image.resize(256, 370)
        image.composite(avatar, 60, 180, { mode: BLEND_DESTINATION_OVER })

        read(message.author.displayAvatarURL({ format: 'png', size: 256 }), (_err, avatar2) => {
          mask.resize(50, 50)
          avatar2.resize(50, 50)
          avatar2.mask(mask)
          image.composite(avatar2, 175, 22)

          image.getBuffer(MIME_PNG, (_error, buffer) => {
            return message.channel.send({ files: [{ name: 'crush.png', attachment: buffer }] })
          })
        })
      })
    })
  }
}
