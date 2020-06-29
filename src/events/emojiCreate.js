'use strict'

const Event = require('../classes/Event')
const { MessageEmbed } = require('discord.js')

module.exports = class EmojiCreate extends Event {
  async run (guildEmoji) {
    const res = await this.client.database.query('SELECT language, system, logs_list, channels FROM settings WHERE id = $1', [guildEmoji.guild.id])
    if (!res || !res.rows.length) {
      return
    }

    if (!res.rows[0].system.logs || !res.rows[0].logs_list.emojiCreate) {
      return
    }

    const channel = res.rows[0].channels.logs

    if (channel === '0' || !guildEmoji.guild.channels.cache.some(ch => ch.id === channel) || !this.client.channels.cache.get(channel).permissionsFor(this.client.user.id).has('SEND_MESSAGES')) {
      return
    }

    const language = new (require(`../i18n/${res.rows[0].language}`))()

    if (guildEmoji.guild.me.hasPermission('MANAGE_EMOJIS')) {
      guildEmoji.fetchAuthor().then(author => {
        guildEmoji.guild.channels.cache.get(channel).send(new MessageEmbed()
          .setColor(this.client.config.embed.color)
          .attachFiles(['../images/icons/camera.png'])
          .setAuthor('Logs', 'attachment://camera.png')
          .setTitle(language.get('LOGS_EVENTS').EMOJI_CREATED[0])
          .setThumbnail(guildEmoji.url)
          .addField(language.get('LOGS_EVENTS').EMOJI_CREATED[1], guildEmoji.name)
          .addField(language.get('LOGS_EVENTS').EMOJI_CREATED[2], guildEmoji.id)
          .addField(language.get('LOGS_EVENTS').EMOJI_CREATED[3], author.tag)
          .addField(language.get('LOGS_EVENTS').EMOJI_CREATED[4], guildEmoji.roles.cache.size === 0 ? language.get('LOGS_EVENTS').EMOJI_CREATED[5] : `${(guildEmoji.roles.cache.array().length > 10 ? `${guildEmoji.roles.cache.array().slice(0, 10).join(', ')} ${language.get('ROLE_MORE_SIZE', guildEmoji.roles.cache.array().length - 10)}` : guildEmoji.roles.cache.array().join(', '))}`)
          .setTimestamp()
          .setFooter(this.client.user.username, this.client.user.avatarURL())
        )
      })
      return
    }

    guildEmoji.guild.channels.cache.get(channel).send(new MessageEmbed()
      .setColor(this.client.config.embed.color)
      .attachFiles(['../images/icons/camera.png'])
      .setAuthor('Logs', 'attachment://camera.png')
      .setTitle(language.get('LOGS_EVENTS').EMOJI_CREATED[0])
      .setThumbnail(guildEmoji.url)
      .addField(language.get('LOGS_EVENTS').EMOJI_CREATED[1], guildEmoji.name)
      .addField(language.get('LOGS_EVENTS').EMOJI_CREATED[2], guildEmoji.id)
      .addField(language.get('LOGS_EVENTS').EMOJI_CREATED[4], guildEmoji.roles.cache.size === 0 ? language.get('LOGS_EVENTS').EMOJI_CREATED[5] : `${(guildEmoji.roles.cache.array().length > 10 ? `${guildEmoji.roles.cache.array().slice(0, 10).join(', ')} ${language.get('ROLE_MORE_SIZE', guildEmoji.roles.cache.array().length - 10)}` : guildEmoji.roles.cache.array().join(', '))}`)
      .setTimestamp()
      .setFooter(this.client.user.username, this.client.user.avatarURL())
    )
  }
}
