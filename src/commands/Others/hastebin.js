'use strict'

const Command = require('../../../core/Command.js')
const fetch = require('node-fetch')
const { MessageEmbed } = require('discord.js')

module.exports = class Hastebin extends Command {
  constructor (client) {
    super(client, {
      name: 'hastebin',
      botpermissions: ['EMBED_LINKS'],
      usage: (language, prefix) => language.get('HASTEBIN_USAGE', prefix),
      category: (language) => language.get('UTILS').OTHERS_CATEGORY,
      examples: (language, prefix) => language.get('HASTEBIN_EXAMPLE', prefix)
    })
  }

  async run (message, args) {
    if (!args[0]) {
      message.channel.send(message.language.get('HASTEBIN')[0])
      return
    }

    if (!args[1]) {
      message.channel.send(message.language.get('HASTEBIN')[1])
      return
    }

    const filenameExtension = args[0]
    args.shift()

    try {
      const res = await fetch('https://hasteb.in/documents', {
        method: 'POST',
        body: args.join(' '),
        headers: { 'Content-Type': 'text/plain' }
      })

      const json = await res.json()

      if (!json.key) {
        message.channel.send(message.language.get('HASTEBIN')[2])
        return
      }

      const url = `https://hasteb.in/${json.key}.${filenameExtension}`

      message.channel.send(new MessageEmbed()
        .setColor(this.client.config.embed.color)
        .setAuthor('Hasteb.in', 'https://hasteb.in/favicon.ico', 'https://hasteb.in/')
        .setDescription(message.language.get('HASTEBIN_ACCESS', url))
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.avatarURL())
      )
    } catch {
      message.channel.send(message.language.get('HASTEBIN')[2])
    }
  }
}
