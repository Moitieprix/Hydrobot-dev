'use strict'

const Command = require('../../../core/Command.js')
const Jimp = require('jimp')

module.exports = class Distracted extends Command {
  constructor (client) {
    super(client, {
      name: 'distracted',
      cooldown: 5,
      enabled: true,
      owner: false,
      nsfw: false,
      plugin: 'image',
      aliases: [],
      permission: [],
      botpermissions: ['ATTACH_FILES'],
      usage: (language, prefix) => language.get('DISTRACTED_USAGE', prefix),
      category: (language) => language.get('UTILS').IMAGE_CATEGORIE,
      examples: (language, prefix) => language.get('DISTRACTED_EXEMPLE', prefix)
    })
  }

  async run (message, args) {
    const mask = await Jimp.read('./images/mask.png')

    if (!args[0]) {
      return message.channel.send(message.language.get('DISTRACTED_ARGS'))
    }

    const user = await this.client.functions.userFilter(message, args)

    if (!user) return message.channel.send(message.language.get('UTILS').USER_DEFAUT)


    Jimp.read('./images/plate_checkout.png', (err, image) => {
      image.resize(370, 256)

      Jimp.read(message.author.displayAvatarURL({ format: 'png', size: 256 }), (err, avatar) => {
        mask.resize(60, 60)
        avatar.resize(60, 60)
        avatar.mask(mask)
        image.composite(avatar, 180, 35)

        Jimp.read(user.displayAvatarURL({ format: 'png', size: 256 }), (err, avatar2) => {
          mask.resize(85, 85)
          avatar2.resize(85, 85)
          avatar2.mask(mask)
          image.composite(avatar2, 70, 50)

          image.getBuffer(Jimp.MIME_PNG, (error, buffer) => {
            return message.channel.send({ files: [{ name: 'distracted.png', attachment: buffer }] })
          })
        })
      })
    })
  }
}
