'use strict'

const Command = require('../../../core/Command.js')
const fetch = require('node-fetch')
const { MessageEmbed } = require('discord.js')

module.exports = class Mcuser extends Command {
  constructor (client) {
    super(client, {
      name: 'mdn',
      botpermissions: ['EMBED_LINKS'],
      usage: (language, prefix) => language.get('MDN_USAGE', prefix),
      category: (language) => language.get('UTILS').OTHERS_CATEGORY,
      examples: (language, prefix) => language.get('MDN_EXAMPLE', prefix)
    })
  }

  async run (message, args, data) {
    if (!args[0]) {
      message.channel.send(message.language.get('MDN')[0])
      return
    }

    try {
      const lang = {
        fr: 'fr',
        en: 'en-US'
      }

      const res = await fetch(`https://developer.mozilla.org/api/v1/search/${lang[data.rows[0].language]}?q=${encodeURIComponent(args.join(' '))}&locale=${lang[data.rows[0].language]}`)
      const body = await res.json()

      if (!body.documents.length) {
        message.channel.send(message.language.get('MDN')[1])
        return
      }

      const array = body.documents.map(element => `• \`${element.title}\` - [[${message.language.get('MDN')[2]}]](https://developer.mozilla.org/${lang[data.rows[0].language]}/docs/${element.slug})`)

      array.slice(0, 5)

      message.channel.send(new MessageEmbed()
        .setColor(this.client.config.embed.color)
        .setAuthor('MDN', 'https://developer.mozilla.org/static/img/favicon32.7f3da72dcea1.png', 'https://developer.mozilla.org')
        .setTitle(`:mag: • ${message.language.get('MDN')[3]}`)
        .setDescription(array.join(' \n'))
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.avatarURL())
      )
    } catch {
      message.channel.send(message.language.get('MDN')[4])
    }
  }
}
