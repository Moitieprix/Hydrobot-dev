'use strict'

const Command = require('../../classes/Command')

module.exports = class Tableflip extends Command {
  constructor (client) {
    super(client, {
      name: 'tableflip',
      botpermissions: ['EMBED_LINKS'],
      usage: (language, prefix) => language.get('TABLE_USAGE', prefix),
      category: (language) => language.get('UTILS').FUN_CATEGORY,
      examples: (language, prefix) => language.get('TABLE_EXAMPLE', prefix)
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
  }
}
