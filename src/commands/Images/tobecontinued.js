'use strict'

const Command = require('../../../core/Command.js')
const { read, MIME_PNG } = require('jimp')

module.exports = class Tobecontinued extends Command {
  constructor (client) {
    super(client, {
      name: 'tobecontinued',
      cooldown: 5,
      plugin: 'images',
      botpermissions: ['ATTACH_FILES'],
      usage: (language, prefix) => language.get('IMAGE_USAGE', prefix, 'tobecontinued'),
      category: (language) => language.get('UTILS').IMAGE_CATEGORY,
      examples: (language, prefix) => language.get('IMAGE_EXAMPLE', prefix, 'tobecontinued')
    })
  }

  async run (message, args) {
    const user = await this.client.functions.userFilter(message, args)

    if (!user) return

    try {
      const avatar = await read(user.displayAvatarURL({ format: 'png', size: 256 }))
      const template = await read('./images/tobecontinued.png')

      avatar.sepia()
      template.resize(160, 130)
      avatar.composite(template, 90, 155)

      const buffer = await avatar.getAsyncBuffer(MIME_PNG)

      message.channel.send({
        files: [{
          name: 'tobecontinued.png',
          attachment: buffer
        }]
      })
    } catch (e) {
      message.channel.send(message.language.get('ERRORS').IMAGE_ERROR(e))
    }
  }
}
