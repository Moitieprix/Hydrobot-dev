'use strict'

const { MessageEmbed } = require('discord.js')

module.exports = async (client, guildEmoji) => {
  client.database.query('SELECT * FROM settings WHERE id = $1', [guildEmoji.guild.id], async (_err, res) => {
    const channel = res.rows[0].channels.logs

    if (!res.rows[0].system.logs || !res.rows[0].logs_list.emojiCreate || channel === '0') return
    if (!guildEmoji.guild.channels.cache.some(ch => ch.id === channel)) return
    if (!client.channels.cache.get(channel).permissionsFor(client.user.id).has('SEND_MESSAGES')) return

    const language = new (require(`../../i18n/${res.rows[0].language}`))()

    const embed = new MessageEmbed()
      .setColor(client.config.embed.color)
      .setTitle(language.get('LOGS').EMOJI_CREATED[0])
      .setThumbnail(guildEmoji.url)
      .addField(language.get('LOGS').EMOJI_CREATED[1], guildEmoji.name)
      .addField(language.get('LOGS').EMOJI_CREATED[2], guildEmoji.id)
      .setTimestamp()
      .setFooter(client.user.username, client.user.avatarURL())

    return guildEmoji.guild.channels.cache.get(channel).send(embed)
  })
}
