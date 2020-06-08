'use strict'

const Command = require('../../../core/Command.js')
const fetch = require('node-fetch')
const { MessageEmbed } = require('discord.js')

module.exports = class Wikipedia extends Command {
  constructor (client) {
    super(client, {
      name: 'wikipedia',
      botpermissions: ['EMBED_LINKS'],
      aliases: ['wiki'],
      usage: (language, prefix) => language.get('WIKIPEDIA_USAGE', prefix),
      category: (language) => language.get('UTILS').OTHERS_CATEGORY,
      examples: (language, prefix) => language.get('WIKIPEDIA_EXAMPLE', prefix)
    })
  }

  async run (message, args, data) {
    if (!args[0]) {
      message.channel.send(message.language.get('WIKIPEDIA')[0])
      return
    }

    try {
      const res = await fetch(`https://${data.rows[0].language}.wikipedia.org/w/api.php?action=query&format=json&titles=${encodeURIComponent(args.join(' '))}&prop=extracts&formatversion=2&exintro=&explaintext=&redirects=`)
      const body = await res.json()

      if (body.query.pages[0].missing) {
        message.channel.send(message.language.get('WIKIPEDIA')[1])
        return
      }

      message.channel.send(new MessageEmbed()
        .setColor(this.client.config.embed.color)
        .setAuthor('Wikipedia', 'https://upload.wikimedia.org/wikipedia/commons/7/75/Wikipedia_mobile_app_logo.png', `https://${data.rows[0].language}.wikipedia.org/`)
        .setTitle(`:label: • ${body.query.pages[0].title}`)
        .setDescription(body.query.pages[0].extract.substr(0, 1900).replace(/[\n]/g, '\n\n'))
        .addField(message.language.get('WIKIPEDIA')[2], `[[${message.language.get('WIKIPEDIA')[3]}]](https://${data.rows[0].language}.wikipedia.org/wiki/${encodeURIComponent(body.query.pages[0].title)})`)
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.avatarURL())
      )
    } catch (e) {
      message.channel.send(message.language.get('WIKIPEDIA')[4])
      console.log(e)
    }
  }
}
