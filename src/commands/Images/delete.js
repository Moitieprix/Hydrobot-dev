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

    read('./images/plate_delete.png', (_err, image) => {
      image.resize(537, 256)

      read(user.displayAvatarURL({ format: 'png', size: 256 }), (_err, avatar) => {
        avatar.resize(137, 137)
        image.composite(avatar, 88, 98)

        image.getBuffer(MIME_PNG, (_err, buffer) => {
          return message.channel.send({ files: [{ name: 'delete.png', attachment: buffer }] })
        })
      })
    })
  }
}
