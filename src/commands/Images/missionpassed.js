'use strict'

const Command = require('../../../core/Command.js')
const Jimp = require('jimp')

module.exports = class Missionpassed extends Command {
  constructor (client) {
    super(client, {
      name: 'missionpassed',
      cooldown: 5,
      enabled: true,
      owner: false,
      nsfw: false,
      plugin: 'image',
      aliases: [],
      permission: [],
      botpermissions: ['ATTACH_FILES'],
      usage: (language, prefix) => language.get('MISSIONPASSED_USAGE', prefix),
      category: (language) => language.get('UTILS').IMAGE_CATEGORIE,
      examples: (language, prefix) => language.get('MISSIONPASSED_EXEMPLE', prefix)
    })
  }

  async run (message, args) {
    const user = await this.client.functions.userFilter(message, args)

    if (!user) return message.channel.send(message.language.get('UTILS').USER_DEFAUT)

    Jimp.read(user.displayAvatarURL({ format: 'png', size: 256 }), (err, image) => {
      image.resize(256, 256)
      image.gaussian(3)

      Jimp.read('./images/missionpassed.png', (err, avatar) => {
        avatar.resize(256, 185)
        image.composite(avatar, 0, 50)

        image.getBuffer(Jimp.MIME_PNG, (error, buffer) => {
          return message.channel.send({ files: [{ name: 'missionpassed.png', attachment: buffer }] })
        })
      })
    })
  }
}
