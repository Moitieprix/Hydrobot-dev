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
          message.channel.send(message.language.get('ADDROLE', role))
          break

        case 'removerole':

          if (!role) return message.channel.send(message.language.get('ANTILINK')[0])
          if (data.roles.length === 0 || !data.roles.includes(role)) return message.channel.send(message.language.get('ANTILINK')[2])

          const posRole = data.roles.indexOf(role)
          data.roles.splice(posRole, 1)
          this.client.database.query('UPDATE settings SET antilink = $1 WHERE id = $2', [[data], message.guild.id])
          message.channel.send(message.language.get('REMOVEROLE', role))
          break

        case 'addchannel':

          if (!channel) return message.channel.send(message.language.get('ANTILINK')[3])
          if (data.channels.length !== 0 && data.channels.includes(channel)) return message.channel.send(message.language.get('ANTILINK')[4])

          if (message.guild.channels.cache.get(channel).type === 'voice' || message.guild.channels.cache.get(channel).type === 'category') return message.channel.send(message.language.get('ANTILINK')[5])

          data.channels.push(channel)
          this.client.database.query('UPDATE settings SET antilink = $1 WHERE id = $2', [[data], message.guild.id])
          message.channel.send(message.language.get('ADDCHANNEL', channel))
          break

        case 'removechannel':
          if (!channel) return message.channel.send(message.language.get('ANTILINK')[3])
          if (data.channels.length === 0 && !data.channels.includes(channel)) return message.channel.send(message.language.get('ANTILINK')[6])

          const posChannel = data.channels.indexOf(channel)
          data.channels.splice(posChannel, 1)
          this.client.database.query('UPDATE settings SET antilink = $1 WHERE id = $2', [[data], message.guild.id])
          message.channel.send(message.language.get('REMOVECHANNEL', channel))
          break

        case 'setsanction':
          const embedSanction = new MessageEmbed()
            .setColor(this.client.config.embed.color)
            .setTitle(message.language.get('ANTILINK')[7])
            .setDescription(message.language.get('ANTILINK')[8])
            .setTimestamp()
            .setFooter(this.client.user.username, this.client.user.avatarURL())

          if (!args[0]) return message.channel.send(embedSanction)

          if (args[0] === '1' || args[0] === '2' || args[0] === '3') {
            data.sanction = parseInt(args[0])
            this.client.database.query('UPDATE settings SET antilink = $1 WHERE id = $2', [[data], message.guild.id])
            return message.channel.send(message.language.get('SANCTION')[parseInt(args[0] - 1)])

          } else message.channel.send(message.language.get('SANCTION')[4])
          break

        case 'setup':
          const mentionRole = data.roles.map((role, i) => {
            if (!message.guild.roles.cache.get(role)) {
              data.roles.splice(i, 1)
              this.client.database.query('UPDATE settings SET antilink = $1 WHERE id = $2', [[data], message.guild.id])
            } else {
              `• <@&${role}>`
            }
          })

          const mentionChannel = data.channels.map((channel, i) => {
            if (!message.guild.channels.cache.get(channel)) {
              data.roles.splice(i, 1)
              this.client.database.query('UPDATE settings SET antilink = $1 WHERE id = $2', [[data], message.guild.id])
            } else {
              `• <#${channel}>`
            }
          })

          const embedSetup = new MessageEmbed()
            .setColor(this.client.config.embed.color)
            .setTimestamp()
            .setTitle(message.language.get('ANTILINK')[9])
            .addField(message.language.get('ANTILINK')[10], message.language.get('SANCTION')[data.sanction - 1])
            .addField(message.language.get('ANTILINK')[11], `${mentionRole.length > 0 ? `${mentionRole.join(' \n').length > 1000 ? `${mentionRole.slice(0, 9).join(' \n')} ${message.language.get('UTILS').MORE_SIZE(mentionRole.length - 9)}` : mentionRole.join(' \n')}` : message.language.get('ANTILINK')[12]}`)
            .addField(message.language.get('ANTILINK')[13], `${mentionChannel.length > 0 ? `${mentionChannel.join(' \n').length > 1000 ? `${mentionChannel.slice(0, 9).join(' \n')} ${message.language.get('UTILS').MORE_SIZE(mentionChannel.length - 9)}` : mentionChannel.join(' \n')}` : message.language.get('ANTILINK')[14]}`)
            .setFooter(this.client.user.username, this.client.user.avatarURL())

          message.channel.send(embedSetup)

          break

        default:
          const embed = new MessageEmbed()
            .setColor(this.client.config.embed.color)
            .setTimestamp()
            .setTitle(message.language.get('ANTILINK')[15])
            .setDescription(message.language.get('ANTILINK')[16])
            .setFooter(this.client.user.username, this.client.user.avatarURL())

          message.channel.send(embed)
          break
      }
    })
  }
}
