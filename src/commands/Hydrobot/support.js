'use strict'

const Command = require('../../../core/Command.js')
const { MessageEmbed } = require('discord.js')

module.exports = class Support extends Command {
  constructor (client) {
    super(client, {
      name: 'support',
      botpermissions: ['EMBED_LINKS'],
      usage: (language, prefix) => language.get('SUPPORT_USAGE', prefix),
      category: (language) => language.get('UTILS').HYDROBOT_CATEGORY,
      examples: (language, prefix) => language.get('SUPPORT_EXAMPLE', prefix)
    })
  }

  run (message) {
    message.channel.send(new MessageEmbed()
      .setColor(this.client.config.embed.color)
      .setDescription(message.language.get('SUPPORT'))
      .setTimestamp()
      .setFooter(this.client.user.username, this.client.user.avatarURL())
    )
  }
}
