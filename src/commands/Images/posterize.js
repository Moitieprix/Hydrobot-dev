'use strict'

const Command = require('../../../core/Command.js')
const Jimp = require('jimp')

module.exports = class Posterize extends Command {
  constructor (client) {
    super(client, {
      name: 'posterize',
      cooldown: 5,
      enabled: true,
      owner: false,
      nsfw: false,
      plugin: 'image',
      aliases: [],
      permission: [],
      botpermissions: ['ATTACH_FILES'],
      description: (language) => language.get('POSTERIZE_DESC'),
      usage: (language, prefix) => language.get('POSTERIZE_USAGE', prefix),
      category: (language) => language.get('UTILS').IMAGE_CATEGORIE,
      examples: (language, prefix) => language.get('POSTERIZE_EXEMPLE', prefix)
    })
  }

  async run (message, args) {
    const user = await this.client.functions.userFilter(message, args)

    if (!user) return message.channel.send(message.language.get('UTILS').USER_DEFAUT)

    Jimp.read(user.displayAvatarURL({ format: 'png', size: 256 }), (err, image) => {
      image.resize(256, 256)
      image.posterize(10)

      image.getBuffer(Jimp.MIME_PNG, (error, buffer) => {
        return message.channel.send({ files: [{ name: 'posterize.png', attachment: buffer }] })
      })
    })
  }
}
