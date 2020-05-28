'use strict'

const Command = require('../../../core/Command.js')
const { MessageEmbed, WebhookClient } = require('discord.js')

module.exports = class Suggest extends Command {
  constructor (client) {
    super(client, {
      name: 'support',
      botpermissions: ['EMBED_LINKS'],
      usage: (language, prefix) => language.get('SUGGEST_USAGE', prefix),
      category: (language) => language.get('UTILS').HYDROBOT_CATEGORY,
      examples: (language, prefix) => language.get('SUGGEST_EXAMPLE', prefix)
    })
  }

  run (message, args) {
    if (!args[0]) {
      message.channel.send(message.language.get('SUGGEST')[0])
      return
    }

    new WebhookClient(this.client.config.webhooks.suggestions.id, this.client.config.webhooks.suggestions.token).send(
      new MessageEmbed()
        .setColor(this.client.config.embed.color)
        .setDescription(message.language.get('SUPPORT'))
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.avatarURL())
    ).then(async msg => {
      //const yes = await this.client.e
      msg.react()
    })
  }
}
