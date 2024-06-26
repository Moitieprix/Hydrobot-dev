'use strict'

const Command = require('../../classes/Command')
const { MessageEmbed } = require('discord.js')

module.exports = class Logs extends Command {
  constructor (client) {
    super(client, {
      name: 'logs',
      cooldown: 5,
      permission: ['ADMINISTRATOR'],
      botpermissions: ['EMBED_LINKS'],
      usage: (language, prefix) => language.get('LOGS_USAGE', prefix),
      category: (language) => language.get('UTILS').GUILDADMIN_CATEGORY,
      examples: (language, prefix) => language.get('LOGS_EXAMPLE', prefix)
    })
  }

  async run (message, args, res) {
    const logslist = ['channelCreate', 'channelDelete', 'channelUpdate', 'emojiCreate', 'emojiDelete', 'emojiUpdate', 'guildBanAdd', 'guildBanRemove', 'guildMemberAdd', 'guildMemberRemove', 'guildMemberUpdate', 'guildUpdate', 'inviteCreate', 'inviteDelete', 'messageDelete', 'messageDeleteBulk', 'messageUpdate', 'roleCreate', 'roleDelete', 'roleUpdate', 'userUpdate', 'voiceStateUpdate']

    switch (args[0]) {
      case 'set-channel': {
        const channel = await this.client.functions.channelFilter(message, args[1])
        if (!channel) {
          return
        }

        this.client.database.query(`UPDATE settings SET channels = jsonb_set(channels, '{logs}', '"${channel.id}"') WHERE id = $1`, [message.guild.id])
        message.channel.send(message.language.get('LOGS_CHANNEL', channel))
        break
      }

      case 'list': {
        message.channel.send(new MessageEmbed()
          .setColor(this.client.config.embed.color)
          .setDescription(logslist.map(log => res.rows[0].logs_list[log] === true ? `**${log}** : ${this.client.emote.others.on}` : `**${log}** : ${this.client.emote.others.off}`).join(' \n'))
          .setTimestamp()
          .setFooter(this.client.user.username, this.client.user.avatarURL())
        )
        break
      }

      case 'enable-all': {
        for (const log of logslist) {
          if (res.rows[0].logs_list[log] === false) {
            this.client.database.query(`UPDATE settings SET logs_list = jsonb_set(logs_list, '{${log}}', 'true') WHERE id = $1`, [message.guild.id])
          }
        }
        message.channel.send(message.language.get('LOGS')[0])
        break
      }

      case 'disable-all': {
        for (const log of logslist) {
          if (res.rows[0].logs_list[log] === true) {
            this.client.database.query(`UPDATE settings SET logs_list = jsonb_set(logs_list, '{${log}}', 'false') WHERE id = $1`, [message.guild.id])
          }
        }
        message.channel.send(message.language.get('LOGS')[1])
        break
      }

      default: {
        if (logslist.includes(args[0])) {
          const log = logslist.find(p => p === args[0])

          if (res.rows[0].logs_list[log]) {
            this.client.database.query(`UPDATE settings SET logs_list = jsonb_set(logs_list, '{${log}}', 'false') WHERE id = $1`, [message.guild.id])
            message.channel.send(message.language.get('LOGS_DISABLE', log))
            return
          } else {
            this.client.database.query(`UPDATE settings SET logs_list = jsonb_set(logs_list, '{${log}}', 'true') WHERE id = $1`, [message.guild.id])
            message.channel.send(message.language.get('LOGS_ENABLE', log))
            return
          }
        }

        message.channel.send(new MessageEmbed()
          .setColor(this.client.config.embed.color)
          .setTitle(message.language.get('LOGS')[2])
          .setDescription(message.language.get('LOGS')[3])
          .setTimestamp()
          .setFooter(this.client.user.username, this.client.user.avatarURL())
        )
        break
      }
    }
  }
}
