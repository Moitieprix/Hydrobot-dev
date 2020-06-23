'use strict'

const Command = require('../../classes/Command')
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
    if (!args[0]) {
      message.channel.send(message.language.get('DECODE')[0])
      return
    }

    if (args.join(' ').length > 750) {
      message.channel.send(message.language.get('DECODE')[1])
      return
    }

    const buf = Buffer.from(decodeURIComponent(args.join(' ')), 'base64')
    let decodeText = buf.toString('base64')

    if (decodeText.length === 0) {
      decodeText = message.language.get('DECODE')[2]
    }

    return message.channel.send(new MessageEmbed()
      .setColor(this.client.config.embed.color)
      .addField(`${message.language.get('DECODE')[3]}`, `\`\`\`${args.join(' ')}\`\`\``)
      .addField(`${message.language.get('DECODE')[4]}`, `\`\`\`${decodeText}\`\`\``)
      .setTimestamp()
      .setFooter(this.client.user.username, this.client.user.avatarURL())
    )
  }
}
