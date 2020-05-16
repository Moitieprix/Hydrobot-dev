'use strict'

const Command = require('../../../core/Command.js')
const Base64 = require('js-base64').Base64
const { MessageEmbed } = require('discord.js')

module.exports = class Decode extends Command {
  constructor (client) {
    super(client, {
      name: 'decode',
      cooldown: 3,
      enabled: true,
      owner: false,
      nsfw: false,
      plugin: false,
      aliases: [],
      permission: [],
      botpermissions: ['EMBED_LINKS'],
      usage: (language, prefix) => language.get('DECODE_USAGE', prefix),
      category: (language) => language.get('UTILS').FUN_CATEGORIE,
      examples: (language, prefix) => language.get('DECODE_EXEMPLE', prefix)
    })
  }

  async run (message, args) {
    if (!args[0]) return message.channel.send(message.language.get('DECODE_ARGS'))
    if (args.join(' ').length > 750) return message.channel.send(message.language.get('DECODE_LENGTH'))

    const text = args.join(' ')
    let decodeText = Base64.decode(text)

    if (decodeText.length === 0) decodeText = message.language.get('DECODE_NOT_VALID')

    const embed = new MessageEmbed()
      .setColor(this.client.config.embed.color)
      .addField(`${message.language.get('DECODE_ENTREE')}`, `\`\`\`${text}\`\`\``)
      .addField(`${message.language.get('DECODE_SORTIE')}`, `\`\`\`${decodeText}\`\`\``)
      .setTimestamp()
      .setFooter(this.client.user.username, this.client.user.avatarURL())

    return message.channel.send(embed)
  }
}
