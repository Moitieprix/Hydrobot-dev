'use strict'

const Command = require('../../../core/Command.js')
const Jimp = require('jimp')

module.exports = class Blurple extends Command {
  constructor (client) {
    super(client, {
      name: 'blurple',
      cooldown: 5,
      plugin: 'images',
      botpermissions: ['ATTACH_FILES'],
      usage: (language, prefix) => language.get('IMAGE_USAGE', prefix, 'blurple'),
      category: (language) => language.get('UTILS').IMAGE_CATEGORY,
      examples: (language, prefix) => language.get('IMAGE_EXAMPLE', prefix, 'blurple')
    })
  }

  async run (message, args) {
    const user = await this.client.functions.userFilter(message, args)

    if (!user) return

    const image = new Jimp(256, 256, '#738ADB')

    Jimp.read(user.displayAvatarURL({ format: 'png', size: 256 }), (_err, avatar) => {
      avatar.resize(256, 256)

      avatar.composite(image, 0, 0, { opacitySource: 0.4 })

      avatar.getBuffer(Jimp.MIME_PNG, (_err, buffer) => {
        return message.channel.send({ files: [{ name: 'blur.png', attachment: buffer }] })
      })
    })
  }
}