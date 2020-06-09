'use strict'

const Command = require('../../../core/Command.js')
const { MessageEmbed } = require('discord.js')

module.exports = class Quote extends Command {
  constructor (client) {
    super(client, {
      name: 'quote',
      botpermissions: ['EMBED_LINKS'],
      usage: (language, prefix) => language.get('QUOTE_USAGE', prefix),
      category: (language) => language.get('UTILS').OTHERS_CATEGORY,
      examples: (language, prefix) => language.get('QUOTE_EXAMPLE', prefix)
    })
  }

  async run (message, args) {
    if (!args[0]) {
      message.channel.send(message.language.get('QUOTE')[0])
      return
    }

    if (!args[0].match(/^https?:\/\/(?:(?:canary|ptb).)?discordapp\.com\/channels\/(\d+)\/(\d+)\/(\d+)/gm)) {
      message.channel.send(message.language.get('QUOTE')[1])
      return
    }

    const linkArray = args[0].split('/')

    const channelMessage = this.client.channels.cache.get(linkArray[5])

    if (!channelMessage) {
      message.channel.send(message.language.get('QUOTE')[2])
      return
    }

    try {
      const fetchMessage = await channelMessage.messages.fetch(linkArray[6])

      if (fetchMessage.content) {
        message.channel.send(new MessageEmbed()
          .setDescription(fetchMessage.content)
          .setColor(this.client.config.embed.color)
          .setTimestamp()
          .setFooter(this.client.user.username, this.client.user.avatarURL())
        )
      }

      if (fetchMessage.attachments.size) {
        if (fetchMessage.attachments.first().url.match(/^https?:\/\/(?:(?:canary|ptb|cdn).)?discordapp\.com\/attachments\/(\d+)\/(\d+)\/(\w+)\.(webp|png|jpg|jpeg|gif)$/gm)) {
          message.channel.send(new MessageEmbed()
            .setImage(fetchMessage.attachments.first().url)
            .setColor(this.client.config.embed.color)
            .setTimestamp()
            .setFooter(this.client.user.username, this.client.user.avatarURL())
          )
        } else {
          message.channel.send(new MessageEmbed()
            .setDescription(message.language.get('QUOTE_FILE_NOT_DISPLAYED', fetchMessage.attachments.first().url, fetchMessage.url))
            .setColor(this.client.config.embed.color)
            .setTimestamp()
            .setFooter(this.client.user.username, this.client.user.avatarURL())
          )
        }
      }

      if (fetchMessage.embeds.length && fetchMessage.author.bot) {
        const embedData = fetchMessage.embeds[0]

        message.channel.send({
          embed: {
            title: embedData.title,
            description: embedData.description,
            url: embedData.url,
            color: embedData.color,
            timestamp: embedData.timestamp,
            fields: embedData.fields,
            thumbnail: embedData.thumbnail ? { url: embedData.thumbnail.url } : null,
            image: embedData.image ? { url: embedData.image.url } : null,
            author: embedData.author,
            footer: embedData.footer,
            video: embedData.video ? { url: embedData.video.url } : null
          }
        })
      }

      message.channel.send(new MessageEmbed()
        .setAuthor(fetchMessage.author.tag, fetchMessage.author.displayAvatarURL({ dynamic: true }))
        .setDescription(message.language.get('QUOTE_INFO', fetchMessage.author, message.author, fetchMessage.channel.id))
        .setColor(this.client.config.embed.color)
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.avatarURL())
      )
    } catch {
      message.channel.send(message.language.get('QUOTE')[2])
    }
  }
}
