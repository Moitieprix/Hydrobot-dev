'use strict'

const Command = require('../../../core/Command.js')
const {MessageEmbed} = require('discord.js')

module.exports = class Channelinfo extends Command {
  constructor (client) {
    super(client, {
      name: 'channelinfo',
      cooldown: 3,
      enabled: true,
      owner: false,
      nsfw: false,
      plugin: false,
      aliases: ['ci', 'channel'],
      permission: [],
      botpermissions: ['EMBED_LINKS'],
      usage: (language, prefix) => language.get('CHANNELINFO_USAGE', prefix),
      category: (language) => language.get('UTILS').INFORMATION_CATEGORIE,
      examples: (language, prefix) => language.get('CHANNELINFO_EXEMPLE', prefix)
    })
  }

  run (message, args) {

    const channelId = this.client.functions.channelFilter(message, args)

    if (channelId === false) return message.channel.send(message.language.get('UTILS').CHANNEL_DEFAUT)

    const channel = message.guild.channels.cache.get(channelId)

    if (channel.type === 'text' || channel.type === 'news' || channel.type === 'store') {
      const embed = new MessageEmbed()
        .setColor(this.client.config.embed.color)
        .setTitle(`:label: • ${channel.name}`)
        .setDescription(`${channel.topic ? channel.topic : message.language.get('CHANNELINFO_EMBED')[0]}`)
        .addField(message.language.get('CHANNELINFO_EMBED')[1], `${message.language.get('CHANNELINFO_EMBED')[2]} **${channel.id}** \n${message.language.get('CHANNELINFO_EMBED')[3]} **${message.language.get('CHANNELINFO_TYPE')[channel.type]}** \n${message.language.get('CHANNELINFO_EMBED')[4]} **${this.client.functions.getDate(channel.createdAt.toString().split(' '), message)}** \n${message.language.get('CHANNELINFO_EMBED')[5]} **${channel.parent}**`)
        .addField(message.language.get('CHANNELINFO_EMBED')[6], `${message.language.get('CHANNELINFO_EMBED')[7]} **${channel.nsfw ? message.language.get('CHANNELINFO_EMBED')[8] : message.language.get('CHANNELINFO_EMBED')[9]}** \n${message.language.get('CHANNELINFO_EMBED')[10]} **${channel.position}** \n${message.language.get('CHANNELINFO_EMBED')[11]} **${channel.rateLimitPerUser ? this.client.functions.getDuration(channel.rateLimitPerUser * 1000) : message.language.get('CHANNELINFO_EMBED')[12]}**`)
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.avatarURL())

      return message.channel.send(embed)

    } else if (channel.type === 'voice') {
      const embed = new MessageEmbed()
        .setColor(this.client.config.embed.color)
        .setTitle(`:label: • ${channel.name}`)
        .addField(message.language.get('CHANNELINFO_EMBED')[1], `${message.language.get('CHANNELINFO_EMBED')[2]} **${channel.id}** \n${message.language.get('CHANNELINFO_EMBED')[3]} **${message.language.get('CHANNELINFO_TYPE')[channel.type]}** \n${message.language.get('CHANNELINFO_EMBED')[4]} **${this.client.functions.getDate(channel.createdAt.toString().split(' '), message)}** \n${message.language.get('CHANNELINFO_EMBED')[5]} **${channel.parent}**`)
        .addField(message.language.get('CHANNELINFO_EMBED')[6], `${message.language.get('CHANNELINFO_EMBED')[10]} **${channel.position}** \n${message.language.get('CHANNELINFO_EMBED')[13]} **${channel.bitrate/1000} kbps** \n${message.language.get('CHANNELINFO_EMBED')[14]} **${channel.userLimit === 0 ? message.language.get('CHANNELINFO_EMBED')[15] : channel.userLimit}**`)
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.avatarURL())

      return message.channel.send(embed)

    } else if (channel.type === 'category') {
      const embed = new MessageEmbed()
        .setColor(this.client.config.embed.color)
        .setTitle(`:label: • ${channel.name}`)
        .addField(message.language.get('CHANNELINFO_EMBED')[1], `${message.language.get('CHANNELINFO_EMBED')[2]} **${channel.id}** \n${message.language.get('CHANNELINFO_EMBED')[3]} **${message.language.get('CHANNELINFO_TYPE')[channel.type]}** \n${message.language.get('CHANNELINFO_EMBED')[4]} **${this.client.functions.getDate(channel.createdAt.toString().split(' '), message)}** \n${message.language.get('CHANNELINFO_EMBED')[16]} **${channel.children.size}**`)
        .addField(message.language.get('CHANNELINFO_EMBED')[17], `${channel.children.size !== 0 ? channel.children.map(e => e).join(', '): message.language.get('CHANNELINFO_EMBED')[18]}`)
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.avatarURL())

      return message.channel.send(embed)

    }
  }
}
