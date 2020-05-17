'use strict'

const { MessageEmbed } = require('discord.js')
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
    const res = await this.client.functions.getDataSettings(this.client, message.guild.id, message)
    if (!res) return

    const data = res.rows[0].badwords

    switch (args[0]) {
      case 'add-role': {
        const roleAdd = this.client.functions.roleFilter(message, args[1])

        if (!roleAdd) return message.channel.send(message.language.get('BADWORDS')[0])
        if (data.roles.length !== 0 && data.roles.includes(roleAdd)) return message.channel.send(message.language.get('BADWORDS')[1])

        if (data.roles.length === 15 && !data.premium) return message.channel.send(message.language.get('UTILS').ROLES_SIZE_PREMIUM(res.rows[0].prefix))

        this.client.database.query(`UPDATE settings SET badwords = jsonb_insert(badwords, '{roles, 0}', '"${roleAdd}"') WHERE id = $1`, [message.guild.id])
        message.channel.send(message.language.get('ADDROLE', roleAdd))
        break
      }

      case 'remove-role': {
        const roleRemove = this.client.functions.roleFilter(message, args[1])

        if (!roleRemove) return message.channel.send(message.language.get('BADWORDS')[0])
        if (data.roles.length === 0 || !data.roles.includes(roleRemove)) return message.channel.send(message.language.get('BADWORDS')[2])

        this.client.database.query(`UPDATE settings SET badwords = jsonb_set(badwords, '{roles}', (badwords->'roles') - '${roleRemove}') WHERE id = $1`, [message.guild.id])
        message.channel.send(message.language.get('REMOVEROLE', roleRemove))
        break
      }

      case 'add-channel': {
        const channelAdd = this.client.functions.channelFilter(message, args[1])

        if (!channelAdd) return message.channel.send(message.language.get('BADWORDS')[3])
        if (data.channels.length !== 0 && data.channels.includes(channelAdd)) return message.channel.send(message.language.get('BADWORDS')[4])

        if (data.roles.length === 15 && !res.premium) return message.channel.send(message.language.get('UTILS').CHANNELS_SIZE_PREMIUM(res.rows[0].prefix))

        if (message.guild.channels.cache.get(channelAdd).type === 'voice' || message.guild.channels.cache.get(channelAdd).type === 'category') return message.channel.send(message.language.get('BADWORDS')[5])

        this.client.database.query(`UPDATE settings SET badwords = jsonb_insert(badwords, '{channels, 0}', '"${channelAdd}"') WHERE id = $1`, [message.guild.id])
        message.channel.send(message.language.get('ADDCHANNEL', channelAdd))
        break
      }

      case 'remove-channel': {
        const channelRemove = this.client.functions.channelFilter(message, args[1])

        if (!channelRemove) return message.channel.send(message.language.get('BADWORDS')[3])
        if (data.channels.length === 0 && !res.channels.includes(channelRemove)) return message.channel.send(message.language.get('BADWORDS')[6])

        this.client.database.query(`UPDATE settings SET badwords = jsonb_set(badwords, '{channels}', (badwords->'channels') - '${channelRemove}') WHERE id = $1`, [message.guild.id])
        message.channel.send(message.language.get('REMOVECHANNEL', channelRemove))
        break
      }

      case 'add-word': {
        if (!args[1]) return message.channel.send(message.language.get('BADWORDS')[7])
        if (data.words.length !== 0 && data.words.includes(args[1])) return message.channel.send(message.language.get('BADWORDS')[8])

        if (data.roles.length === 15 && !data.premium) return message.channel.send(message.language.get('UTILS').WORDS_SIZE_PREMIUM(res.rows[0].prefix))

        this.client.database.query(`UPDATE settings SET badwords = jsonb_insert(badwords, '{words, 0}', '"${args[1]}"') WHERE id = $1`, [message.guild.id])
        message.channel.send(message.language.get('ADDWORD', args[1]))
        break
      }

      case 'remove-word': {
        if (!args[1]) return message.channel.send('mot manquant')
        if (data.words.length === 0 && !data.words.includes(args[1])) return message.channel.send(message.language.get('BADWORDS')[9])

        const posWord = data.words.indexOf(args[1])
        data.words.splice(posWord, 1)
        this.client.database.query(`UPDATE settings SET badwords = jsonb_set(badwords, '{words}', (badwords->'words') - '${args[1]}') WHERE id = $1`, [message.guild.id])
        message.channel.send(message.language.get('REMOVEWORD', args[1]))
        break
      }

      case 'set-sanction': {
        const embedSanction = new MessageEmbed()
          .setColor(this.client.config.embed.color)
          .setTitle(message.language.get('BADWORDS')[10])
          .setDescription(message.language.get('BADWORDS')[11])
          .setTimestamp()
          .setFooter(this.client.user.username, this.client.user.avatarURL())

        if (!args[1]) return message.channel.send(embedSanction)

        if (args[1] === '1' || args[1] === '2' || args[1] === '3') {
          this.client.database.query(`UPDATE settings SET badwords = jsonb_set(badwords, '{sanction}', '${parseInt(args[1])}') WHERE id = $1`, [message.guild.id])
          return message.channel.send(message.language.get('SANCTION')[parseInt(args[1]) - 1])
        } else {
          message.channel.send(message.language.get('SANCTION')[4])
        }
        break
      }

      case 'setup': {
        const mentionRole = data.roles.map((role, i) => {
          if (!message.guild.roles.cache.get(role)) {
            data.roles.splice(i, 1)
            this.client.database.query(`UPDATE settings SET badwords = jsonb_set(badwords, '{roles}', (badwords->'roles') - '${role}') WHERE id = $1`, [message.guild.id])
          } else {
            return `• <@&${role}>`
          }
        })

        const mentionChannel = data.channels.map((channel, i) => {
          if (!message.guild.channels.cache.get(channel)) {
            data.roles.splice(i, 1)
            this.client.database.query(`UPDATE settings SET badwords = jsonb_set(badwords, '{channels}', (badwords->'channels') - '${channel}') WHERE id = $1`, [message.guild.id])
          } else {
            return `• <#${channel}>`
          }
        })

        const embedSetup = new MessageEmbed()
          .setColor(this.client.config.embed.color)
          .setTimestamp()
          .setTitle(message.language.get('BADWORDS')[12])
          .addField(message.language.get('BADWORDS')[13], message.language.get('SANCTION')[data.sanction - 1])
          .addField(message.language.get('BADWORDS')[14], data.words.length > 0 ? '•' + data.words.join(' \n•') : message.language.get('BADWORDS')[13])
          .addField(message.language.get('BADWORDS')[16], `${mentionRole.length > 0 ? `${mentionRole.join(' \n').length > 1000 ? `${mentionRole.slice(0, 9).join(' \n')} ${message.language.get('UTILS').MORE_SIZE(mentionRole.length - 9)}` : mentionRole.join(' \n')}` : message.language.get('ANTICAPS')[17]}`)
          .addField(message.language.get('BADWORDS')[18], `${mentionChannel.length > 0 ? `${mentionChannel.join(' \n').length > 1000 ? `${mentionChannel.slice(0, 9).join(' \n')} ${message.language.get('UTILS').MORE_SIZE(mentionChannel.length - 9)}` : mentionChannel.join(' \n')}` : message.language.get('ANTICAPS')[19]}`)
          .setFooter(this.client.user.username, this.client.user.avatarURL())

        message.channel.send(embedSetup)
        break
      }

      default: {
        const embed = new MessageEmbed()
          .setColor(this.client.config.embed.color)
          .setTimestamp()
          .setTitle(message.language.get('BADWORDS')[20])
          .setDescription(message.language.get('BADWORDS')[21])
          .setFooter(this.client.user.username, this.client.user.avatarURL())

        message.channel.send(embed)
        break
      }
    }
  }
}
