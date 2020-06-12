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

    try {
      const template = new Jimp(256, 256, '#738ADB')

      const avatar = await Jimp.read(user.displayAvatarURL({ format: 'png', size: 256 }))

      avatar.resize(256, 256)
      avatar.composite(template, 0, 0, { opacitySource: 0.4 })

      const buffer = await avatar.getAsyncBuffer(Jimp.MIME_PNG)

      message.channel.send({
        files: [{
          name: 'blurple.png',
          attachment: buffer
        }]
      })
    } catch (e) {
      message.channel.send(message.language.get('ERRORS').IMAGE_ERROR(e))
    }
  }
}
