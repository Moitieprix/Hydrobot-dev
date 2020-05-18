'use strict'

const Command = require('../../../core/Command.js')
const { read, MIME_PNG } = require('jimp')

module.exports = class Challenger extends Command {
  constructor (client) {
    super(client, {
      name: 'challenger',
      cooldown: 5,
      plugin: 'images',
      botpermissions: ['ATTACH_FILES'],
      usage: (language, prefix) => language.get('IMAGE_USAGE', prefix, 'challenger'),
      category: (language) => language.get('UTILS').IMAGE_CATEGORY,
      examples: (language, prefix) => language.get('IMAGE_EXAMPLE', prefix, 'challenger')
    })
  }

  async run (message, args) {
    const mask = await read('./images/mask.png')

    const user = await this.client.functions.userFilter(message, args)

    if (!user) return

    read('./images/new_challenger.png', (_err, image) => {
      image.resize(455, 256)

      read(user.displayAvatarURL({ format: 'png', size: 256 }), (_err, avatar) => {
        mask.resize(130, 130)
        avatar.resize(130, 130)
        avatar.mask(mask)
        image.composite(avatar, 255, 65)

        image.getBuffer(MIME_PNG, (_err, buffer) => {
          return message.channel.send({ files: [{ name: 'challenger.png', attachment: buffer }] })
        })
      })
    })
  }
}
