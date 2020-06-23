'use strict'

const Command = require('../../classes/Command')
const { MessageEmbed } = require('discord.js')

module.exports = class Channelinfo extends Command {
  constructor (client) {
    super(client, {
      name: 'channelinfo',
      aliases: ['ci', 'channel'],
      botpermissions: ['EMBED_LINKS'],
      usage: (language, prefix) => language.get('CHANNELINFO_USAGE', prefix),
      category: (language) => language.get('UTILS').INFORMATION_CATEGORY,
      examples: (language, prefix) => language.get('CHANNELINFO_EXAMPLE', prefix)
    })
  }

  async run (message, args) {
    const channel = await this.client.functions.channelFilter(message, args)

    if (!channel) {
      return
    }

    if (channel.type === 'text' || channel.type === 'news') {
      message.channel.send(new MessageEmbed()
        .setColor(this.client.config.embed.color)
        .setTitle(`:label: • ${channel.name}`)
        .setDescription(channel.topic ? channel.topic : message.language.get('CHANNELINFO')[0])
        .addField(message.language.get('CHANNELINFO')[1], `${message.language.get('CHANNELINFO')[2]} **${channel.id}** \n${message.language.get('CHANNELINFO')[3]} **${message.language.get('CHANNELINFO_TYPE')[channel.type]}** \n${message.language.get('CHANNELINFO')[4]} **${this.client.functions.timestampToDate(channel.createdTimestamp, message)}** \n${message.language.get('CHANNELINFO')[5]} **${channel.parent}**`)
        .addField(message.language.get('CHANNELINFO')[6], `${message.language.get('CHANNELINFO')[7]} **${channel.nsfw ? message.language.get('CHANNELINFO')[8] : message.language.get('CHANNELINFO')[9]}** \n${message.language.get('CHANNELINFO')[10]} **${channel.position}** \n${message.language.get('CHANNELINFO')[11]} **${channel.rateLimitPerUser ? this.client.functions.getDuration(channel.rateLimitPerUser * 1000) : message.language.get('CHANNELINFO')[12]}**`)
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.avatarURL())
      )
    } else if (channel.type === 'store') {
      message.channel.send(new MessageEmbed()
        .setColor(this.client.config.embed.color)
        .setTitle(`:label: • ${channel.name}`)
        .addField(message.language.get('CHANNELINFO')[1], `${message.language.get('CHANNELINFO')[2]} **${channel.id}** \n${message.language.get('CHANNELINFO')[3]} **${message.language.get('CHANNELINFO_TYPE')[channel.type]}** \n${message.language.get('CHANNELINFO')[4]} **${this.client.functions.timestampToDate(channel.createdTimestamp, message)}** \n${message.language.get('CHANNELINFO')[5]} **${channel.parent}**`)
        .addField(message.language.get('CHANNELINFO')[6], `${message.language.get('CHANNELINFO')[7]} **${channel.nsfw ? message.language.get('CHANNELINFO')[8] : message.language.get('CHANNELINFO')[9]}** \n${message.language.get('CHANNELINFO')[10]} **${channel.position}**`)
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.avatarURL())
      )
    } else if (channel.type === 'voice') {
      message.channel.send(new MessageEmbed()
        .setColor(this.client.config.embed.color)
        .setTitle(`:label: • ${channel.name}`)
        .addField(message.language.get('CHANNELINFO')[1], `${message.language.get('CHANNELINFO')[2]} **${channel.id}** \n${message.language.get('CHANNELINFO')[3]} **${message.language.get('CHANNELINFO_TYPE')[channel.type]}** \n${message.language.get('CHANNELINFO')[4]} **${this.client.functions.timestampToDate(channel.createdTimestamp, message)}** \n${message.language.get('CHANNELINFO')[5]} **${channel.parent}**`)
        .addField(message.language.get('CHANNELINFO')[6], `${message.language.get('CHANNELINFO')[10]} **${channel.position}** \n${message.language.get('CHANNELINFO')[13]} **${channel.bitrate / 1000} kbps** \n${message.language.get('CHANNELINFO')[14]} **${channel.userLimit === 0 ? message.language.get('CHANNELINFO')[15] : channel.userLimit}**`)
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.avatarURL())
      )
    } else if (channel.type === 'category') {
      return message.channel.send(new MessageEmbed()
        .setColor(this.client.config.embed.color)
        .setTitle(`:label: • ${channel.name}`)
        .addField(message.language.get('CHANNELINFO')[1], `${message.language.get('CHANNELINFO')[2]} **${channel.id}** \n${message.language.get('CHANNELINFO')[3]} **${message.language.get('CHANNELINFO_TYPE')[channel.type]}** \n${message.language.get('CHANNELINFO')[4]} **${this.client.functions.getDate(channel.createdAt.toString().split(' '), message)}** \n${message.language.get('CHANNELINFO')[16]} **${channel.children.size}**`)
        .addField(message.language.get('CHANNELINFO')[17], channel.children.size !== 0 ? channel.children.map(e => e).join(', ') : message.language.get('CHANNELINFO')[18])
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.avatarURL())
      )
    }
  }
}
