'use strict'

const {MessageEmbed} = require('discord.js')
const Command = require('../../../core/Command.js')

module.exports = class Antilink extends Command {
  constructor (client) {
    super(client, {
      name: 'mass-mentions',
      cooldown: 5,
      enabled: true,
      owner: false,
      plugin: false,
      aliases: ['anti-mass-mentions', 'anti-mentions'],
      permission: ['ADMINISTRATOR'],
      botpermissions: ['EMBED_LINKS', 'MANAGE_MESSAGES'],
      usage: (language, prefix) => language.get('MASSMENTIONS_USAGE', prefix),
      category: (language) => language.get('UTILS').GUILDADMIN_CATEGORY,
      examples: (language, prefix) => language.get('MASSMENTIONS_EXAMPLE', prefix)
    })
  }

  async run (message, args) {
    this.client.database.query('SELECT * FROM settings WHERE id = $1', [message.guild.id], async (err, res) => {
      if (err) return message.channel.send(message.language.get('UTILS').DATABASE_ERROR(err))

      const data = JSON.parse(res.rows[0].massmentions[0])

      switch (args[0]) {
        case 'add-role':

          const roleAdd = this.client.functions.roleFilter(message, args[1])

          if (!roleAdd) return message.channel.send(message.language.get('MASSMENTION')[0])
          if (data.roles.length !== 0 && data.roles.includes(roleAdd)) return message.channel.send(message.language.get('MASSMENTION')[1])

          if (data.roles.length === 15 && !data.premium) return message.channel.send(message.language.get('UTILS').ROLES_SIZE_PREMIUM(res.rows[0].prefix))

          data.push(roleAdd)
          this.client.database.query('UPDATE settings SET massmentions = $1 WHERE id = $2', [[data], message.guild.id])
          message.channel.send(message.language.get('ADDROLE', roleAdd))
          break

        case 'remove-role':

          const roleRemove = this.client.functions.roleFilter(message, args[1])

          if (!roleRemove) return message.channel.send(message.language.get('MASSMENTION')[0])
          if (data.roles.length === 0 || !data.roles.includes(roleRemove)) return message.channel.send(message.language.get('MASSMENTION')[2])

          const posRole = data.roles.indexOf(roleRemove)
          data.roles.splice(posRole, 1)
          this.client.database.query('UPDATE settings SET massmentions = $1 WHERE id = $2', [[data], message.guild.id])
          message.channel.send(message.language.get('REMOVEROLE', roleRemove))
          break

        case 'add-channel':
          const channelAdd = this.client.functions.channelFilter(message, args[1])

          if (!channelAdd) return message.channel.send(message.language.get('MASSMENTION')[3])
          if (data.channels.length !== 0 && data.channels.includes(channelAdd)) return message.channel.send(message.language.get('MASSMENTION')[4])

          if (data.roles.length === 15 && !data.premium) return message.channel.send(message.language.get('UTILS').CHANNELS_SIZE_PREMIUM(res.rows[0].prefix))

          if (message.guild.channels.cache.get(channelAdd).type === 'voice' || message.guild.channels.cache.get(channelAdd).type === 'category') return message.channel.send(message.language.get('MASSMENTION')[5])

          data.channels.push(channelAdd)
          this.client.database.query('UPDATE settings SET massmentions = $1 WHERE id = $2', [[data], message.guild.id])
          message.channel.send(message.language.get('ADDCHANNEL', channelAdd))
          break

        case 'remove-channel':
          const channelRemove = this.client.functions.channelFilter(message, args[1])

          if (!channelRemove) return message.channel.send(message.language.get('MASSMENTION')[3])
          if (data.channels.length === 0 && !data.channels.includes(channelRemove)) return message.channel.send(message.language.get('MASSMENTION')[6])

          const posChannel = data.channels.indexOf(channelRemove)
          data.channels.splice(posChannel, 1)
          this.client.database.query('UPDATE settings SET massmentions = $1 WHERE id = $2', [[data], message.guild.id])
          message.channel.send(message.language.get('REMOVECHANNEL', channelRemove))
          break

        case 'set-limit':
          if (!args[1] || isNaN(args[1]) || !Number.isInteger(args[1])) return message.channel.send(message.language.get('MASSMENTION')[7])
          if (args[1] <= 0 || args[0] > 20) return message.channel.send(message.language.get('MASSMENTION')[8])

          data.max = parseInt(args[1])

          this.client.database.query('UPDATE settings SET massmentions = $1 WHERE id = $2', [[data], message.guild.id])
          message.channel.send(message.language.get('SETLIMIT', args[1]))
          break

        case 'set-sanction':
          const embedSanction = new MessageEmbed()
            .setColor(this.client.config.embed.color)
            .setTitle(message.language.get('MASSMENTION')[9])
            .setDescription(message.language.get('MASSMENTION')[10])
            .setTimestamp()
            .setFooter(this.client.user.username, this.client.user.avatarURL())

          if (!args[0]) return message.channel.send(embedSanction)

          if (args[0] === '1' || args[0] === '2' || args[0] === '3') {
            data.sanction = parseInt(args[0])
            this.client.database.query('UPDATE settings SET massmentions = $1 WHERE id = $2', [[data], message.guild.id])
            return message.channel.send(message.language.get('SANCTION')[parseInt(args[0] - 1)])

          } else message.channel.send(message.language.get('SANCTION')[4])
          break

        case 'setup':
          const mentionRole = data.roles.map((role, i) => {
            if (!message.guild.roles.cache.get(role)) {
              data.roles.splice(i, 1)
              this.client.database.query('UPDATE settings SET massmentions = $1 WHERE id = $2', [[data], message.guild.id])
            } else {
              `• <@&${role}>`
            }
          })

          const mentionChannel = data.channels.map((channel, i) => {
            if (!message.guild.channels.cache.get(channel)) {
              data.roles.splice(i, 1)
              this.client.database.query('UPDATE settings SET massmentions = $1 WHERE id = $2', [[data], message.guild.id])
            } else {
              `• <#${channel}>`
            }
          })

          const embedSetup = new MessageEmbed()
            .setColor(this.client.config.embed.color)
            .setTimestamp()
            .setTitle(message.language.get('MASSMENTION')[11])
            .addField(message.language.get('MASSMENTION')[12], message.language.get('SANCTION')[data.sanction - 1])
            .addField(message.language.get('MASSMENTION')[13], `${mentionRole.length > 0 ? `${mentionRole.join(' \n').length > 1000 ? `${mentionRole.slice(0, 9).join(' \n')} ${message.language.get('UTILS').MORE_SIZE(mentionRole.length - 9)}` : mentionRole.join(' \n')}` : message.language.get('MASSMENTION')[14]}`)
            .addField(message.language.get('MASSMENTION')[15], `${mentionChannel.length > 0 ? `${mentionChannel.join(' \n').length > 1000 ? `${mentionChannel.slice(0, 9).join(' \n')} ${message.language.get('UTILS').MORE_SIZE(mentionChannel.length - 9)}` : mentionChannel.join(' \n')}` : message.language.get('MASSMENTION')[16]}`)
            .setFooter(this.client.user.username, this.client.user.avatarURL())

          message.channel.send(embedSetup)
          break

        default:
          const embed = new MessageEmbed()
            .setColor(this.client.config.embed.color)
            .setTimestamp()
            .setTitle(message.language.get('MASSMENTION')[17])
            .setDescription(message.language.get('MASSMENTION')[18])
            .setFooter(this.client.user.username, this.client.user.avatarURL())

          message.channel.send(embed)
          break
      }
    })
  }
}