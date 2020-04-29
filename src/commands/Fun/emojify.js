'use strict'

const Command = require('../../../core/Command.js')

module.exports = class Emojify extends Command {
  constructor (client) {
    super(client, {
      name: 'emojify',
      cooldown: 3,
      enabled: true,
      owner: false,
      nsfw: false,
      plugin: false,
      aliases: [],
      permission: [],
      botpermissions: ['EMBED_LINKS'],
      usage: (language, prefix) => language.get('EMOJIFY_USAGE', prefix),
      category: (language) => language.get('UTILS').FUN_CATEGORIE,
      examples: (language, prefix) => language.get('EMOJIFY_EXEMPLE', prefix)
    })
  }

  run (message, args) {
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
    'abcdefghijklmnopqrstuvwxyz'.split('').forEach(c => {
      mapping[c] = mapping[c.toUpperCase()] = `:regional_indicator_${c}:`
    })

    if (!args[0]) return message.channel.send(message.language.get('EMOJIFY_ARGS'))

    if (args.join(' ').match(new RegExp(/[^a-zA-Z0-9\s!?+÷^<>.]/))) return message.channel.send(message.language.get('EMOJIFY_NOT_VALID'))

    if (args.join(' ').length > 100) return message.channel.send(message.language.get(message.language.get('EMOJIFY_LENGTH')))

    return message.channel.send(
      args.join(' ')
        .split('')
        .map(c => mapping[c] || c)
        .join('')
    )

  }
}
