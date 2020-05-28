'use strict'

const Command = require('../../../core/Command.js')
const { MessageEmbed } = require('discord.js')

module.exports = class Roll extends Command {
  constructor (client) {
    super(client, {
      name: 'roll',
      botpermissions: ['EMBED_LINKS'],
      usage: (language, prefix) => language.get('ROLL_USAGE', prefix),
      category: (language) => language.get('UTILS').FUN_CATEGORY,
      examples: (language, prefix) => language.get('ROLL_EXAMPLE', prefix)
    })
  }

  async run (message) {
    return message.channel.send(new MessageEmbed()
      .setColor(this.client.config.embed.color)
      .setTimestamp()
      .addField(message.language.get('ROLL'), this.client.functions.getRandomInt(1, 6))
      .setFooter(this.client.user.username, this.client.user.avatarURL())
    )
  }
}
