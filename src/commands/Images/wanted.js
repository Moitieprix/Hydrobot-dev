'use strict'

const Command = require('../../../core/Command.js')
const { read, MIME_PNG } = require('jimp')

module.exports = class Wanted extends Command {
  constructor (client) {
    super(client, {
      name: 'wanted',
      cooldown: 5,
      plugin: 'images',
      botpermissions: ['ATTACH_FILES'],
      usage: (language, prefix) => language.get('IMAGE_USAGE', prefix, 'wanted'),
      category: (language) => language.get('UTILS').IMAGE_CATEGORY,
      examples: (language, prefix) => language.get('IMAGE_EXAMPLE', prefix, 'wanted')
    })
  }

  async run (message, args) {
    const user = await this.client.functions.userFilter(message, args)

    if (!user) return

    read(user.displayAvatarURL({ format: 'png', size: 256 }), (_err, avatar) => {
      read('./images/wanted.jpg', (_err, image) => {
        avatar.resize(256, 256)
        avatar.sepia()
        image.composite(avatar, 75, 225)

        image.getBuffer(MIME_PNG, (_err, buffer) => {
          return message.channel.send({ files: [{ name: 'wanted.png', attachment: buffer }] })
        })
      })
    })
  }
}
