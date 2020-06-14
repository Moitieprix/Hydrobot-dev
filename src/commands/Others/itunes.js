'use strict'

const Command = require('../../../core/Command.js')
const fetch = require('node-fetch')
const { MessageEmbed } = require('discord.js')

module.exports = class Itunes extends Command {
  constructor (client) {
    super(client, {
      name: 'itunes',
      cooldown: 10,
      botpermissions: ['EMBED_LINKS'],
      usage: (language, prefix) => language.get('ITUNES_USAGE', prefix),
      category: (language) => language.get('UTILS').OTHERS_CATEGORY,
      examples: (language, prefix) => language.get('ITUNES_EXAMPLE', prefix)
    })
  }

  async run (message, args) {
    if (!args[0]) {
      message.channel.send(message.language.get('ITUNES')[0])
      return
    }

    try {
      const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(args.join(' '))}&media=music&entity=song&limit=1&explicit=${message.channel.nsfw ? 'yes' : 'no'}`)
      const body = await res.json()

      if (!body.resultCount) {
        message.channel.send(message.language.get('ITUNES')[1])
        return
      }

      const data = body.results[0]

      message.channel.send(new MessageEmbed()
        .setColor(this.client.config.embed.color)
        .attachFiles(['images/icons/itunes.png'])
        .setAuthor('iTunes', 'attachment://itunes.png', 'https://www.apple.com/itunes/')
        .setURL(data.trackViewUrl)
        .setThumbnail(data.artworkUrl100)
        .setTitle(data.trackName)
        .addField(message.language.get('ITUNES')[2], data.artistName)
        .addField(message.language.get('ITUNES')[3], data.collectionName)
        .addField(message.language.get('ITUNES')[4], this.client.functions.timestampToDate(Date.parse(data.releaseDate), message))
        .addField(message.language.get('ITUNES')[5], data.primaryGenreName)
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.avatarURL())
      )
    } catch {
      message.channel.send(message.language.get('ERRORS').ERROR_WITHOUT_REASON)
    }
  }
}
