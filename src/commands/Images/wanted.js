'use strict'

const Command = require('../../../core/Command.js')
const Jimp = require('jimp')

module.exports = class Wanted extends Command {
  constructor (client) {
    super(client, {
      name: 'wanted',
      cooldown: 5,
      enabled: true,
      owner: false,
      nsfw: false,
      plugin: 'image',
      aliases: [],
      permission: [],
      botpermissions: ['ATTACH_FILES'],
      usage: (language, prefix) => language.get('WANTED_USAGE', prefix),
      category: (language) => language.get('UTILS').IMAGE_CATEGORIE,
      examples: (language, prefix) => language.get('WANTED_EXEMPLE', prefix)
    })
  }

  async run (message, args) {
    const user = await this.client.functions.userFilter(message, args)

    if (!user) return message.channel.send(message.language.get('UTILS').USER_DEFAUT)

    Jimp.read(user.displayAvatarURL({ format: 'png', size: 256 }), (err, image) => {
      Jimp.read('./images/wanted.jpg', (err, avatar) => {
        image.resize(256, 256)
        image.sepia()
        avatar.composite(image, 75, 225)

        avatar.getBuffer(Jimp.MIME_PNG, (error, buffer) => {
          return message.channel.send({ files: [{ name: 'wasted.png', attachment: buffer }] })
        })
      })
    })
  }
}
