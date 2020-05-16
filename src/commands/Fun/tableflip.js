'use strict'

const Command = require('../../../core/Command.js')

module.exports = class Tableflip extends Command {
  constructor (client) {
    super(client, {
      name: 'tableflip',
      cooldown: 3,
      enabled: true,
      owner: false,
      nsfw: false,
      plugin: false,
      aliases: [],
      permission: [],
      botpermissions: ['EMBED_LINKS'],
      usage: (language, prefix) => language.get('TABLE_USAGE', prefix),
      category: (language) => language.get('UTILS').FUN_CATEGORIE,
      examples: (language, prefix) => language.get('TABLE_USAGE', prefix)
    })
  }

  async run (message) {
    const frames = [
      '(-°□°)-  ┬─┬',
      '(╯°□°)╯    ]',
      '(╯°□°)╯  ︵  ┻━┻',
      '(╯°□°)╯       [',
      '(╯°□°)╯           ┬─┬'
    ]

    const msg = await message.channel.send('(\\\\°□°)\\\\  ┬─┬')
    for (const frame of frames) {
      await msg.edit(frame)
    }
    return message
  }
}
