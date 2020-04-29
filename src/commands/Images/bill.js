'use strict'

const Command = require('../../../core/Command.js')
const Jimp = require('jimp')

module.exports = class Bill extends Command {
  constructor (client) {
    super(client, {
      name: 'bill',
      cooldown: 5,
      enabled: true,
      owner: false,
      nsfw: false,
      plugin: 'image',
      aliases: [],
      permission: [],
      botpermissions: ['ATTACH_FILES'],
      usage: (language, prefix) => language.get('BILL_USAGE', prefix),
      category: (language) => language.get('UTILS').IMAGE_CATEGORIE,
      examples: (language, prefix) => language.get('BILL_EXEMPLE', prefix)
    })
  }

  async run (message, args) {
    const user = await this.client.functions.userFilter(message, args)

    if (!user) return message.channel.send(message.language.get('UTILS').USER_DEFAUT)

    await Jimp.read('./images/plate_bill.png', (err, image) => {
      Jimp.read(user.displayAvatarURL({ format: 'png', size: 256 }), (err, avatar) => {
        avatar.resize(177, 177)
        image.composite(avatar, 87, 0, { mode: Jimp.BLEND_DESTINATION_OVER })
        image.getBuffer(Jimp.MIME_PNG, (error, buffer) => {
          return message.channel.send({ files: [{ name: 'bill.png', attachment: buffer }] })
        })
      })
    })
  }
}
