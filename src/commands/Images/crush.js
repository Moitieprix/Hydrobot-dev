'use strict'

const Command = require('../../../core/Command.js')
const Jimp = require('jimp')

module.exports = class Crush extends Command {
  constructor (client) {
    super(client, {
      name: 'crush',
      cooldown: 5,
      enabled: true,
      owner: false,
      nsfw: false,
      plugin: 'image',
      aliases: [],
      permission: [],
      botpermissions: ['ATTACH_FILES'],
      usage: (language, prefix) => language.get('CRUSH_USAGE', prefix),
      category: (language) => language.get('UTILS').IMAGE_CATEGORIE,
      examples: (language, prefix) => language.get('CRUSH_EXEMPLE', prefix)
    })
  }

  async run (message, args) {
    const mask = await Jimp.read('./images/mask.png')

    if (!args[0]) {
      return message.channel.send(message.language.get('CRUSH_ARGS'))
    }

    const user = await this.client.functions.userFilter(message, args)

    if (!user) return message.channel.send(message.language.get('UTILS').USER_DEFAUT)

    Jimp.read(user.displayAvatarURL({format: 'png', size: 256}), (err, avatar) => {
      avatar.resize(165, 165)
      avatar.rotate(8)

      Jimp.read('./images/plate_crush.png', (err, image) => {
        image.resize(256, 370)
        image.composite(avatar, 60, 180, {mode: Jimp.BLEND_DESTINATION_OVER})

        Jimp.read(message.author.displayAvatarURL({format: 'png', size: 256}), (err, avatar2) => {
          mask.resize(50, 50)
          avatar2.resize(50, 50)
          avatar2.mask(mask)
          image.composite(avatar2, 175, 22)

          image.getBuffer(Jimp.MIME_PNG, (error, buffer) => {
            return message.channel.send({files: [{name: 'crush.png', attachment: buffer}]})
          })
        })
      })
    })
  }
}
