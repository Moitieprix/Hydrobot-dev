'use strict'

const { MessageEmbed } = require('discord.js')

module.exports = async (client, message) => {
  if (message.channel.type === 'dm') return

  client.database.query('SELECT * FROM settings WHERE id = $1', [message.guild.id], async (_err, res) => {
    const channel = res.rows[0].channels.logs

    if (!res.rows[0].system.logs || !res.rows[0].logs_list.messageDelete || channel === '0') return
    if (!message.guild.channels.cache.some(ch => ch.id === channel)) return
    if (!client.channels.cache.get(channel).permissionsFor(client.user.id).has('SEND_MESSAGES')) return

    const language = new (require(`../../i18n/${res.rows[0].language}`))()

    if (message.partial) await message.fetch()

    const channelSend = message.guild.channels.cache.get(channel)

    if (message.content.length < 1023) {
      const embed = new MessageEmbed()
        .setColor(client.config.embed.color)
        .setTitle(language.get('LOGS_EVENTS').MSG_DELETED[0])
        .addField(language.get('LOGS_EVENTS').MSG_DELETED[1], `${message.author.tag} (ID: ${message.author.id})`)
        .addField(language.get('LOGS_EVENTS').MSG_DELETED[2], `<#${message.channel.id}>`)
        .addField(language.get('LOGS_EVENTS').MSG_DELETED[3], `${message.content}`)
        .setTimestamp()
        .setFooter(client.user.username, client.user.avatarURL())

      return channelSend.send(embed)
    } else {
      const embed = new MessageEmbed()
        .setColor(client.config.embed.color)
        .setTitle(language.get('LOGS_EVENTS').MSG_DELETED[0])
        .addField(language.get('LOGS_EVENTS').MSG_DELETED[1], `${message.author.tag} (ID: ${message.author.id})`)
        .addField(language.get('LOGS_EVENTS').MSG_DELETED[2], `<#${message.channel.id}>`)
        .attachFiles([{ name: 'messageDelete.txt', attachment: Buffer.from(message.content, 'utf8') }])
        .setTimestamp()
        .setFooter(client.user.username, client.user.avatarURL())

      return channelSend.send(embed)
    }
  })
}
