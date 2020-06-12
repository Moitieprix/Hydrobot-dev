'use strict'

const Command = require('../../../core/Command.js')
const { read, MIME_PNG } = require('jimp')

module.exports = class Brilliance extends Command {
  constructor (client) {
    super(client, {
      name: 'brilliance',
      cooldown: 5,
      plugin: 'images',
      botpermissions: ['ATTACH_FILES'],
      usage: (language, prefix) => language.get('IMAGE_USAGE', prefix, 'brilliance'),
      category: (language) => language.get('UTILS').IMAGE_CATEGORY,
      examples: (language, prefix) => language.get('IMAGE_EXAMPLE', prefix, 'brilliance')
    })
  }

  async run (message, args) {
    const user = await this.client.functions.userFilter(message, args)

    if (!user) return

    try {
      const avatar = await read(user.displayAvatarURL({ format: 'png', size: 256 }))
      const template = await read('./images/brilliance.png')

      template.resize(256, 256)
      avatar.composite(template, 0, 0)

      const buffer = await avatar.getBuffer(MIME_PNG)

      message.channel.send({
        files: [{
          name: 'brilliance.png',
          attachment: buffer
        }]
      })
    } catch (e) {
      message.channel.send(message.language.get('ERRORS').IMAGE_ERROR(e))
    }
  }
}
