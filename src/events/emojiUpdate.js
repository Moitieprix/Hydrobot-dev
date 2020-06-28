'use strict'

const Event = require('../classes/Event')
const { MessageEmbed } = require('discord.js')

module.exports = class EmojiCreate extends Event {
  async run (oldEmoji, newEmoji) {
    const res = await this.client.database.query('SELECT language, system, logs_list, channels FROM settings WHERE id = $1', [oldEmoji.guild.id])
    if (!res || !res.rows.length) {
      return
    }

    if (!res.rows[0].system.logs || !res.rows[0].logs_list.emojiCreate) {
      return
    }

    const channel = res.rows[0].channels.logs

    if (channel === '0' || !oldEmoji.guild.channels.cache.some(ch => ch.id === channel) || !this.client.channels.cache.get(channel).permissionsFor(this.client.user.id).has('SEND_MESSAGES')) {
      return
    }

    const language = new (require(`../i18n/${res.rows[0].language}`))()
  }
}