'use strict'

const Command = require('../../../core/Command.js')
const { MessageEmbed } = require('discord.js')

module.exports = class Emojis extends Command {
  constructor (client) {
    super(client, {
      name: 'emojis',
      cooldown: 3,
      owner: false,
      enabled: true,
      nsfw: false,
      plugin: false,
      aliases: ['emotes', 'emoji', 'emote', 'emoteinfo', 'emotesinfo', 'emojisinfo', 'ei'],
      permission: [],
      botpermissions: ['EMBED_LINKS', 'MANAGE_EMOJIS'],
      description: (language) => language.get('EMOTE_DESC'),
      usage: (language, prefix) => language.get('EMOTE_USAGE', prefix),
      category: (language) => language.get('UTILS').INFORMATION_CATEGORIE,
      examples: (language, prefix) => language.get('EMOTE_EXEMPLE', prefix)
    })
  }

  async run (message, args) {
    if (!args[0]) {

      const embed = new MessageEmbed()
        .setColor(this.client.config.embed.color)
        .setTitle(message.language.get('EMOTE_TITLE', message.guild.name, message.guild.emojis.cache.size))
        .setDescription(message.guild.emojis.cache.array().length !== 0 ? ((message.guild.emojis.cache.array().length > 25 ? `${message.guild.emojis.cache.array().slice(0, 25).join(' ')} ${message.language.get('EMOTE_MORE_SIZE', message.guild.emojis.cache.array().length - 25)}` : message.guild.emojis.cache.array().join(' '))) : message.language.get('EMOTE_0'))
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.avatarURL())

      return message.channel.send(embed)

    } else {
      const emote = args[0].split(':')[1]
      const emoji = message.guild.emojis.cache.find(em => em.name === emote)

      if (!emoji) {

        const embed = new MessageEmbed()
          .setColor(this.client.config.embed.color)
          .setTimestamp()
          .setFooter(this.client.user.username, this.client.user.avatarURL())

        if (this.client.functions.parseEmoji(args[0]) === null || this.client.functions.parseEmoji(args[0]).id === null) {

          return message.channel.send(message.language.get('EMOTE_ERREUR'))
        } else {

          embed.setImage(`https://cdn.discordapp.com/emojis/${this.client.functions.parseEmoji(args[0]).id}.${this.client.functions.parseEmoji(args[0]).animated === false ? 'png' : 'gif'}?v=1`)

          return message.channel.send(embed)
        }
      } else {
        emoji.fetchAuthor().then(author => {

          const embed = new MessageEmbed()
            .setColor(this.client.config.embed.color)
            .setTitle(`Emote ${emoji}`)
            .addField(message.language.get('EMOTE_EMBED')[8], `${message.language.get('EMOTE_EMBED')[0]} **${emoji.name}** \n${message.language.get('EMOTE_EMBED')[9]} **${emoji.id}** \n${message.language.get('EMOTE_EMBED')[1]} **${author.tag}** \n${message.language.get('EMOTE_EMBED')[2]} **${this.client.functions.getDate(emoji.createdAt.toString().split(' '), message)}** \n${message.language.get('EMOTE_EMBED')[3]} **${emoji.animated ? message.language.get('EMOTE_EMBED')[6] : message.language.get('EMOTE_EMBED')[7]}** \n${message.language.get('EMOTE_EMBED')[4]} **[${message.language.get('EMOTE_EMBED')[5]}](${emoji.url})**`)
            .setThumbnail(emoji.url)
            .setTimestamp()
            .setFooter(this.client.user.username, this.client.user.avatarURL())

          return message.channel.send(embed)
        })
      }
    }
  }
}

