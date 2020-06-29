'use strict'

const Event = require('../classes/Event')
const { MessageEmbed } = require('discord.js')

module.exports = class ChannelUpdate extends Event {
  async run (oldChannel, newChannel) {
    if (oldChannel.type === 'dm') {
      return
    }

    const res = await this.client.database.query('SELECT language, system, logs_list, channels FROM settings WHERE id = $1', [newChannel.guild.id])
    if (!res || !res.rows.length) {
      return
    }

    if (!res.rows[0].system.logs || !res.rows[0].logs_list.channelUpdate) {
      return
    }

    const channel = res.rows[0].channels.logs

    if (channel === '0' || !newChannel.guild.channels.cache.some(ch => ch.id === channel) || !this.client.channels.cache.get(channel).permissionsFor(this.client.user.id).has('SEND_MESSAGES')) {
      return
    }

    const language = new (require(`../i18n/${res.rows[0].language}`))()

    const embed = new MessageEmbed()
      .setColor(this.client.config.embed.color)
      .attachFiles(['../images/icons/camera.png'])
      .setAuthor('Logs', 'attachment://camera.png')
      .setTitle(oldChannel.type === 'category' ? language.get('LOGS_EVENTS').CHANNEL_UPDATE[1] : language.get('LOGS_EVENTS').CHANNEL_UPDATE[0])
      .addField(oldChannel.type === 'category' ? language.get('LOGS_EVENTS').CHANNEL_UPDATE[34] : language.get('LOGS_EVENTS').CHANNEL_UPDATE[2], `${newChannel.name} (${newChannel.id})`)
      .setTimestamp()
      .setFooter(this.client.user.username, this.client.user.avatarURL())

    if (oldChannel.name !== newChannel.name) {
      embed.addField(language.get('LOGS_EVENTS').CHANNEL_UPDATE[3], `${language.get('LOGS_EVENTS').CHANNEL_UPDATE[4]} **${oldChannel.name}** \n${language.get('LOGS_EVENTS').CHANNEL_UPDATE[5]} **${newChannel.name}**`)
    }

    if (oldChannel.parent !== newChannel.parent) {
      embed.addField(language.get('LOGS_EVENTS').CHANNEL_UPDATE[12], `${language.get('LOGS_EVENTS').CHANNEL_UPDATE[13]} **${oldChannel.parent}** \n${language.get('LOGS_EVENTS').CHANNEL_UPDATE[14]} **${newChannel.parent}**`)
    }

    if (oldChannel.bitrate !== newChannel.bitrate) {
      embed.addField(language.get('LOGS_EVENTS').CHANNEL_UPDATE[27], `${language.get('LOGS_EVENTS').CHANNEL_UPDATE[28]} **${oldChannel.bitrate / 1000} kbps** \n${language.get('LOGS_EVENTS').CHANNEL_UPDATE[29]} **${newChannel.bitrate / 1000} kbps**`)
    }

    if (oldChannel.userLimit !== newChannel.userLimit) {
      embed.addField(language.get('LOGS_EVENTS').CHANNEL_UPDATE[21], `${language.get('LOGS_EVENTS').CHANNEL_UPDATE[22]} **${oldChannel.userLimit === 0 ? language.get('LOGS_EVENTS').CHANNEL_UPDATE[30] : oldChannel.userLimit}** \n${language.get('LOGS_EVENTS').CHANNEL_UPDATE[23]} **${newChannel.userLimit === 0 ? language.get('LOGS_EVENTS').CHANNEL_UPDATE[30] : newChannel.userLimit}**`)
    }

    if (oldChannel.rateLimitPerUser !== newChannel.rateLimitPerUser) {
      embed.addField(language.get('LOGS_EVENTS').CHANNEL_UPDATE[6], `${language.get('LOGS_EVENTS').CHANNEL_UPDATE[7]} **${oldChannel.rateLimitPerUser === 0 ? language.get('LOGS_EVENTS').CHANNEL_UPDATE[31] : this.client.functions.getDuration(oldChannel.rateLimitPerUser * 1000)}** \n${language.get('LOGS_EVENTS').CHANNEL_UPDATE[8]} **${newChannel.rateLimitPerUser === 0 ? language.get('LOGS_EVENTS').CHANNEL_UPDATE[31] : this.client.functions.getDuration(newChannel.rateLimitPerUser * 1000)}**`)
    }

    if (oldChannel.nsfw !== newChannel.nsfw) {
      embed.addField(language.get('LOGS_EVENTS').CHANNEL_UPDATE[9], newChannel.nsfw ? language.get('LOGS_EVENTS').CHANNEL_UPDATE[10] : language.get('LOGS_EVENTS').CHANNEL_UPDATE[11])
    }

    if (oldChannel.topic !== newChannel.topic) {
      if (oldChannel.topic.length + newChannel.topic.length < 900) {
        embed.addField(language.get('LOGS_EVENTS').CHANNEL_UPDATE[24], `${language.get('LOGS_EVENTS').CHANNEL_UPDATE[25]} \n${oldChannel.topic ? oldChannel.topic : language.get('LOGS_EVENTS').CHANNEL_UPDATE[32]} \n\n${language.get('LOGS_EVENTS').CHANNEL_UPDATE[26]} \n${newChannel.topic ? newChannel.topic : language.get('LOGS_EVENTS').CHANNEL_UPDATE[32]}`)
      } else {
        embed.attachFiles([{ name: 'Topic_channelUpdate.txt', attachment: Buffer.from(`${language.get('LOGS_EVENTS').CHANNEL_UPDATE[25]} : \n${oldChannel.topic ? oldChannel.topic : language.get('LOGS_EVENTS').CHANNEL_UPDATE[32]} \n\n${language.get('LOGS_EVENTS').CHANNEL_UPDATE[26]} \n${newChannel.topic ? newChannel.topic : language.get('LOGS_EVENTS').CHANNEL_UPDATE[32]}`, 'utf8') }])
        embed.addField(language.get('LOGS_EVENTS').CHANNEL_UPDATE[24], language.get('LOGS_EVENTS').CHANNEL_UPDATE[33])
      }
    }

    if (embed.fields.length > 1) {
      oldChannel.guild.channels.cache.get(channel).send(embed)
      return
    }

    if (oldChannel.permissionOverwrites !== newChannel.permissionOverwrites) {
      if (oldChannel.permissionOverwrites.size > newChannel.permissionOverwrites.size) {
        oldChannel.permissionOverwrites.map(role => {
          if (!newChannel.permissionOverwrites.has(role.id)) {
            oldChannel.guild.channels.cache.get(channel).send(new MessageEmbed()
              .setColor(this.client.config.embed.color)
              .attachFiles(['../images/icons/camera.png'])
              .setAuthor('Logs', 'attachment://camera.png')
              .setTitle(oldChannel.type === 'category' ? language.get('LOGS_EVENTS').CHANNEL_UPDATE[1] : language.get('LOGS_EVENTS').CHANNEL_UPDATE[0])
              .addField(oldChannel.type === 'category' ? language.get('LOGS_EVENTS').CHANNEL_UPDATE[34] : language.get('LOGS_EVENTS').CHANNEL_UPDATE[2], `${newChannel.name} (${newChannel.id})`)
              .addField(language.get('LOGS_EVENTS').CHANNEL_UPDATE[15], `${language.get('LOGS_EVENTS').CHANNEL_UPDATE[17]} ${oldChannel.guild.roles.cache.get(role.id).toString()}`)
              .setTimestamp()
              .setFooter(this.client.user.username, this.client.user.avatarURL())
            )
          }
        })
        return
      }
      if (oldChannel.permissionOverwrites.size < newChannel.permissionOverwrites.size) {
        newChannel.permissionOverwrites.map(role => {
          if (!oldChannel.permissionOverwrites.has(role.id)) {
            oldChannel.guild.channels.cache.get(channel).send(new MessageEmbed()
              .setColor(this.client.config.embed.color)
              .attachFiles(['../images/icons/camera.png'])
              .setAuthor('Logs', 'attachment://camera.png')
              .setTitle(oldChannel.type === 'category' ? language.get('LOGS_EVENTS').CHANNEL_UPDATE[1] : language.get('LOGS_EVENTS').CHANNEL_UPDATE[0])
              .addField(oldChannel.type === 'category' ? language.get('LOGS_EVENTS').CHANNEL_UPDATE[34] : language.get('LOGS_EVENTS').CHANNEL_UPDATE[2], `${newChannel.name} (${newChannel.id})`)
              .addField(language.get('LOGS_EVENTS').CHANNEL_UPDATE[15], `${language.get('LOGS_EVENTS').CHANNEL_UPDATE[16]} ${oldChannel.guild.roles.cache.get(role.id).toString()}`)
              .setTimestamp()
              .setFooter(this.client.user.username, this.client.user.avatarURL())
            )
          }
        })
        return
      }

      if (oldChannel.permissionOverwrites.size === newChannel.permissionOverwrites.size) {
        newChannel.permissionOverwrites.map(role => {
          if (role !== oldChannel.permissionOverwrites.get(role.id)) {
            const embed = new MessageEmbed()
              .setColor(this.client.config.embed.color)
              .attachFiles(['../images/icons/camera.png'])
              .setAuthor('Logs', 'attachment://camera.png')
              .setTitle(oldChannel.type === 'category' ? language.get('LOGS_EVENTS').CHANNEL_UPDATE[1] : language.get('LOGS_EVENTS').CHANNEL_UPDATE[0])
              .addField(oldChannel.type === 'category' ? language.get('LOGS_EVENTS').CHANNEL_UPDATE[34] : language.get('LOGS_EVENTS').CHANNEL_UPDATE[2], `${newChannel.name} (${newChannel.id})`)
              .setTimestamp()
              .setFooter(this.client.user.username, this.client.user.avatarURL())

            const allow = []
            const neutral = []
            const deny = []

            const permOldRoleAllow = Object.entries(oldChannel.permissionOverwrites.get(role.id).allow.serialize())
            const permOldRoleDeny = oldChannel.permissionOverwrites.get(role.id).deny.serialize()

            const permNewRoleAllow = role.allow.serialize()
            const permNewRoleDeny = role.deny.serialize()

            for (const permission of permOldRoleAllow) {
              if (!permission[1] && permNewRoleAllow[permission[0]]) {
                allow.push(permission[0])
              }
              if (!permOldRoleDeny[permission[0]] && permNewRoleDeny[permission[0]]) {
                deny.push(permission[0])
              }
              if ((permission[1] && !permNewRoleAllow[permission[0]] && !permNewRoleDeny[permission[0]]) || (permOldRoleDeny[permission[0]] && !permNewRoleAllow[permission[0]] && !permNewRoleDeny[permission[0]])) {
                neutral.push(permission[0])
              }
            }

            if (allow.length) {
              embed.addField(language.get('LOGS_EVENTS').CHANNEL_UPDATE[18], allow.map(flag => `\`${flag}\``).join(' \n'))
            }
            if (neutral.length) {
              embed.addField(language.get('LOGS_EVENTS').CHANNEL_UPDATE[19], neutral.map(flag => `\`${flag}\``).join(' \n'))
            }
            if (deny.length) {
              embed.addField(language.get('LOGS_EVENTS').CHANNEL_UPDATE[20], deny.map(flag => `\`${flag}\``).join(' \n'))
            }

            if (embed.fields.length > 1) {
              oldChannel.guild.channels.cache.get(channel).send(embed)
            }
          }
        })
      }
    }
  }
}
