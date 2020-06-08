'use strict'

const { MessageEmbed } = require('discord.js')

module.exports = async (client, oldMessage, newMessage) => {
  if (oldMessage.channel.type === 'dm') return

  client.database.query('SELECT * FROM settings WHERE id = $1', [oldMessage.guild.id], async (_err, res) => {
    const channel = res.rows[0].channels.logs

    if (!res.rows[0].system.logs || !res.rows[0].logs_list.messageUpdate || channel === '0') return
    if (!oldMessage.guild.channels.cache.some(ch => ch.id === channel)) return
    if (!client.channels.cache.get(channel).permissionsFor(client.user.id).has('SEND_MESSAGES')) return

    const language = new (require(`../../i18n/${res.rows[0].language}`))()

    if (oldMessage.partial) await oldMessage.fetch()
    if (newMessage.partial) await newMessage.fetch()

    const channelSend = newMessage.guild.channels.cache.get(channel)

    if (oldMessage.content !== newMessage.content) {
      if (oldMessage.content.length < 1023 || newMessage.content.length < 1023) {
        const embed = new MessageEmbed()
          .setColor(client.config.embed.color)
          .setTitle(language.get('LOGS_EVENTS').MSG_UPDATED[0])
          .setDescription(`[[${language.get('LOGS_EVENTS').MSG_UPDATED[5]}]](https://discordapp.com/channels/${newMessage.guild.id}/${newMessage.channel.id}/${newMessage.id})`)
          .addField(language.get('LOGS_EVENTS').MSG_UPDATED[1], `${oldMessage.author.tag} (ID: ${oldMessage.author.id})`)
          .addField(language.get('LOGS_EVENTS').MSG_UPDATED[2], `<#${oldMessage.channel.id}>`)
          .addField(language.get('LOGS_EVENTS').MSG_UPDATED[3], `${oldMessage.content}`)
          .addField(language.get('LOGS_EVENTS').MSG_UPDATED[4], `${newMessage.content}`)
          .setTimestamp()
          .setFooter(client.user.username, client.user.avatarURL())

        channelSend.send(embed)
      } else {
        const fileContent = `${language.get('LOGS_EVENTS').MSG_UPDATED[3]} \n${oldMessage.content} \n\n\n${language.get('LOGS').MSG_UPDATED[4]} \n${newMessage.content}`

        const embed = new MessageEmbed()
          .setColor(client.config.embed.color)
          .setTitle(language.get('LOGS_EVENTS').MSG_UPDATED[0])
          .setDescription(`[[${language.get('LOGS_EVENTS').MSG_UPDATED[5]}]](https://discordapp.com/channels/${newMessage.guild.id}/${newMessage.channel.id}/${newMessage.id})`)
          .addField(language.get('LOGS_EVENTS').MSG_UPDATED[1], `${oldMessage.author.tag} (ID: ${oldMessage.author.id})`)
          .addField(language.get('LOGS_EVENTS').MSG_UPDATED[2], `<#${oldMessage.channel.id}>`)
          .attachFiles([{ name: 'messageUpdate.txt', attachment: Buffer.from(fileContent, 'utf8') }])
          .setTimestamp()
          .setFooter(client.user.username, client.user.avatarURL())

        channelSend.send(embed)
      }
    } else if (!oldMessage.pinned && newMessage.pinned) {
      const embed = new MessageEmbed()
        .setColor(client.config.embed.color)
        .setTitle(language.get('LOGS_EVENTS').MSG_UPDATED[6])
        .setDescription(`[[${language.get('LOGS_EVENTS').MSG_UPDATED[5]}]](https://discordapp.com/channels/${newMessage.guild.id}/${newMessage.channel.id}/${newMessage.id})`)
        .addField(language.get('LOGS_EVENTS').MSG_UPDATED[8], `<#${oldMessage.channel.id}>`)
        .setTimestamp()
        .setFooter(client.user.username, client.user.avatarURL())

      channelSend.send(embed)
    } else if (oldMessage.pinned && !newMessage.pinned) {
      const embed = new MessageEmbed()
        .setColor(client.config.embed.color)
        .setTitle(language.get('LOGS_EVENTS').MSG_UPDATED[7])
        .setDescription(`[[${language.get('LOGS_EVENTS').MSG_UPDATED[5]}]](https://discordapp.com/channels/${newMessage.guild.id}/${newMessage.channel.id}/${newMessage.id})`)
        .addField(language.get('LOGS_EVENTS').MSG_UPDATED[9], `<#${oldMessage.channel.id}>`)
        .setTimestamp()
        .setFooter(client.user.username, client.user.avatarURL())

      channelSend.send(embed)
    }
  })
}
