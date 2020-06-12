'use strict'

const { MessageEmbed } = require('discord.js')

module.exports = async (client, channelCreate) => {
  const res = await client.functions.getDataSettings(client, channelCreate.guild.id)
  if (!res) return

  const channel = res.rows[0].channels.logs

  if (!res.rows[0].system.logs || !res.rows[0].logs_list.emojiCreate || channel === '0') return
  if (!channelCreate.guild.channels.cache.some(ch => ch.id === channel)) return
  if (!client.channels.cache.get(channel).permissionsFor(client.user.id).has('SEND_MESSAGES')) return

  const language = new (require(`../../i18n/${res.rows[0].language}`))()

  if (channelCreate.type === 'text' || channelCreate.type === 'news') {
    channelCreate.guild.channels.cache.get(channel).send(new MessageEmbed()
      .setColor(client.config.embed.color)
      .setTitle(language.get('LOGS_EVENTS').CHANNEL_CREATE[0])
      .addField(language.get('LOGS_EVENTS').CHANNEL_CREATE[4], channelCreate.name)
      .addField(language.get('LOGS_EVENTS').CHANNEL_CREATE[5], language.get('CHANNELINFO_TYPE')[channelCreate.type])
      .addField(language.get('LOGS_EVENTS').CHANNEL_CREATE[6], channelCreate.parent)
      .setTimestamp()
      .setFooter(client.user.username, client.user.avatarURL())
    )
    return
  }

  if (channelCreate.type === 'store') {
    channelCreate.guild.channels.cache.get(channel).send(new MessageEmbed()
      .setColor(client.config.embed.color)
      .setTitle(language.get('LOGS_EVENTS').CHANNEL_CREATE[1])
      .addField(language.get('LOGS_EVENTS').CHANNEL_CREATE[4], channelCreate.name)
      .addField(language.get('LOGS_EVENTS').CHANNEL_CREATE[5], language.get('CHANNELINFO_TYPE')[channelCreate.type])
      .addField(language.get('LOGS_EVENTS').CHANNEL_CREATE[6], channelCreate.parent)
      .setTimestamp()
      .setFooter(client.user.username, client.user.avatarURL())
    )
    return
  }

  if (channelCreate.type === 'voice') {
    channelCreate.guild.channels.cache.get(channel).send(new MessageEmbed()
      .setColor(client.config.embed.color)
      .setTitle(language.get('LOGS_EVENTS').CHANNEL_CREATE[2])
      .addField(language.get('LOGS_EVENTS').CHANNEL_CREATE[4], channelCreate.name)
      .addField(language.get('LOGS_EVENTS').CHANNEL_CREATE[5], language.get('CHANNELINFO_TYPE')[channelCreate.type])
      .addField(language.get('LOGS_EVENTS').CHANNEL_CREATE[6], channelCreate.parent)
      .setTimestamp()
      .setFooter(client.user.username, client.user.avatarURL())
    )
    return
  }

  if (channelCreate.type === 'category') {
    channelCreate.guild.channels.cache.get(channel).send(new MessageEmbed()
      .setColor(client.config.embed.color)
      .setTitle(language.get('LOGS_EVENTS').CHANNEL_CREATE[3])
      .addField(language.get('LOGS_EVENTS').CHANNEL_CREATE[4], channelCreate.name)
      .addField(language.get('LOGS_EVENTS').CHANNEL_CREATE[5], language.get('CHANNELINFO_TYPE')[channelCreate.type])
      .setTimestamp()
      .setFooter(client.user.username, client.user.avatarURL())
    )
  }
}
