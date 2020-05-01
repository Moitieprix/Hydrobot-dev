'use strict'

const {MessageEmbed} = require('discord.js')
const Command = require('../../../core/Command.js')

module.exports = class Antilink extends Command {
  constructor (client) {
    super(client, {
      name: 'antilink',
      cooldown: 5,
      enabled: true,
      owner: false,
      plugin: false,
      aliases: [],
      permission: ['ADMINISTRATOR'],
      botpermissions: ['EMBED_LINKS', 'MANAGE_MESSAGES'],
      usage: (language, prefix) => language.get('ANTILINK_USAGE', prefix),
      category: (language) => language.get('UTILS').GUILDADMIN_CATEGORY,
      examples: (language, prefix) => language.get('ANTILINK_EXAMPLE', prefix)
    })
  }

  async run (message, args) {
    this.client.database.query('SELECT * FROM settings WHERE id = $1', [message.guild.id], async (err, res) => {
      if (err) return message.channel.send(message.language.get('UTILS').DATABASE_ERROR(err))

      const data = JSON.parse(res.rows[0].antilink[0])

      const role = this.client.functions.roleFilter(message, args[1])
      const channel = this.client.functions.channelFilter(message, args[1])

      switch (args[0]) {
        case 'addrole':

          if (!role) return message.channel.send(message.language.get('ANTILINK')[0])
          if (data.roles.length !== 0 && data.roles.includes(role)) return message.channel.send(message.language.get('ANTILINK')[1])

          data.roles.push(role)
          this.client.database.query('UPDATE settings SET antilink = $1 WHERE id = $2', [[data], message.guild.id])
          message.channel.send(message.language.get('ANTILINK_ADDROLE', role))
          break

        case 'removerole':

          if (!role) return message.channel.send(message.language.get('ANTILINK')[0])
          if (data.roles.length === 0 || !data.roles.includes(role)) return message.channel.send(message.language.get('ANTILINK')[2])

          const posRole = data.roles.indexOf(role)
          data.roles.splice(posRole, 1)
          this.client.database.query('UPDATE settings SET antilink = $1 WHERE id = $2', [[data], message.guild.id])
          message.channel.send(message.language.get('ANTILINK_REMOVEROLE', role))
          break

        case 'addchannel':

          if (!channel) return message.channel.send(message.language.get('ANTILINK')[3])
          if (data.channels.length !== 0 && data.channels.includes(channel)) return message.channel.send(message.language.get('ANTILINK')[4])

          if (message.guild.channels.cache.get(channel).type === 'voice' || message.guild.channels.cache.get(channel).type === 'category') return message.channel.send(message.language.get('ANTILINK')[5])

          data.channels.push(channel)
          this.client.database.query('UPDATE settings SET antilink = $1 WHERE id = $2', [[data], message.guild.id])
          message.channel.send(message.language.get('ANTILINK_ADDCHANNEL', channel))
          break

        case 'removechannel':
          if (!channel) return message.channel.send(message.language.get('ANTILINK')[3])
          if (data.channels.length === 0 && !data.channels.includes(channel)) return message.channel.send(message.language.get('ANTILINK')[6])

          const posChannel = data.channels.indexOf(channel)
          data.channels.splice(posChannel, 1)
          this.client.database.query('UPDATE settings SET antilink = $1 WHERE id = $2', [[data], message.guild.id])
          message.channel.send(message.language.get('ANTILINK_REMOVECHANNEL', channel))
          break

        case 'roles':
          let mentionRole = []

          for (const role of data.roles) {
            if (!message.guild.roles.cache.get(role)) {
              const pos = data.roles.indexOf(role)
              data.roles.splice(pos, 1)
            } else {
              mentionRole.push(`• <@&${role}>`)
            }
          }

          const embedRoles = new MessageEmbed()
            .setColor(this.client.config.embed.color)
            .setTimestamp()
            .setTitle(message.language.get('ANTILINK')[7])
            .setDescription(mentionRole.length > 0 ? mentionRole.join(' \n') : message.language.get('ANTILINK')[8])
            .setFooter(this.client.user.username, this.client.user.avatarURL())

          message.channel.send(embedRoles)
          break

        case 'channels':
          let mentionChannel = []

          for (const channel of data.channels) {
            if (!message.guild.channels.cache.get(channel)) {
              const pos = data.channels.indexOf(channel)
              data.channels.splice(pos, 1)
            } else {
              mentionChannel.push(`• <#${channel}>`)
            }
          }

          const embedChannel = new MessageEmbed()
            .setColor(this.client.config.embed.color)
            .setTimestamp()
            .setTitle(message.language.get('ANTILINK')[9])
            .setDescription(mentionChannel.length > 0 ? mentionChannel.join(' \n') : message.language.get('ANTILINK')[10])
            .setFooter(this.client.user.username, this.client.user.avatarURL())

          message.channel.send(embedChannel)
          break

        default:
          const embed = new MessageEmbed()
            .setColor(this.client.config.embed.color)
            .setTimestamp()
            .setTitle(message.language.get('ANTILINK')[11])
            .setDescription(message.language.get('ANTILINK')[12])
            .setFooter(this.client.user.username, this.client.user.avatarURL())

          message.channel.send(embed)
          break
      }
    })
  }
}
