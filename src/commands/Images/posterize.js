'use strict'

const Command = require('../../classes/Command')
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

    if (!user) {
      return
    }

    try {
      const avatar = await read(user.displayAvatarURL({ format: 'png', size: 256 }))

      avatar.posterize(10)

      const buffer = await avatar.getBufferAsync(MIME_PNG)

      message.channel.send({
        files: [{
          name: 'posterize.png',
          attachment: buffer
        }]
      })
    } catch (e) {
      message.channel.send(message.language.get('ERRORS').IMAGE_ERROR(e))
    }
  }
}
