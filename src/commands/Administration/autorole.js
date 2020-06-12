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

  async run (message, args, res) {
    const data = res.rows[0].autorole

    switch (args[0]) {
      case 'add-role': {
        const role = await this.client.functions.roleFilter(message, args.shift())
        if (!role) return

        if (data.length && data.includes(role.id)) {
          message.channel.send(message.language.get('AUTOROLE')[0])
          return
        }

        if (message.guild.member(this.client.user).roles.highest.position <= role.position) {
          message.channel.send(message.language.get('AUTOROLE')[1])
          return
        }

        if (data.length === 10 && !res.premium) {
          message.channel.send(message.language.get('UTILS').AUTOROLE_SIZE_PREMIUM(res.rows[0].prefix))
          return
        }

        this.client.database.query(`UPDATE settings SET autorole = array_append(autorole, '${role.id}') WHERE id = $1`, [message.guild.id])
        message.channel.send(message.language.get('AUTOROLE_ADDROLE', role))
        break
      }

      case 'remove-role': {
        const role = await this.client.functions.roleFilter(message, args.shift())
        if (!role) return

        if (!data.length || !data.includes(role.id)) {
          message.channel.send(message.language.get('AUTOROLE')[2])
          return
        }

        this.client.database.query(`UPDATE settings SET autorole = array_remove(autorole, '${role.id}') WHERE id = $1`, [message.guild.id])
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

        message.channel.send(new MessageEmbed()
          .setColor(this.client.config.embed.color)
          .setTimestamp()
          .setTitle(message.language.get('AUTOROLE')[3])
          .setDescription(mentionRole.length > 0 ? mentionRole.join(' \n') : message.language.get('AUTOROLE')[4])
          .setFooter(this.client.user.username, this.client.user.avatarURL())
        )

        break
      }

      default: {
        message.channel.send(new MessageEmbed()
          .setColor(this.client.config.embed.color)
          .setTimestamp()
          .setTitle(message.language.get('AUTOROLE')[5])
          .setDescription(message.language.get('AUTOROLE')[6])
          .setFooter(this.client.user.username, this.client.user.avatarURL())
        )
        break
      }
    }
  }
}
