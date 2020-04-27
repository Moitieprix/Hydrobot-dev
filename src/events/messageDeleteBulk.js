'use strict'

const { MessageEmbed } = require('discord.js')

module.exports = async (client, messages) => {
  const messagesArray = Array.from(messages.values())

  if (messagesArray[1].channel.type === 'dm') return

  client.database.query('SELECT * FROM settings WHERE id = $1', [messagesArray[0].guild.id], async (err, res) => {

    const channel = res.rows[0].channels.logs

    if (!res.rows[0].system.logs || !res.rows[0]['logs_list']['messageDeleteBulk'] || channel === '0') return
    if (!messagesArray[1].guild.channels.cache.some(ch => ch.id === channel)) return
    if (!client.channels.cache.get(channel).permissionsFor(client.user.id).has('SEND_MESSAGES')) return

    const language = new (require(`../../i18n/${res.rows[0].language}`))

    const messagesContent = messagesArray.map(message => `**[${message.author.tag} • ${message.author.id}]** \n${message.content}`).join('\n\n')

    if (messagesContent.length < 2000) {
      const embed = new MessageEmbed()
        .setColor(client.config.embed.color)
        .setTimestamp()
        .setTitle(language.get('LOGS').MSG_DELETE_BULK[0])
        .setDescription(`${language.get('LOGS').MSG_DELETE_BULK[1]} ${messagesArray.length} \n${language.get('LOGS').MSG_DELETE_BULK[2]} <#${channel.id}> \n\n${messagesContent}`)
        .setFooter(client.user.username, client.user.avatarURL());

      return client.channels.cache.get(channel).send(embed)
    } else {
      const embed = new MessageEmbed()
        .setColor(client.config.embed.color)
        .setTimestamp()
        .setTitle(language.get('LOGS').MSG_DELETE_BULK[0])
        .setDescription(`${language.get('LOGS').MSG_DELETE_BULK[1]} ${messagesArray.length} \\n${language.get('LOGS').MSG_DELETE_BULK[2]} <#${messagesArray[0].channel.id}>`)
        .attachFiles([{ name: 'messageDeleteBulk.txt', attachment: Buffer.from(messagesContent, 'utf8') }])
        .setFooter(client.user.username, client.user.avatarURL());

      return messagesArray[0].channels.cache.get(channel).send(embed)
    }

  })
}