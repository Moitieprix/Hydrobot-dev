'use strict'

const Event = require('../classes/Event')
const { MessageEmbed } = require('discord.js')

module.exports = class ChannelCreate extends Event {
  async run (channelCreate) {
    const res = await this.client.database.query('SELECT id, language, system, logs_list, channels FROM settings WHERE id = $1', [channelCreate.guild.id])
    if (!res || !res.rows.length) {
      return
    }

    if (!res.rows[0].system.logs || !res.rows[0].logs_list.channelCreate) {
      return
    }

    const channel = res.rows[0].channels.logs

    if (channel === '0' || !channelCreate.guild.channels.cache.some(ch => ch.id === channel) || !this.client.channels.cache.get(channel).permissionsFor(this.client.user.id).has('SEND_MESSAGES')) {
      return
    }

    const language = new (require(`../../i18n/${res.rows[0].language}`))()

    if (channelCreate.type === 'text' || channelCreate.type === 'news') {
      channelCreate.guild.channels.cache.get(channel).send(new MessageEmbed()
        .setColor(this.client.config.embed.color)
        .attachFiles(['images/icons/mag.png'])
        .setAuthor('Logs', 'attachment://mag.png')
        .setTitle(language.get('LOGS_EVENTS').CHANNEL_CREATE[0])
        .addField(language.get('LOGS_EVENTS').CHANNEL_CREATE[4], channelCreate.name)
        .addField(language.get('LOGS_EVENTS').CHANNEL_CREATE[5], language.get('CHANNELINFO_TYPE')[channelCreate.type])
        .addField(language.get('LOGS_EVENTS').CHANNEL_CREATE[6], channelCreate.parent)
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.avatarURL())
      )
      return
    }

    if (channelCreate.type === 'store') {
      channelCreate.guild.channels.cache.get(channel).send(new MessageEmbed()
        .setColor(this.client.config.embed.color)
        .attachFiles(['images/icons/mag.png'])
        .setAuthor('Logs', 'attachment://mag.png')
        .setTitle(language.get('LOGS_EVENTS').CHANNEL_CREATE[1])
        .addField(language.get('LOGS_EVENTS').CHANNEL_CREATE[4], channelCreate.name)
        .addField(language.get('LOGS_EVENTS').CHANNEL_CREATE[5], language.get('CHANNELINFO_TYPE')[channelCreate.type])
        .addField(language.get('LOGS_EVENTS').CHANNEL_CREATE[6], channelCreate.parent)
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.avatarURL())
      )
      return
    }

    if (channelCreate.type === 'voice') {
      channelCreate.guild.channels.cache.get(channel).send(new MessageEmbed()
        .setColor(this.client.config.embed.color)
        .attachFiles(['images/icons/mag.png'])
        .setAuthor('Logs', 'attachment://mag.png')
        .setTitle(language.get('LOGS_EVENTS').CHANNEL_CREATE[2])
        .addField(language.get('LOGS_EVENTS').CHANNEL_CREATE[4], channelCreate.name)
        .addField(language.get('LOGS_EVENTS').CHANNEL_CREATE[5], language.get('CHANNELINFO_TYPE')[channelCreate.type])
        .addField(language.get('LOGS_EVENTS').CHANNEL_CREATE[6], channelCreate.parent)
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.avatarURL())
      )
      return
    }

    if (channelCreate.type === 'category') {
      channelCreate.guild.channels.cache.get(channel).send(new MessageEmbed()
        .setColor(this.client.config.embed.color)
        .attachFiles(['images/icons/mag.png'])
        .setAuthor('Logs', 'attachment://mag.png')
        .setTitle(language.get('LOGS_EVENTS').CHANNEL_CREATE[3])
        .addField(language.get('LOGS_EVENTS').CHANNEL_CREATE[4], channelCreate.name)
        .addField(language.get('LOGS_EVENTS').CHANNEL_CREATE[5], language.get('CHANNELINFO_TYPE')[channelCreate.type])
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.avatarURL())
      )
    }
  }
}
