'use strict'

const Command = require('../../../core/Command.js')
const Jimp = require('jimp')

module.exports = class Bobross extends Command {
  constructor (client) {
    super(client, {
      name: 'bobross',
      cooldown: 5,
      enabled: true,
      owner: false,
      nsfw: false,
      plugin: 'image',
      aliases: [],
      permission: [],
      botpermissions: ['ATTACH_FILES'],
      description: (language) => language.get('BOBROSS_DESC'),
      usage: (language, prefix) => language.get('BOBROSS_USAGE', prefix),
      category: (language) => language.get('UTILS').IMAGE_CATEGORIE,
      examples: (language, prefix) => language.get('BOBROSS_EXEMPLE', prefix)
    })
  }

  async run (message, args) {
    const user = await this.client.functions.userFilter(message, args)

    if (!user) return message.channel.send(message.language.get('UTILS').USER_DEFAUT)

    Jimp.read('./images/bobross.png', (err, image) => {
      image.resize(256, 280)

      Jimp.read(user.displayAvatarURL({ format: 'png', size: 256 }), (err, avatar) => {
        avatar.resize(173, 173)
        image.composite(avatar, 15, 12, { mode: Jimp.BLEND_DESTINATION_OVER })
        image.getBuffer(Jimp.MIME_PNG, (error, buffer) => {
          return message.channel.send({ files: [{ name: 'bobross.png', attachment: buffer }] })
        })
      })
    })
  }
}
