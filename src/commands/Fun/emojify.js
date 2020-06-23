'use strict'

const Command = require('../../classes/Command')

module.exports = class Emojify extends Command {
  constructor (client) {
    super(client, {
      name: 'emojify',
      botpermissions: ['EMBED_LINKS'],
      usage: (language, prefix) => language.get('EMOJIFY_USAGE', prefix),
      category: (language) => language.get('UTILS').FUN_CATEGORY,
      examples: (language, prefix) => language.get('EMOJIFY_EXAMPLE', prefix)
    })
  }

  async run (message, args) {
    const mapping = {
      ' ': '   ',
      0: ':zero:',
      1: ':one:',
      2: ':two:',
      3: ':three:',
      4: ':four:',
      5: ':five:',
      6: ':six:',
      7: ':seven:',
      8: ':eight:',
      9: ':nine:',
      '<': ':arrow_backward:',
      '>': ':arrow_forward:',
      '!': ':exclamation:',
      '?': ':question:',
      '^': ':arrow_up_small:',
      '+': ':heavy_plus_sign:',
      '-': ':heavy_minus_sign:',
      '÷': ':heavy_division_sign:',
      '.': ':radio_button:'

    }

    for (const element of 'abcdefghijklmnopqrstuvwxyz'.split('')) {
      mapping[element] = mapping[element.toUpperCase()] = `:regional_indicator_${element}:`
    }

    if (!args[0]) {
      message.channel.send(message.language.get('EMOJIFY')[0])
      return
    }

    if (args.join(' ').match(/[^a-zA-Z0-9\s!?+÷^<>.-]/)) {
      message.channel.send(message.language.get('EMOJIFY')[1])
      return
    }

    if (args.join(' ').length > 100) {
      message.channel.send(message.language.get(message.language.get('EMOJIFY')[2]))
      return
    }

    message.channel.send(
      args.join(' ')
        .split('')
        .map(c => mapping[c] || c)
        .join('')
    )
  }
}
