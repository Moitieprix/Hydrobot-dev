'use strict'

const Command = require('../../../core/Command.js')
const Jimp = require('jimp')

module.exports = class Tobecontinued extends Command {
  constructor (client) {
    super(client, {
      name: 'tobecontinued',
      cooldown: 5,
      enabled: true,
      owner: false,
      nsfw: false,
      plugin: 'image',
      aliases: [],
      permission: [],
      botpermissions: ['ATTACH_FILES'],
      description: (language) => language.get('TOBECONTINUED_DESC'),
      usage: (language, prefix) => language.get('TOBECONTINUED_USAGE', prefix),
      category: (language) => language.get('UTILS').IMAGE_CATEGORIE,
      examples: (language, prefix) => language.get('TOBECONTINUED_EXEMPLE', prefix)
    })
  }

  async run (message, args) {
    const user = await this.client.functions.userFilter(message, args)

    if (!user) return message.channel.send(message.language.get('UTILS').USER_DEFAUT)

    Jimp.read(user.displayAvatarURL({ format: 'png', size: 256 }), (err, image) => {
      image.resize(256, 256)
      image.sepia()

      Jimp.read('./images/tobecontinued.png', (err, avatar) => {
        avatar.resize(160, 130)
        image.composite(avatar, 90, 155)

        image.getBuffer(Jimp.MIME_PNG, (error, buffer) => {
          return message.channel.send({ files: [{ name: 'tobecontinued.png', attachment: buffer }] })
        })
      })
    })
  }
}
