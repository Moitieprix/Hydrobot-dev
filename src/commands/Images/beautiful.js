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

    try {
      const avatar = await read(user.displayAvatarURL({ format: 'png', size: 256 }))
      const template = await read('./images/templates/plate_beautiful.png')

      template.resize(256, 275)
      avatar.resize(60, 69)

      template.composite(avatar, 175, 18)
      template.composite(avatar, 175, 155)

      const buffer = await template.getBufferAsync(MIME_PNG)

      message.channel.send({
        files: [{
          name: 'beautiful.png',
          attachment: buffer
        }]
      })
    } catch (e) {
      message.channel.send(message.language.get('ERRORS').IMAGE_ERROR(e))
    }
  }
}
