'use strict'

const Command = require('../../../core/Command.js')
const { read, MIME_PNG } = require('jimp')

module.exports = class Posterize extends Command {
  constructor (client) {
    super(client, {
      name: 'posterize',
      cooldown: 5,
      plugin: 'images',
      botpermissions: ['ATTACH_FILES'],
      usage: (language, prefix) => language.get('IMAGE_USAGE', prefix, 'posterize'),
      category: (language) => language.get('UTILS').IMAGE_CATEGORY,
      examples: (language, prefix) => language.get('IMAGE_EXAMPLE', prefix, 'posterize')
    })
  }

  async run (message, args) {
    const user = await this.client.functions.userFilter(message, args)

    if (!user) return

    read(user.displayAvatarURL({ format: 'png', size: 256 }), (_err, image) => {
      image.resize(256, 256)
      image.posterize(10)

      image.getBuffer(MIME_PNG, (_err, buffer) => {
        return message.channel.send({ files: [{ name: 'posterize.png', attachment: buffer }] })
      })
    })
  }
}
