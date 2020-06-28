'use strict'

const Event = require('../classes/Event')
const { MessageEmbed } = require('discord.js')

module.exports = class ChannelDelete extends Event {
  async run (channelDelete) {
    if (channelDelete.type === 'dm') {
      return
    }

    const res = await this.client.database.query('SELECT language, system, logs_list, channels FROM settings WHERE id = $1', [channelDelete.guild.id])
    if (!res || !res.rows.length) {
      return
    }

    if (!res.rows[0].system.logs || !res.rows[0].logs_list.channelDelete) {
      return
    }

    const channel = res.rows[0].channels.logs

    if (channel === '0' || !channelDelete.guild.channels.cache.some(ch => ch.id === channel) || !this.client.channels.cache.get(channel).permissionsFor(this.client.user.id).has('SEND_MESSAGES')) {
      return
    }

    const language = new (require(`../i18n/${res.rows[0].language}`))()

    if (channelDelete.type === 'category') {
      channelDelete.guild.channels.cache.get(channel).send(new MessageEmbed()
        .setColor(this.client.config.embed.color)
        .attachFiles(['../images/icons/camera.png'])
        .setAuthor('Logs', 'attachment://camera.png')
        .setTitle(language.get('LOGS_EVENTS').CHANNEL_DELETE[1])
        .addField(language.get('LOGS_EVENTS').CHANNEL_DELETE[2], channelDelete.name)
        .addField(language.get('LOGS_EVENTS').CHANNEL_DELETE[3], language.get('CHANNELINFO_TYPE')[channelDelete.type])
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.avatarURL())
      )
      return
    }

    channelDelete.guild.channels.cache.get(channel).send(new MessageEmbed()
      .setColor(this.client.config.embed.color)
      .attachFiles(['../images/icons/camera.png'])
      .setAuthor('Logs', 'attachment://camera.png')
      .setTitle(language.get('LOGS_EVENTS').CHANNEL_DELETE[0])
      .addField(language.get('LOGS_EVENTS').CHANNEL_DELETE[2], channelDelete.name)
      .addField(language.get('LOGS_EVENTS').CHANNEL_DELETE[3], language.get('CHANNELINFO_TYPE')[channelDelete.type])
      .addField(language.get('LOGS_EVENTS').CHANNEL_DELETE[4], channelDelete.parent)
      .setTimestamp()
      .setFooter(this.client.user.username, this.client.user.avatarURL())
    )
  }
}
