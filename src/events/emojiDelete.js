'use strict'

const Event = require('../classes/Event')
const { MessageEmbed } = require('discord.js')

module.exports = class EmojiDelete extends Event {
  async run (guildEmoji) {
    const res = await this.client.database.query('SELECT language, system, logs_list, channels FROM settings WHERE id = $1', [guildEmoji.guild.id])
    if (!res || !res.rows.length) {
      return
    }

    if (!res.rows[0].system.logs || !res.rows[0].logs_list.emojiDelete) {
      return
    }

    const channel = res.rows[0].channels.logs

    if (channel === '0' || !guildEmoji.guild.channels.cache.some(ch => ch.id === channel) || !this.client.channels.cache.get(channel).permissionsFor(this.client.user.id).has('SEND_MESSAGES')) {
      return
    }

    const language = new (require(`../i18n/${res.rows[0].language}`))()

    guildEmoji.guild.channels.cache.get(channel).send(new MessageEmbed()
      .setColor(this.client.config.embed.color)
      .setTitle(language.get('LOGS_EVENTS').EMOJI_DELETE[0])
      .attachFiles(['../images/icons/camera.png'])
      .setAuthor('Logs', 'attachment://camera.png')
      .setThumbnail(guildEmoji.url)
      .addField(language.get('LOGS_EVENTS').EMOJI_DELETE[1], guildEmoji.name)
      .addField(language.get('LOGS_EVENTS').EMOJI_DELETE[2], guildEmoji.id)
      .setTimestamp()
      .setFooter(this.client.user.username, this.client.user.avatarURL())
    )
  }
}
