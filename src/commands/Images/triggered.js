'use strict'

const Command = require('../../../core/Command.js')
const Jimp = require('jimp')
const GIFEncoder = require('gifencoder')

const options = {
  size: 256,
  frames: 16
}

module.exports = class Triggered extends Command {
  constructor (client) {
    super(client, {
      name: 'triggered',
      cooldown: 10,
      owner: false,
      enabled: true,
      nsfw: false,
      plugin: 'image',
      aliases: [],
      permission: [],
      botpermissions: ['ATTACH_FILES'],
      usage: (language, prefix) => language.get('TRIGGERED_USAGE', prefix),
      category: (language) => language.get('UTILS').IMAGE_CATEGORIE,
      examples: (language, prefix) => language.get('TRIGGERED_EXEMPLE', prefix)
    })
  }

  async run (message, args) {
    const user = await this.client.functions.userFilter(message, args)

    if (!user) return message.channel.send(message.language.get('UTILS').USER_DEFAUT)

    const base = new Jimp(options.size, options.size)
    const avatar = await Jimp.read(user.displayAvatarURL({ format: 'png', size: 2048 }))
    const text = await Jimp.read('./images/triggered.png')
    const tint = await Jimp.read('./images/red.png')

    avatar.resize(320, 320)
    tint.scaleToFit(base.bitmap.width, base.bitmap.height)
    tint.opacity(0.2)
    text.scaleToFit(280, 60)

    const frames = []
    const buffers = []
    const encoder = new GIFEncoder(options.size, options.size)
    const stream = encoder.createReadStream()
    let temp

    stream.on('data', async buffer => await buffers.push(buffer))
    stream.on('end', async () => {
      return await message.channel.send({
        files: [{
          name: 'triggered.gif',
          attachment: Buffer.concat(buffers)
        }]
      })
    })

    for (let i = 0; i < options.frames; i++) {
      temp = base.clone()

      if (i === 0) {
        temp.composite(avatar, -16, -16)
      } else {
        temp.composite(avatar, -32 + this.client.functions.getRandomInt(-16, 16), -32 + this.client.functions.getRandomInt(-16, 16))
      }

      temp.composite(tint, 0, 0)

      if (i === 0) temp.composite(text, -10, 200)
      else temp.composite(text, -12 + this.client.functions.getRandomInt(-8, 8), 200 + this.client.functions.getRandomInt(-0, 12))

      frames.push(temp.bitmap.data)
    }

    encoder.start()
    encoder.setRepeat(0)
    encoder.setDelay(20)
    for (const frame of frames) {
      encoder.addFrame(frame)
    }
    encoder.finish()
  }
}
