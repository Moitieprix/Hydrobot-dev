'use strict'

const {MessageEmbed} = require('discord.js')
const Command = require('../../../core/Command.js')

module.exports = class Antilink extends Command {
  constructor (client) {
    super(client, {
      name: 'anticaps',
      cooldown: 5,
      enabled: true,
      owner: false,
      plugin: false,
      aliases: [],
      permission: ['ADMINISTRATOR'],
      botpermissions: ['EMBED_LINKS', 'MANAGE_MESSAGES'],
      usage: (language, prefix) => language.get('ANTICAPS_USAGE', prefix),
      category: (language) => language.get('UTILS').GUILDADMIN_CATEGORY,
      examples: (language, prefix) => language.get('ANTICAPS_EXAMPLE', prefix)
    })
  }

  async run (message, args) {
    this.client.database.query('SELECT * FROM settings WHERE id = $1', [message.guild.id], async (err, res) => {
      if (err) return message.channel.send(message.language.get('UTILS').DATABASE_ERROR(err))

      const data = JSON.parse(res.rows[0].anticaps[0])
      const role = this.client.functions.roleFilter(message, args[1])
      const channel = this.client.functions.channelFilter(message, args[1])

      switch (args[0]) {
        case 'addrole':

          if (!role) return message.channel.send(message.language.get('AUTOMOD').ROLES_ERROR[0])
          if (data.roles.length !== 0 && data.roles.includes(role)) return message.channel.send(message.language.get('AUTOMOD').ROLES_ERROR[1])

          data.push(role)
          this.client.database.query('UPDATE settings SET anticaps = $1 WHERE id = $2', [[data], message.guild.id])
          message.channel.send(message.language.get('AUTOMOD').ADDROLE(role))
          break

        case 'removerole':
          if (!role) return message.channel.send(message.language.get('AUTOMOD').ROLES_ERROR[0])
          if (data.roles.length === 0 || !data.roles.includes(role)) return message.channel.send(message.language.get('AUTOMOD').ROLES_ERROR[2])

          const posRole = data.roles.indexOf(role)
          data.roles.splice(posRole, 1)
          this.client.database.query('UPDATE settings SET anticaps = $1 WHERE id = $2', [[data], message.guild.id])
          message.channel.send(message.language.get('AUTOMOD').REMOVEROLE(role))
          break

        case 'addchannel':
          if (!channel) return message.channel.send(message.language.get('AUTOMOD').CHANNELS_ERROR[0])
          if (data.channels.length !== 0 && data.channels.includes(channel)) return message.channel.send(message.language.get('AUTOMOD').CHANNELS_ERROR[1])

          if (message.guild.channels.cache.get(channel).type === 'voice' || message.guild.channels.cache.get(channel).type === 'category') return message.channel.send('Uniquement un salon textuel')

          data.channels.push(channel)
          this.client.database.query('UPDATE settings SET anticaps = $1 WHERE id = $2', [[data], message.guild.id])
          message.channel.send(message.language.get('AUTOMOD').ADDCHANNEL(channel))
          break

        case 'removechannel':
          if (!channel) return message.channel.send(message.language.get('AUTOMOD').CHANNELS_ERROR[0])
          if (data.channels.length === 0 && !data.channels.includes(channel)) return message.channel.send(message.language.get('AUTOMOD').CHANNELS_ERROR[2])

          const posChannel = data.channels.indexOf(channel)
          data.channels.splice(posChannel, 1)
          this.client.database.query('UPDATE settings SET anticaps = $1 WHERE id = $2', [[data], message.guild.id])
          message.channel.send(message.language.get('AUTOMOD').REMOVECHANNEL(channel))
          break

        default:
          const embed = new MessageEmbed()
            .setColor(this.client.config.embed.color)
            .setTimestamp()
            .setTitle(message.language.get('AUTOMOD').ANTICAPS[4])
            .setDescription(message.language.get('AUTOMOD').ANTICAPS[5])
            .setFooter(this.client.user.username, this.client.user.avatarURL())

          message.channel.send(embed)
          break
      }
    })
  }
}