'use strict'

const Command = require('../../../core/Command.js')
const { read, MIME_PNG } = require('jimp')

module.exports = class Challenger extends Command {
  constructor (client) {
    super(client, {
      name: 'challenger',
      cooldown: 5,
      plugin: 'images',
      botpermissions: ['ATTACH_FILES'],
      usage: (language, prefix) => language.get('IMAGE_USAGE', prefix, 'challenger'),
      category: (language) => language.get('UTILS').IMAGE_CATEGORY,
      examples: (language, prefix) => language.get('IMAGE_EXAMPLE', prefix, 'challenger')
    })
  }

  async run (message, args) {
    const user = await this.client.functions.userFilter(message, args)

    if (!user) return

    try {
      const mask = await read('./images/mask.png')
      const template = await read('./images/new_challenger.png')
      const avatar = await read(user.displayAvatarURL({ format: 'png', size: 256 }))

      template.resize(455, 256)
      mask.resize(130, 130)
      avatar.resize(130, 130)
      avatar.mask(mask)
      template.composite(avatar, 255, 65)

      const buffer = await template.getAsyncBuffer(MIME_PNG)

      message.channel.send({
        files: [{
          name: 'challenger.png',
          attachment: buffer
        }]
      })
    } catch (e) {
      message.channel.send(message.language.get('ERRORS').IMAGE_ERROR(e))
    }
  }
}
