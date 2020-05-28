'use strict'

const Command = require('../../../core/Command.js')
const Base64 = require('js-base64').Base64
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

    const text = args.join(' ')
    const encodeText = Base64.encode(text)

    return message.channel.send(new MessageEmbed()
      .setColor(this.client.config.embed.color)
      .addField(`${message.language.get('ENCODE')[2]}`, `\`\`\`${text}\`\`\``)
      .addField(`${message.language.get('ENCODE')[3]}`, `\`\`\`${encodeText}\`\`\``)
      .setTimestamp()
      .setFooter(this.client.user.username, this.client.user.avatarURL())
    )
  }
}
