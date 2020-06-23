'use strict'

const Command = require('../../classes/Command')
const fetch = require('node-fetch')
const { MessageEmbed } = require('discord.js')

module.exports = class Urban extends Command {
  constructor (client) {
    super(client, {
      name: 'urban',
      cooldown: 10,
      botpermissions: ['EMBED_LINKS'],
      usage: (language, prefix) => language.get('URBAN_USAGE', prefix),
      category: (language) => language.get('UTILS').OTHERS_CATEGORY,
      examples: (language, prefix) => language.get('URBAN_EXAMPLE', prefix)
    })
  }

  async run (message, args) {
    if (!message.channel.nsfw) {
      message.channel.send(message.language.get('NSFW'))
      return
    }

    if (!args[0]) {
      message.channel.send(message.language.get('URBAN')[0])
      return
    }

    try {
      const res = await fetch(`http://api.urbandictionary.com/v0/define?term=${encodeURIComponent(args.join(' '))}`)
      const body = await res.json()

      if (!body.list.length) {
        message.channel.send(message.language.get('URBAN')[1])
        return
      }

      const data = body.list[0]

      message.channel.send(new MessageEmbed()
        .setColor(this.client.config.embed.color)
        .attachFiles(['images/icons/urban.png'])
        .setAuthor('Urban dictionary', 'attachment://urban.png', 'https://www.urbandictionary.com/')
        .setTitle(`:label: • ${data.word}`)
        .setDescription(data.definition.length > 2048 ? `${data.definition.substr(0, 2000)}...` : data.definition)
        .addField(message.language.get('URBAN')[2], data.example)
        .addField(message.language.get('URBAN')[3], `[[${message.language.get('URBAN')[4]}]](${data.permalink})`)
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.avatarURL())
      )
    } catch {
      message.channel.send(message.language.get('ERRORS').ERROR_WITHOUT_REASON)
    }
  }
}
