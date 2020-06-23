'use strict'

const Command = require('../../classes/Command')
const fetch = require('node-fetch')
const { MessageEmbed } = require('discord.js')

module.exports = class Mdn extends Command {
  constructor (client) {
    super(client, {
      name: 'mdn',
      cooldown: 10,
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
        .attachFiles(['images/icons/mdn.png'])
        .setAuthor('MDN', 'attachment://mdn.png', 'https://developer.mozilla.org')
        .setTitle(message.language.get('MDN')[3])
        .setDescription(array.join(' \n'))
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.avatarURL())
      )
    } catch {
      message.channel.send(message.language.get('ERRORS').ERROR_WITHOUT_REASON)
    }
  }
}
