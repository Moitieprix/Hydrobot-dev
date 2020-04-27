'use strict'

const Command = require('../../../core/Command.js')
const Jimp = require('jimp')

module.exports = class Beautiful extends Command {
  constructor (client) {
    super(client, {
      name: 'beautiful',
      cooldown: 5,
      enabled: true,
      owner: false,
      nsfw: false,
      plugin: 'image',
      aliases: [],
      permission: [],
      botpermissions: ['ATTACH_FILES'],
      description: (language) => language.get('BEAUTIFUL_DESC'),
      usage: (language, prefix) => language.get('BEAUTIFUL_USAGE', prefix),
      category: (language) => language.get('UTILS').IMAGE_CATEGORIE,
      examples: (language, prefix) => language.get('BEAUTIFUL_EXEMPLE', prefix)
    })
  }

  async run (message, args) {
    const user = await this.client.functions.userFilter(message, args)

    if (!user) return message.channel.send(message.language.get('UTILS').USER_DEFAUT)

    Jimp.read('./images/plate_beautiful.png', (err, image) => {
      image.resize(256, 275)
      Jimp.read(user.displayAvatarURL({ format: 'png', size: 256 }), (err, avatar) => {
        avatar.resize(60, 69)
        image.composite(avatar, 175, 18)

        Jimp.read(user.displayAvatarURL({ format: 'png', size: 256 }), (err, avatar2) => {
          avatar2.resize(60, 69)
          image.composite(avatar2, 175, 155)

          image.getBuffer(Jimp.MIME_PNG, (error, buffer) => {
            return message.channel.send({ files: [{ name: 'beautiful.png', attachment: buffer }] })
          })
        })
      })
    })
  }
}
