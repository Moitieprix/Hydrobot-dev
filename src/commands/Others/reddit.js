'use strict'

const Command = require('../../../core/Command.js')
const fetch = require('node-fetch')
const { MessageEmbed } = require('discord.js')

module.exports = class Reddit extends Command {
  constructor (client) {
    super(client, {
      name: 'reddit',
      cooldown: 10,
      botpermissions: ['EMBED_LINKS'],
      aliases: ['sebreddit'],
      usage: (language, prefix) => language.get('REDDIT_USAGE', prefix),
      category: (language) => language.get('UTILS').OTHERS_CATEGORY,
      examples: (language, prefix) => language.get('REDDIT_EXAMPLE', prefix)
    })
  }

  async run (message, args) {
    if (!args[0]) {
      message.channel.send(message.language.get('REDDIT')[0])
      return
    }

    try {
      const res = await fetch(`https://www.reddit.com/r/${encodeURIComponent(args.join(' ').replace(/r\//g, ''))}/about.json`)
      const body = await res.json()

      if (!body.data || !body.data.display_name_prefixed) {
        message.channel.send(message.language.get('REDDIT')[1])
        return
      }

      message.channel.send(new MessageEmbed()
        .setColor(this.client.config.embed.color)
        .attachFiles(['images/icons/reddit.png'])
        .setAuthor('Reddit', 'attachment://reddit.png', 'https://www.reddit.com')
        .setTitle(`:label: • ${body.data.display_name_prefixed}`)
        .setDescription(body.data.public_description ? body.data.public_description : message.language.get('REDDIT')[2])
        .addField(message.language.get('REDDIT')[3], body.data.subscribers)
        .addField(message.language.get('REDDIT')[4], body.data.accounts_active)
        .addField(message.language.get('REDDIT')[5], `[[${message.language.get('REDDIT')[6]}]](https://www.reddit.com/${body.data.display_name_prefixed})`)
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.avatarURL())
      )
    } catch {
      message.channel.send(message.language.get('ERRORS').ERROR_WITHOUT_REASON)
    }
  }
}
