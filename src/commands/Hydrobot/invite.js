'use strict'

const Command = require('../../../core/Command.js')
const { MessageEmbed } = require('discord.js')

module.exports = class Invite extends Command {
  constructor (client) {
    super(client, {
      name: 'invite',
      botpermissions: ['EMBED_LINKS'],
      usage: (language, prefix) => language.get('INVITE_USAGE', prefix),
      category: (language) => language.get('UTILS').HYDROBOT_CATEGORY,
      examples: (language, prefix) => language.get('INVITE_EXAMPLE', prefix)
    })
  }

  async run (message) {
    message.channel.send(new MessageEmbed()
      .setColor(this.client.config.embed.color)
      .setDescription(message.language.get('INVITE', this.client.user.id))
      .setTimestamp()
      .setFooter(this.client.user.username, this.client.user.avatarURL())
    )
  }
}
