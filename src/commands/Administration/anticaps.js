'use strict'

const { MessageEmbed } = require('discord.js')
const Command = require('../../classes/Command')

module.exports = class Anticaps extends Command {
  constructor (client) {
    super(client, {
      name: 'anticaps',
      cooldown: 5,
      aliases: ['anti-caps', 'capslock', 'anticapslock', 'anti-capslock'],
      permission: ['ADMINISTRATOR'],
      botpermissions: ['EMBED_LINKS', 'MANAGE_MESSAGES'],
      usage: (language, prefix) => language.get('ANTICAPS_USAGE', prefix),
      category: (language) => language.get('UTILS').GUILDADMIN_CATEGORY,
      examples: (language, prefix) => language.get('ANTICAPS_EXAMPLE', prefix)
    })
  }

  async run (message, args, res) {
    const data = res.rows[0].anticaps

    switch (args[0]) {
      case 'add-role': {
        const role = await this.client.functions.roleFilter(message, args.shift())
        if (!role) {
          return
        }

        if (data.roles.length && data.roles.includes(role.id)) {
          message.channel.send(message.language.get('ANTICAPS')[0])
          return
        }

        if (data.roles.length === 15 && !res.premium) {
          message.channel.send(message.language.get('UTILS').ROLES_SIZE_PREMIUM(res.rows[0].prefix))
          return
        }

        this.client.database.query(`UPDATE settings SET anticaps = jsonb_insert(anticaps, '{roles, 0}', '"${role.id}"') WHERE id = $1`, [message.guild.id])
        message.channel.send(message.language.get('ADDROLE', role))
        break
      }

      case 'remove-role': {
        const role = await this.client.functions.roleFilter(message, args.shift())
        if (!role) {
          return
        }

        if (!data.roles.length || !data.roles.includes(role.id)) {
          message.channel.send(message.language.get('ANTICAPS')[1])
          return
        }

        this.client.database.query(`UPDATE settings SET anticaps = jsonb_set(anticaps, '{roles}', (anticaps->'roles') - '${role.id}') WHERE id = $1`, [message.guild.id])
        message.channel.send(message.language.get('REMOVEROLE', role))
        break
      }

      case 'add-channel': {
        const channel = await this.client.functions.channelFilter(message, args.shift())
        if (!channel) {
          return
        }

        if (data.channels.length && data.channels.includes(channel.id)) {
          message.channel.send(message.language.get('ANTICAPS')[2])
          return
        }

        if (data.roles.length === 15 && !res.premium) {
          message.channel.send(message.language.get('UTILS').CHANNELS_SIZE_PREMIUM(res.rows[0].prefix))
          return
        }

        if (channel.type === 'voice' || channel.type === 'category') {
          message.channel.send(message.language.get('ANTICAPS')[3])
          return
        }

        this.client.database.query(`UPDATE settings SET anticaps = jsonb_insert(anticaps, '{channels, 0}', '"${channel.id}"') WHERE id = $1`, [message.guild.id])
        message.channel.send(message.language.get('ADDCHANNEL', channel))
        break
      }

      case 'remove-channel': {
        const channel = await this.client.functions.channelFilter(message, args.shift())

        if (!channel) {
          return
        }

        if (!data.channels.length && !data.channels.includes(channel.id)) {
          message.channel.send(message.language.get('ANTICAPS')[4])
          return
        }

        this.client.database.query(`UPDATE settings SET anticaps = jsonb_set(anticaps, '{channels}', (anticaps->'channels') - '${channel.id}') WHERE id = $1`, [message.guild.id])
        message.channel.send(message.language.get('REMOVECHANNEL', channel))
        break
      }

      case 'set-sanction': {
        if (!args[1]) {
          message.channel.send(new MessageEmbed()
            .setColor(this.client.config.embed.color)
            .setTitle(message.language.get('ANTICAPS')[5])
            .setDescription(message.language.get('ANTICAPS')[6])
            .setTimestamp()
            .setFooter(this.client.user.username, this.client.user.avatarURL())
          )
          return
        }

        const sanctionNumber = ['1', '2', '3']
        if (sanctionNumber.includes(args[1])) {
          this.client.database.query(`UPDATE settings SET anticaps = jsonb_set(anticaps, '{sanction}', '${Number(args[1])}') WHERE id = $1`, [message.guild.id])
          message.channel.send(message.language.get('SANCTION')[Number(args[1]) - 1])
          return
        }

        message.channel.send(message.language.get('SANCTION')[4])
        break
      }

      case 'setup': {
        const mentionRole = data.roles.map(role => {
          if (!message.guild.roles.cache.get(role)) {
            this.client.database.query(`UPDATE settings SET anticaps = jsonb_set(anticaps, '{roles}', (anticaps->'roles') - '${role}') WHERE id = $1`, [message.guild.id])
          } else {
            return `• <@&${role}>`
          }
        })

        const mentionChannel = data.channels.map(channel => {
          if (!message.guild.channels.cache.get(channel)) {
            this.client.database.query(`UPDATE settings SET anticaps = jsonb_set(anticaps, '{channels}', (anticaps->'channels') - '${channel}') WHERE id = $1`, [message.guild.id])
          } else {
            return `• <#${channel}>`
          }
        })

        message.channel.send(new MessageEmbed()
          .setColor(this.client.config.embed.color)
          .setTimestamp()
          .setTitle(message.language.get('ANTICAPS')[7])
          .addField(message.language.get('ANTICAPS')[8], message.language.get('SANCTION')[data.sanction - 1])
          .addField(message.language.get('ANTICAPS')[9], `${mentionRole.length > 0 ? `${mentionRole.join(' \n').length > 1000 ? `${mentionRole.slice(0, 9).join(' \n')} ${message.language.get('UTILS').MORE_SIZE(mentionRole.length - 9)}` : mentionRole.join(' \n')}` : message.language.get('ANTICAPS')[10]}`)
          .addField(message.language.get('ANTICAPS')[11], `${mentionChannel.length > 0 ? `${mentionChannel.join(' \n').length > 1000 ? `${mentionChannel.slice(0, 9).join(' \n')} ${message.language.get('UTILS').MORE_SIZE(mentionChannel.length - 9)}` : mentionChannel.join(' \n')}` : message.language.get('ANTICAPS')[12]}`)
          .setFooter(this.client.user.username, this.client.user.avatarURL())
        )
        break
      }

      default: {
        message.channel.send(new MessageEmbed()
          .setColor(this.client.config.embed.color)
          .setTimestamp()
          .setTitle(message.language.get('ANTICAPS')[13])
          .setDescription(message.language.get('ANTICAPS')[14])
          .setFooter(this.client.user.username, this.client.user.avatarURL())
        )
        break
      }
    }
  }
}
