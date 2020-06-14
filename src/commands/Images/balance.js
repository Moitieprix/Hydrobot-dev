'use strict'

const Command = require('../../../core/Command.js')
const { read, MIME_PNG } = require('jimp')

module.exports = class Balance extends Command {
  constructor (client) {
    super(client, {
      name: 'balance',
      cooldown: 5,
      plugin: 'images',
      botpermissions: ['ATTACH_FILES'],
      usage: (language, prefix) => language.get('IMAGE_USAGE', prefix, 'balance'),
      category: (language) => language.get('UTILS').IMAGE_CATEGORY,
      examples: (language, prefix) => language.get('IMAGE_EXAMPLE', prefix, 'balance')
    })
  }

  async run (message, args) {
    const user = await this.client.functions.userFilter(message, args)

    if (!user) return

    try {
      const avatar = await read(user.displayAvatarURL({ format: 'png', size: 256 }))
      const template = await read('./images/templates/balance.png')

      avatar.resize(256, 256)
      template.resize(256, 256)
      avatar.composite(template, 0, 0)

      const buffer = await avatar.getBufferAsync(MIME_PNG)

      message.channel.send({
        files: [{
          name: 'balance.png',
          attachment: buffer
        }]
      })
    } catch (e) {
      message.channel.send(message.language.get('ERRORS').IMAGE_ERROR(e))
    }
  }
}
