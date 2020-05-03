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

          if (!role) return message.channel.send(message.language.get('ANTICAPS')[0])
          if (data.roles.length !== 0 && data.roles.includes(role)) return message.channel.send(message.language.get('ANTICAPS')[1])

          if (data.roles.length === 15 && !data.premium) return message.channel.send(message.language.get('UTILS').ROLES_SIZE_PREMIUM(res.rows[0].prefix))

          data.push(role)
          this.client.database.query('UPDATE settings SET anticaps = $1 WHERE id = $2', [[data], message.guild.id])
          message.channel.send(message.language.get('ADDROLE', role))
          break

        case 'removerole':
          if (!role) return message.channel.send(message.language.get('ANTICAPS')[0])
          if (data.roles.length === 0 || !data.roles.includes(role)) return message.channel.send(message.language.get('ANTICAPS')[2])

          const posRole = data.roles.indexOf(role)
          data.roles.splice(posRole, 1)
          this.client.database.query('UPDATE settings SET anticaps = $1 WHERE id = $2', [[data], message.guild.id])
          message.channel.send(message.language.get('REMOVEROLE', role))
          break

        case 'addchannel':
          if (!channel) return message.channel.send(message.language.get('ANTICAPS')[3])
          if (data.channels.length !== 0 && data.channels.includes(channel)) return message.channel.send(message.language.get('ANTICAPS')[4])

          if (data.roles.length === 15 && !data.premium) return message.channel.send(message.language.get('UTILS').CHANNELS_SIZE_PREMIUM(res.rows[0].prefix))

          if (message.guild.channels.cache.get(channel).type === 'voice' || message.guild.channels.cache.get(channel).type === 'category') return message.channel.send(message.language.get('ANTICAPS')[5])

          data.channels.push(channel)
          this.client.database.query('UPDATE settings SET anticaps = $1 WHERE id = $2', [[data], message.guild.id])
          message.channel.send(message.language.get('ADDCHANNEL', channel))
          break

        case 'removechannel':
          if (!channel) return message.channel.send(message.language.get('ANTICAPS')[3])
          if (data.channels.length === 0 && !data.channels.includes(channel)) return message.channel.send(message.language.get('ANTICAPS')[6])

          const posChannel = data.channels.indexOf(channel)
          data.channels.splice(posChannel, 1)
          this.client.database.query('UPDATE settings SET anticaps = $1 WHERE id = $2', [[data], message.guild.id])
          message.channel.send(message.language.get('REMOVECHANNEL', channel))
          break

        case 'setup':
          let mentionRole = []
          let mentionChannel = []

          for (const role of data.roles) {
            if (!message.guild.roles.cache.get(role)) {
              const pos = data.roles.indexOf(role)
              data.roles.splice(pos, 1)
            } else {
              mentionRole.push(`• <@&${role}>`)
            }
          }


          for (const channel of data.channels) {
            if (!message.guild.channels.cache.get(channel)) {
              const pos = data.channels.indexOf(channel)
              data.roles.splice(pos, 1)
            } else {
              mentionChannel.push(`• <#${channel}>`)
            }
          }

          const embedSetup = new MessageEmbed()
            .setColor(this.client.config.embed.color)
            .setTimestamp()
            .setTitle(message.language.get('ANTICAPS')[7])
            .addField(message.language.get('ANTICAPS')[8], `${mentionRole.length > 0 ? `${mentionRole.join(' \n').length > 1000 ? `${mentionRole.slice(0, 9).join(' \n')} ${message.language.get('UTILS').MORE_SIZE(mentionRole.length - 9)}` : mentionRole.join(' \n')}` : message.language.get('ANTICAPS')[9]}`)
            .addField(message.language.get('ANTICAPS')[10], `${mentionChannel.length > 0 ? `${mentionChannel.join(' \n').length > 1000 ? `${mentionChannel.slice(0, 9).join(' \n')} ${message.language.get('UTILS').MORE_SIZE(mentionChannel.length - 9)}` : mentionChannel.join(' \n')}` : message.language.get('ANTICAPS')[11]}`)
            .setFooter(this.client.user.username, this.client.user.avatarURL())

          message.channel.send(embedSetup)
          break

        default:
          const embed = new MessageEmbed()
            .setColor(this.client.config.embed.color)
            .setTimestamp()
            .setTitle(message.language.get('ANTICAPS')[12])
            .setDescription(message.language.get('ANTICAPS')[13])
            .setFooter(this.client.user.username, this.client.user.avatarURL())

          message.channel.send(embed)
          break
      }
    })
  }
}