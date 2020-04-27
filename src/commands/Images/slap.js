'use strict'

const Command = require('../../../core/Command.js')
const Jimp = require('jimp')

module.exports = class Slap extends Command {
  constructor (client) {
    super(client, {
      name: 'slap',
      cooldown: 5,
      enabled: true,
      owner: false,
      nsfw: false,
      plugin: 'image',
      aliases: [],
      permission: [],
      botpermissions: ['ATTACH_FILES'],
      description: (language) => language.get('SLAP_DESC'),
      usage: (language, prefix) => language.get('SLAP_USAGE', prefix),
      category: (language) => language.get('UTILS').IMAGE_CATEGORIE,
      examples: (language, prefix) => language.get('SLAP_EXEMPLE', prefix)
    })
  }

  async run (message, args) {
    const mask = await Jimp.read('./images/mask.png')

    if (!args[0]) {
      return message.channel.send(message.language.get('SLAP_ARGS'))
    }

    const user = await this.client.functions.userFilter(message, args)

    if (!user) return message.channel.send(message.language.get('UTILS').USER_DEFAUT)

    Jimp.read('./images/plate_slap.png', (err, image) => {
      image.resize(512, 256)

      Jimp.read(message.author.displayAvatarURL({ format: 'png', size: 256 }), (err, avatar) => {
        mask.resize(100, 100)
        avatar.resize(100, 100)
        avatar.mask(mask)
        image.composite(avatar, 205, 35)

        Jimp.read(user.displayAvatarURL({ format: 'png', size: 256 }), (err, avatar2) => {
          avatar2.resize(100, 100)
          avatar2.mask(mask)
          image.composite(avatar2, 85, 90)

          image.getBuffer(Jimp.MIME_PNG, (error, buffer) => {
            return message.channel.send({ files: [{ name: 'slap.png', attachment: buffer }] })
          })
        })
      })
    })
  }
}
