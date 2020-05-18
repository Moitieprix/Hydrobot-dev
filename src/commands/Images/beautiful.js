'use strict'

const Command = require('../../../core/Command.js')
const { read, MIME_PNG } = require('jimp')

module.exports = class Beautiful extends Command {
  constructor (client) {
    super(client, {
      name: 'beautiful',
      cooldown: 5,
      plugin: 'images',
      botpermissions: ['ATTACH_FILES'],
      usage: (language, prefix) => language.get('IMAGE_USAGE', prefix, 'beautiful'),
      category: (language) => language.get('UTILS').IMAGE_CATEGORY,
      examples: (language, prefix) => language.get('IMAGE_EXAMPLE', prefix, 'beautiful')
    })
  }

  async run (message, args) {
    const user = await this.client.functions.userFilter(message, args)

    if (!user) return

    read('./images/plate_beautiful.png', (_err, image) => {
      image.resize(256, 275)
      read(user.displayAvatarURL({ format: 'png', size: 256 }), (_err, avatar) => {
        avatar.resize(60, 69)
        image.composite(avatar, 175, 18)

        read(user.displayAvatarURL({ format: 'png', size: 256 }), (_err, avatar2) => {
          avatar2.resize(60, 69)
          image.composite(avatar2, 175, 155)

          image.getBuffer(MIME_PNG, (_err, buffer) => {
            return message.channel.send({ files: [{ name: 'beautiful.png', attachment: buffer }] })
          })
        })
      })
    })
  }
}
