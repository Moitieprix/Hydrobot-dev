'use strict'

const Command = require('../../../core/Command.js')
const Base64 = require('js-base64').Base64
const { MessageEmbed } = require('discord.js')

module.exports = class Decode extends Command {
  constructor (client) {
    super(client, {
      name: 'decode',
      botpermissions: ['EMBED_LINKS'],
      usage: (language, prefix) => language.get('DECODE_USAGE', prefix),
      category: (language) => language.get('UTILS').FUN_CATEGORY,
      examples: (language, prefix) => language.get('DECODE_EXEAPLE', prefix)
    })
  }

  async run (message, args) {
    if (!args[0]) return message.channel.send(message.language.get('DECODE')[0])
    if (args.join(' ').length > 750) return message.channel.send(message.language.get('DECODE')[1])

    const text = args.join(' ')
    let decodeText = decodeURIComponent(Base64.decode(text))

    if (decodeText.length === 0) decodeText = message.language.get('DECODE')[2]

    const embed = new MessageEmbed()
      .setColor(this.client.config.embed.color)
      .addField(`${message.language.get('DECODE')[3]}`, `\`\`\`${text}\`\`\``)
      .addField(`${message.language.get('DECODE')[4]}`, `\`\`\`${decodeText}\`\`\``)
      .setTimestamp()
      .setFooter(this.client.user.username, this.client.user.avatarURL())

    return message.channel.send(embed)
  }
}
