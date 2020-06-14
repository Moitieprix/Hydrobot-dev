'use strict'

const Command = require('../../../core/Command.js')
const { MessageEmbed } = require('discord.js')

module.exports = class Emojis extends Command {
  constructor (client) {
    super(client, {
      name: 'emojis',
      aliases: ['emotes', 'emoji', 'emote', 'emoteinfo', 'emotesinfo', 'emojisinfo', 'ei'],
      botpermissions: ['EMBED_LINKS'],
      usage: (language, prefix) => language.get('EMOTE_USAGE', prefix),
      category: (language) => language.get('UTILS').INFORMATION_CATEGORY,
      examples: (language, prefix) => language.get('EMOTE_EXAMPLE', prefix)
    })
  }

  async run (message, args) {
    if (!args[0]) {
      message.channel.send(
        new MessageEmbed()
          .setColor(this.client.config.embed.color)
          .setTitle(message.language.get('EMOTE_TITLE', message.guild.name, message.guild.emojis.cache.size))
          .setDescription(message.guild.emojis.cache.array().length !== 0 ? ((message.guild.emojis.cache.array().length > 25 ? `${message.guild.emojis.cache.array().slice(0, 25).join(' ')} ${message.language.get('EMOTE_MORE_SIZE', message.guild.emojis.cache.array().length - 25)}` : message.guild.emojis.cache.array().join(' '))) : message.language.get('EMOTE')[11])
          .setTimestamp()
          .setFooter(this.client.user.username, this.client.user.avatarURL())
      )
      return
    }

    const emojiName = args[0].split(':')[1]
    const emoji = message.guild.emojis.cache.find(em => em.name === emojiName)

    if (!emoji) {
      if (!this.client.functions.parseEmoji(args[0])) {
        message.channel.send(message.language.get('EMOTE')[10])
        return
      }
      message.channel.send(new MessageEmbed()
        .setColor(this.client.config.embed.color)
        .setTimestamp()
        .setImage(`https://cdn.discordapp.com/emojis/${this.client.functions.parseEmoji(args[0]).id}.${this.client.functions.parseEmoji(args[0]).animated === false ? 'png' : 'gif'}??size=256`)
        .setFooter(this.client.user.username, this.client.user.avatarURL())
      )
      return
    }

    if (message.guild.me.hasPermission('MANAGE_EMOJIS')) {
      emoji.fetchAuthor().then(author => {
        message.channel.send(new MessageEmbed()
          .setColor(this.client.config.embed.color)
          .setTitle(`Emote ${emoji}`)
          .addField(message.language.get('EMOTE')[8], `${message.language.get('EMOTE')[0]} **${emoji.name}** \n${message.language.get('EMOTE')[9]} **${emoji.id}** \n${message.language.get('EMOTE')[1]} **${author.tag}** \n${message.language.get('EMOTE')[2]} **${this.client.functions.timestampToDate(emoji.createdTimestamp, message)}** \n${message.language.get('EMOTE')[3]} **${emoji.animated ? message.language.get('EMOTE')[6] : message.language.get('EMOTE')[7]}** \n${message.language.get('EMOTE')[4]} **[${message.language.get('EMOTE')[5]}](${emoji.url})**`)
          .setThumbnail(emoji.url)
          .setTimestamp()
          .setFooter(this.client.user.username, this.client.user.avatarURL())
        )
      })
      return
    }

    message.channel.send(new MessageEmbed()
      .setColor(this.client.config.embed.color)
      .setTitle(`Emote ${emoji}`)
      .addField(message.language.get('EMOTE')[8], `${message.language.get('EMOTE')[0]} **${emoji.name}** \n${message.language.get('EMOTE')[9]} **${emoji.id}** \n${message.language.get('EMOTE')[2]} **${this.client.functions.timestampToDate(emoji.createdTimestamp, message)}** \n${message.language.get('EMOTE')[3]} **${emoji.animated ? message.language.get('EMOTE')[6] : message.language.get('EMOTE')[7]}** \n${message.language.get('EMOTE')[4]} **[${message.language.get('EMOTE')[5]}](${emoji.url})**`)
      .setThumbnail(emoji.url)
      .setTimestamp()
      .setFooter(this.client.user.username, this.client.user.avatarURL())
    )
  }
}
