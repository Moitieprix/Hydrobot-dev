'use strict'

const Command = require('../../../core/Command.js')
const { read, MIME_PNG } = require('jimp')

module.exports = class Delete extends Command {
  constructor (client) {
    super(client, {
      name: 'delete',
      cooldown: 5,
      plugin: 'images',
      botpermissions: ['ATTACH_FILES'],
      usage: (language, prefix) => language.get('IMAGE_USAGE', prefix, 'delete'),
      category: (language) => language.get('UTILS').IMAGE_CATEGORY,
      examples: (language, prefix) => language.get('IMAGE_EXAMPLE', prefix, 'delete')
    })
  }

  async run (message, args) {
    const user = await this.client.functions.userFilter(message, args)

    if (!user) return

    try {
      const template = await read('./images/templates/plate_delete.png')
      const avatar = await read(user.displayAvatarURL({ format: 'png', size: 256 }))

      template.resize(537, 256)
      avatar.resize(137, 137)
      template.composite(avatar, 88, 98)

      const buffer = await template.getBufferAsync(MIME_PNG)

      message.channel.send({
        files: [{
          name: 'delete.png',
          attachment: buffer
        }]
      })
    } catch (e) {
      message.channel.send(message.language.get('ERRORS').IMAGE_ERROR(e))
    }
  }
}
