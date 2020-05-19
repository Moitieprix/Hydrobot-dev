'use strict'

const { MessageEmbed } = require('discord.js')
const Command = require('../../../core/Command.js')

module.exports = class Autorole extends Command {
  constructor (client) {
    super(client, {
      name: 'autorole',
      cooldown: 5,
      permission: ['ADMINISTRATOR'],
      botpermissions: ['EMBED_LINKS', 'MANAGE_ROLES'],
      usage: (language, prefix) => language.get('AUTOROLE_USAGE', prefix),
      category: (language) => language.get('UTILS').GUILDADMIN_CATEGORY,
      examples: (language, prefix) => language.get('AUTOROLE_EXAMPLE', prefix)
    })
  }

  async run (message, args) {
    const res = await this.client.functions.getDataSettings(this.client, message.guild.id, message)
    if (!res) return

    const data = res.rows[0].autorole

    const role = this.client.functions.roleFilter(message, args[1])
    const getRole = message.guild.roles.cache.get(role)

    switch (args[0]) {
      case 'add-role': {
        if (!role) return message.channel.send(message.language.get('AUTOROLE')[0])
        if (data.length !== 0 && data.includes(role)) return message.channel.send(message.language.get('AUTOROLE')[1])

        if (message.guild.member(this.client.user).roles.highest.position <= getRole.position) return message.channel.send(message.language.get('AUTOROLE')[2])

        if (data.length === 10 && !res.premium) return message.channel.send(message.language.get('UTILS').AUTOROLE_SIZE_PREMIUM(res.rows[0].prefix))

        this.client.database.query(`UPDATE settings SET autorole = array_cat(autorole, '{${role}}') WHERE id = $1`, [message.guild.id])
        message.channel.send(message.language.get('AUTOROLE_ADDROLE', role))
        break
      }

      case 'remove-role': {
        if (!role) return message.channel.send(message.language.get('AUTOROLE')[0])
        if (data === 0 || !data.includes(role)) return message.channel.send(message.language.get('AUTOROLE')[3])

        this.client.database.query(`UPDATE settings SET autorole = array_remove(autorole, '${role}') WHERE id = $1`, [message.guild.id])
        message.channel.send(message.language.get('AUTOROLE_REMOVEROLE', role))
        break
      }

      case 'roles': {
        const mentionRole = data.map(role => {
          if (!message.guild.roles.cache.get(role)) {
            this.client.database.query(`UPDATE settings SET autorole = array_remove(autorole, '{${role}}') WHERE id = $1`, [message.guild.id])
          } else {
            return `• <@&${role}>`
          }
        })

        const embedRoles = new MessageEmbed()
          .setColor(this.client.config.embed.color)
          .setTimestamp()
          .setTitle(message.language.get('AUTOROLE')[4])
          .setDescription(mentionRole.length > 0 ? mentionRole.join(' \n') : message.language.get('AUTOROLE')[5])
          .setFooter(this.client.user.username, this.client.user.avatarURL())

        message.channel.send(embedRoles)

        this.client.database.query('UPDATE settings SET autorole = $1 WHERE id = $2', [data, message.guild.id])
        break
      }

      default: {
        const embed = new MessageEmbed()
          .setColor(this.client.config.embed.color)
          .setTimestamp()
          .setTitle(message.language.get('AUTOROLE')[6])
          .setDescription(message.language.get('AUTOROLE')[7])
          .setFooter(this.client.user.username, this.client.user.avatarURL())

        message.channel.send(embed)
        break
      }
    }
  }
}
