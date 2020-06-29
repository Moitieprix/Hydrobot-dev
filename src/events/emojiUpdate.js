'use strict'

const Event = require('../classes/Event')
const { MessageEmbed } = require('discord.js')

module.exports = class EmojiUpdate extends Event {
  async run (oldEmoji, newEmoji) {
    const res = await this.client.database.query('SELECT language, system, logs_list, channels FROM settings WHERE id = $1', [oldEmoji.guild.id])
    if (!res || !res.rows.length) {
      return
    }

    if (!res.rows[0].system.logs || !res.rows[0].logs_list.emojiUpdate) {
      return
    }

    const channel = res.rows[0].channels.logs

    if (channel === '0' || !oldEmoji.guild.channels.cache.some(ch => ch.id === channel) || !this.client.channels.cache.get(channel).permissionsFor(this.client.user.id).has('SEND_MESSAGES')) {
      return
    }

    const language = new (require(`../i18n/${res.rows[0].language}`))()

    const embed = new MessageEmbed()
      .setColor(this.client.config.embed.color)
      .setTitle(language.get('LOGS_EVENTS').EMOJI_UPDATE[0])
      .addField(language.get('LOGS_EVENTS').EMOJI_UPDATE[1], newEmoji.name)
      .setTimestamp()
      .setFooter(this.client.user.username, this.client.user.avatarURL())

    if (oldEmoji.name !== newEmoji.name) {
      embed.addField(language.get('LOGS_EVENTS').EMOJI_UPDATE[2], `${language.get('LOGS_EVENTS').EMOJI_UPDATE[3]} ${oldEmoji.name} \n${language.get('LOGS_EVENTS').EMOJI_UPDATE[4]} ${newEmoji.name}`)
    }
    }
}