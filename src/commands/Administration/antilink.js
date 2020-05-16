'use strict'

const { MessageEmbed } = require('discord.js')
const Command = require('../../../core/Command.js')

module.exports = class Antilink extends Command {
  constructor (client) {
    super(client, {
      name: 'antilink',
      cooldown: 5,
      enabled: true,
      owner: false,
      plugin: false,
      aliases: ['anti-link', 'antiurl', 'anti-url'],
      permission: ['ADMINISTRATOR'],
      botpermissions: ['EMBED_LINKS', 'MANAGE_MESSAGES'],
      usage: (language, prefix) => language.get('ANTILINK_USAGE', prefix),
      category: (language) => language.get('UTILS').GUILDADMIN_CATEGORY,
      examples: (language, prefix) => language.get('ANTILINK_EXAMPLE', prefix)
    })
  }

  async run (message, args) {
    const res = await this.client.functions.getDataSettings(this.client, message.guild.id, message)
    if (!res) return

    const data = JSON.parse(res.rows[0].antilink)

    switch (args[0]) {
      case 'add-role': {
        const roleAdd = this.client.functions.roleFilter(message, args[1])

        if (!roleAdd) return message.channel.send(message.language.get('ANTILINK')[0])
        if (data.roles.length !== 0 && data.roles.includes(roleAdd)) return message.channel.send(message.language.get('ANTILINK')[1])

        this.client.database.query(`UPDATE settings SET antilink = jsonb_insert(antilink, '{roles, 0}', '"${roleAdd}"') WHERE id = $1`, [message.guild.id])
        message.channel.send(message.language.get('ADDROLE', roleAdd))
        break
      }

      case 'remove-role': {
        const roleRemove = this.client.functions.roleFilter(message, args[1])

        if (!roleRemove) return message.channel.send(message.language.get('ANTILINK')[0])
        if (data.roles.length === 0 || !data.roles.includes(roleRemove)) return message.channel.send(message.language.get('ANTILINK')[2])

        this.client.database.query(`UPDATE settings SET antilink = jsonb_set(antilink, '{roles}', (antilink->'roles') - '${roleRemove}') WHERE id = $1`, [message.guild.id])
        message.channel.send(message.language.get('REMOVEROLE', roleRemove))
        break
      }

      case 'add-channel': {
        const channelAdd = this.client.functions.channelFilter(message, args[1])

        if (!channelAdd) return message.channel.send(message.language.get('ANTILINK')[3])
        if (data.channels.length !== 0 && data.channels.includes(channelAdd)) return message.channel.send(message.language.get('ANTILINK')[4])

        if (message.guild.channels.cache.get(channelAdd).type === 'voice' || message.guild.channels.cache.get(channelAdd).type === 'category') return message.channel.send(message.language.get('ANTILINK')[5])

        this.client.database.query(`UPDATE settings SET antilink = jsonb_insert(antilink, '{channels, 0}', '"${channelAdd}"') WHERE id = $1`, [message.guild.id])
        message.channel.send(message.language.get('ADDCHANNEL', channelAdd))
        break
      }

      case 'remove-channel': {
        const channelRemove = this.client.functions.channelFilter(message, args[1])

        if (!channelRemove) return message.channel.send(message.language.get('ANTILINK')[3])
        if (data.channels.length === 0 && !data.channels.includes(channelRemove)) return message.channel.send(message.language.get('ANTILINK')[6])

        this.client.database.query(`UPDATE settings SET antilink = jsonb_set(antilink, '{channels}', (antilink->'channels') - '${channelRemove}') WHERE id = $1`, [message.guild.id])
        message.channel.send(message.language.get('REMOVECHANNEL', channelRemove))
        break
      }

      case 'set-sanction': {
        const embedSanction = new MessageEmbed()
          .setColor(this.client.config.embed.color)
          .setTitle(message.language.get('ANTILINK')[7])
          .setDescription(message.language.get('ANTILINK')[8])
          .setTimestamp()
          .setFooter(this.client.user.username, this.client.user.avatarURL())

        if (!args[0]) return message.channel.send(embedSanction)

        if (args[0] === '1' || args[0] === '2' || args[0] === '3') {
          this.client.database.query(`UPDATE settings SET antilink = jsonb_set(antilink, '{sanction}', '${parseInt(args[0])}') WHERE id = $1`, [message.guild.id])
          return message.channel.send(message.language.get('SANCTION')[parseInt(args[0]) - 1])
        } else {
          message.channel.send(message.language.get('SANCTION')[4])
        }
        break
      }

      case 'setup': {
        const mentionRole = data.roles.map(role => {
          if (!message.guild.roles.cache.get(role)) {
            this.client.database.query(`UPDATE settings SET antilink = jsonb_set(antilink, '{roles}', (antilink->'roles') - '${role}') WHERE id = $1`, [message.guild.id])
          } else {
            return `• <@&${role}>`.toString()
          }
        })

        const mentionChannel = data.channels.map(channel => {
          if (!message.guild.channels.cache.get(channel)) {
            this.client.database.query(`UPDATE settings SET antilink = jsonb_set(antilink, '{channels}', (antilink->'channels') - '${channel}') WHERE id = $1`, [message.guild.id])
          } else {
            return `• <#${channel}>`.toString()
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
      }

      default: {
        const embed = new MessageEmbed()
          .setColor(this.client.config.embed.color)
          .setTimestamp()
          .setTitle(message.language.get('ANTILINK')[15])
          .setDescription(message.language.get('ANTILINK')[16])
          .setFooter(this.client.user.username, this.client.user.avatarURL())

        message.channel.send(embed)
        break
      }
    }
  }
}
