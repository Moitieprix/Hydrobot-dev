'use strict'

const Command = require('../../../core/Command.js')
const { read, MIME_PNG } = require('jimp')

module.exports = class Slap extends Command {
  constructor (client) {
    super(client, {
      name: 'slap',
      cooldown: 5,
      plugin: 'images',
      botpermissions: ['ATTACH_FILES'],
      usage: (language, prefix) => language.get('IMAGE_USAGE', prefix, 'slap'),
      category: (language) => language.get('UTILS').IMAGE_CATEGORY,
      examples: (language, prefix) => language.get('IMAGE_EXAMPLE', prefix, 'slap')
    })
  }

  async run (message, args) {
    const mask = await read('./images/mask.png')

    if (!args[0]) return message.channel.send(message.language.get('SLAP_ARGS'))

    const user = await this.client.functions.userFilter(message, args)

    if (!user) return

    read('./images/plate_slap.png', (_err, image) => {
      image.resize(512, 256)

      read(message.author.displayAvatarURL({ format: 'png', size: 256 }), (_err, avatar) => {
        mask.resize(100, 100)
        avatar.resize(100, 100)
        avatar.mask(mask)
        image.composite(avatar, 205, 35)

        read(user.displayAvatarURL({ format: 'png', size: 256 }), (_err, avatar2) => {
          avatar2.resize(100, 100)
          avatar2.mask(mask)
          image.composite(avatar2, 85, 90)

          image.getBuffer(MIME_PNG, (_err, buffer) => {
            return message.channel.send({ files: [{ name: 'slap.png', attachment: buffer }] })
          })
        })
      })
    })
  }
}
