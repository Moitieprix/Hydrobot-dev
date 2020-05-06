'use strict'

const {MessageEmbed} = require('discord.js')
const Command = require('../../../core/Command.js')

module.exports = class Badwords extends Command {
  constructor (client) {
    super(client, {
      name: 'badwords',
      enabled: true,
      owner: false,
      cooldown: 5,
      plugin: false,
      aliases: [],
      permission: ['ADMINISTRATOR'],
      botpermissions: ['EMBED_LINKS', 'MANAGE_MESSAGES'],
      usage: (language, prefix) => language.get('BADWORDS_USAGE', prefix),
      category: (language) => language.get('UTILS').GUILDADMIN_CATEGORY,
      examples: (language, prefix) => language.get('BADWORDS_EXAMPLE', prefix)
    })
  }

  async run (message, args) {
    this.client.database.query('SELECT * FROM settings WHERE id = $1', [message.guild.id], async (err, res) => {
      const data = JSON.parse(res.rows[0].badwords[0])

      const role = this.client.functions.roleFilter(message, args[1])
      const channel = this.client.functions.channelFilter(message, args[1])

      switch (args[0]) {
        case 'addrole':
          if (!role) return message.channel.send(message.language.get('BADWORDS')[0])
          if (data.roles.length !== 0 && data.roles.includes(role)) return message.channel.send(message.language.get('BADWORDS')[1])

          data.push(role)
          this.client.database.query('UPDATE settings SET badwords = $1 WHERE id = $2', [[data], message.guild.id])
          message.channel.send(message.language.get('ADDROLE', role))
          break

        case 'removerole':
          if (!role) return message.channel.send(message.language.get('BADWORDS')[0])
          if (data.roles.length === 0 || !data.roles.includes(role)) return message.channel.send(message.language.get('BADWORDS')[2])

          const posRole = data.roles.indexOf(role)
          data.roles.splice(posRole, 1)
          this.client.database.query('UPDATE settings SET badwords = $1 WHERE id = $2', [[data], message.guild.id])
          message.channel.send(message.language.get('REMOVEROLE', role))
          break

        case 'addchannel':
          if (!channel) return message.channel.send(message.language.get('BADWORDS')[3])
          if (data.channels.length !== 0 && data.channels.includes(channel)) return message.channel.send(message.language.get('BADWORDS')[4])

          if (message.guild.channels.cache.get(channel).type === 'voice' || message.guild.channels.cache.get(channel).type === 'category') return message.channel.send(message.language.get('BADWORDS')[5])

          data.channels.push(channel)
          this.client.database.query('UPDATE settings SET badwords = $1 WHERE id = $2', [[data], message.guild.id])
          message.channel.send(message.language.get('ADDCHANNEL', channel))
          break

        case 'removechannel':
          if (!channel) return message.channel.send(message.language.get('BADWORDS')[3])
          if (data.channels.length === 0 && !data.channels.includes(channel)) return message.channel.send(message.language.get('BADWORDS')[6])

          const posChannel = data.channels.indexOf(channel)
          data.channels.splice(posChannel, 1)
          this.client.database.query('UPDATE settings SET badwords = $1 WHERE id = $2', [[data], message.guild.id])
          message.channel.send(message.language.get('REMOVECHANNEL', channel))
          break

        case 'addword':
          if (!args[1]) return message.channel.send(message.language.get('BADWORDS')[7])
          if (data.words.length !== 0 && data.words.includes(args[1])) return message.channel.send('mot deja présent')

          data.words.push(args[1])
          this.client.database.query('UPDATE settings SET badwords = $1 WHERE id = $2', [[data], message.guild.id])
          message.channel.send(message.language.get('ADDWORD', args[1]))
          break

        case 'removeword':
          if (!args[1]) return message.channel.send('mot manquant')
          if (data.words.length === 0 && !data.words.includes(args[1])) return message.channel.send('mot non présent')

          const posWord = data.words.indexOf(args[1])
          data.words.splice(posWord, 1)
          this.client.database.query('UPDATE settings SET badwords = $1 WHERE id = $2', [[data], message.guild.id])
          message.channel.send(message.language.get('REMOVEWORD', args[1]))
          break

        case 'setsanction':
          const embedSanction = new MessageEmbed()
            .setColor(this.client.config.embed.color)
            .setTitle(message.language.get('BADWORDS')[8])
            .setDescription(message.language.get('BADWORDS')[9])
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
              this.client.database.query('UPDATE settings SET anticaps = $1 WHERE id = $2', [[data], message.guild.id])
            } else {
              `• <@&${role}>`
            }
          })

          const mentionChannel = data.channels.map((channel, i) => {
            if (!message.guild.channels.cache.get(channel)) {
              data.roles.splice(i, 1)
              this.client.database.query('UPDATE settings SET anticaps = $1 WHERE id = $2', [[data], message.guild.id])
            } else {
              `• <#${channel}>`
            }
          })

          const embedSetup = new MessageEmbed()
            .setColor(this.client.config.embed.color)
            .setTimestamp()
            .setTitle(message.language.get('BADWORDS')[10])
            .addField(message.language.get('BADWORDS')[11], message.language.get('SANCTION')[data.sanction - 1])
            .addField(message.language.get('BADWORDS')[12], data.words.length > 0 ? '•' + data.words.join(' \n•') : message.language.get('BADWORDS')[13])
            .addField(message.language.get('BADWORDS')[14], `${mentionRole.length > 0 ? `${mentionRole.join(' \n').length > 1000 ? `${mentionRole.slice(0, 9).join(' \n')} ${message.language.get('UTILS').MORE_SIZE(mentionRole.length - 9)}` : mentionRole.join(' \n')}` : message.language.get('ANTICAPS')[15]}`)
            .addField(message.language.get('BADWORDS')[16], `${mentionChannel.length > 0 ? `${mentionChannel.join(' \n').length > 1000 ? `${mentionChannel.slice(0, 9).join(' \n')} ${message.language.get('UTILS').MORE_SIZE(mentionChannel.length - 9)}` : mentionChannel.join(' \n')}` : message.language.get('ANTICAPS')[17]}`)
            .setFooter(this.client.user.username, this.client.user.avatarURL())

          message.channel.send(embedSetup)
          break

        default:
          const embed = new MessageEmbed()
            .setColor(this.client.config.embed.color)
            .setTimestamp()
            .setTitle(message.language.get('BADWORDS')[18])
            .setDescription(message.language.get('BADWORDS')[19])
            .setFooter(this.client.user.username, this.client.user.avatarURL())

          message.channel.send(embed)
          break

      }
    })

  }
}

