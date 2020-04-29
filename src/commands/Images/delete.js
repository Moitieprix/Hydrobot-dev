'use strict'

const Command = require('../../../core/Command.js')
const Jimp = require('jimp')

module.exports = class Delete extends Command {
  constructor (client) {
    super(client, {
      name: 'delete',
      cooldown: 5,
      enabled: true,
      owner: false,
      nsfw: false,
      plugin: 'image',
      aliases: [],
      permission: [],
      botpermissions: ['ATTACH_FILES'],
      usage: (language, prefix) => language.get('DELETE_USAGE', prefix),
      category: (language) => language.get('UTILS').IMAGE_CATEGORIE,
      examples: (language, prefix) => language.get('DELETE_EXEMPLE', prefix)
    })
  }

  async run (message, args) {
    const user = await this.client.functions.userFilter(message, args)

    if (!user) return message.channel.send(message.language.get('UTILS').USER_DEFAUT)

    Jimp.read('./images/plate_delete.png', (err, image) => {
      image.resize(537, 256)

      Jimp.read(user.displayAvatarURL({ format: 'png', size: 256 }), (err, avatar) => {
        avatar.resize(137, 137)
        image.composite(avatar, 88, 98)
        image.getBuffer(Jimp.MIME_PNG, (error, buffer) => {
          return message.channel.send({ files: [{ name: 'delete.png', attachment: buffer }] })
        })
      })
    })
  }
}
