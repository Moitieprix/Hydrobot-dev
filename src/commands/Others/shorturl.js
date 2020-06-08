'use strict'

const Command = require('../../../core/Command.js')
const fetch = require('node-fetch')
const { MessageEmbed } = require('discord.js')

module.exports = class Shorturl extends Command {
  constructor (client) {
    super(client, {
      name: 'shorturl',
      botpermissions: ['EMBED_LINKS'],
      usage: (language, prefix) => language.get('SHORTURL_USAGE', prefix),
      category: (language) => language.get('UTILS').OTHERS_CATEGORY,
      examples: (language, prefix) => language.get('SHORTURL_EXAMPLE', prefix)
    })
  }

  async run (message, args) {
    if (!args[0]) {
      message.channel.send(message.language.get('SHORTURL')[0])
      return
    }

    try {
      const res = await fetch(`https://is.gd/create.php?format=simple&url=${encodeURI(args[0])}`)
      const body = await res.text()

      if (body === 'Error: Please enter a valid URL to shorten') {
        message.channel.send(message.language.get('SHORTURL')[1])
        return
      }

      message.channel.send(new MessageEmbed()
        .setColor(this.client.config.embed.color)
        .setTitle(message.language.get('SHORTURL')[2])
        .addField(message.language.get('SHORTURL')[3], body)
        .addField(message.language.get('SHORTURL')[4], args[0])
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.avatarURL())
      )
    } catch {
      message.channel.send(message.language.get('SHORTURL')[5])
    }
  }
}
