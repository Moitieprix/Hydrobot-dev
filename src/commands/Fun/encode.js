'use strict'

const Command = require('../../../core/Command.js')
const { MessageEmbed } = require('discord.js')

module.exports = class Encode extends Command {
  constructor (client) {
    super(client, {
      name: 'encode',
      botpermissions: ['EMBED_LINKS'],
      usage: (language, prefix) => language.get('ENCODE_USAGE', prefix),
      category: (language) => language.get('UTILS').FUN_CATEGORY,
      examples: (language, prefix) => language.get('ENCODE_EXEMPLE', prefix)
    })
  }

  async run (message, args) {
    if (!args[0]) {
      message.channel.send(message.language.get('ENCODE')[0])
      return
    }

    if (args.join(' ').length > 750) {
      message.channel.send(message.language.get('ENCODE')[1])
      return
    }

    const buf = Buffer.from(args.join(' '), 'utf8')
    const encodeText = buf.toString('base64')

    return message.channel.send(new MessageEmbed()
      .setColor(this.client.config.embed.color)
      .addField(`${message.language.get('ENCODE')[2]}`, `\`\`\`${args.join(' ')}\`\`\``)
      .addField(`${message.language.get('ENCODE')[3]}`, `\`\`\`${encodeText}\`\`\``)
      .setTimestamp()
      .setFooter(this.client.user.username, this.client.user.avatarURL())
    )
  }
}
