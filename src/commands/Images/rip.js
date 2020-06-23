'use strict'

const Command = require('../../classes/Command')
const { read, MIME_PNG, BLEND_DESTINATION_OVER } = require('jimp')

module.exports = class Rip extends Command {
  constructor (client) {
    super(client, {
      name: 'rip',
      cooldown: 5,
      plugin: 'images',
      botpermissions: ['ATTACH_FILES'],
      usage: (language, prefix) => language.get('IMAGE_USAGE', prefix, 'rip'),
      category: (language) => language.get('UTILS').IMAGE_CATEGORY,
      examples: (language, prefix) => language.get('IMAGE_EXAMPLE', prefix, 'rip')
    })
  }

  async run (message, args) {
    const user = await this.client.functions.userFilter(message, args)

    if (!user) {
      return
    }

    try {
      const avatar = await read(user.displayAvatarURL({ format: 'png', size: 256 }))
      const template = await read('./images/templates/plate_rip.png')

      template.resize(400, 256)
      avatar.resize(60, 60)
      avatar.rotate(3)

      template.composite(avatar, 55, 25, { mode: BLEND_DESTINATION_OVER })

      const buffer = await template.getBufferAsync(MIME_PNG)

      message.channel.send({
        files: [{
          name: 'rip.png',
          attachment: buffer
        }]
      })
    } catch (e) {
      message.channel.send(message.language.get('ERRORS').IMAGE_ERROR(e))
    }
  }
}
