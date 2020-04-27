'use strict'

const Command = require('../../../core/Command.js')
const {MessageEmbed} = require('discord.js')

module.exports = class Logs extends Command {
  constructor (client) {
    super(client, {
      name: 'logs',
      cooldown: 5,
      enabled: true,
      owner: false,
      nsfw: false,
      plugin: false,
      aliases: [],
      permission: ['ADMINISTRATOR'],
      botpermissions: ['EMBED_LINKS'],
      description: (language) => language.get('LOGS_DESCRIPTION'),
      usage: (language, prefix) => language.get('LOGS_USAGE', prefix),
      category: (language) => language.get('UTILS').GUILDADMIN_CATEGORIE,
      examples: (language, prefix) => language.get('LOGS_EXEMPLE', prefix)
    })
  }

  async run (message, args) {
    this.client.database.query('SELECT * FROM settings WHERE id = $1', [message.guild.id], (err, res) => {
      if (err) return message.channel.send(message.language.get('UTILS').DATABASE_ERROR(err))

      const logslist = ['channelCreate', 'channelDelete', 'channelPinsUpdate', 'channelUpdate', 'emojiCreate', 'emojiDelete', 'emojiUpdate', 'guildBanAdd', 'guildBanRemove', 'guildMemberAdd', 'guildMemberRemove', 'guildMemberUpdate', 'guildUpdate', 'inviteCreate', 'inviteDelete', 'messageDelete', 'messageDeleteBulk', 'messageUpdate', 'roleCreate', 'roleDelete', 'roleUpdate', 'userUpdate', 'voiceStateUpdate']

      if (args[0] === 'setchannel') {

        const channel = this.client.functions.channelFilter(message, args[1])
        if (!channel) return message.channel.send(message.language.get('UTILS').CHANNEL_DEFAUT)

        this.client.database.query(`UPDATE settings SET channels = jsonb_set(channels, '{logs}', '"${channel}"') WHERE id = $1`, [message.guild.id])
        return message.channel.send(message.language.get('LOGS_CHANNEL', channel))

      } else if (args[0] === 'list') {
        const embed = new MessageEmbed()
          .setColor(this.client.config.embed.color)
          .setTimestamp()
          .setFooter(this.client.user.username, this.client.user.avatarURL())

        let text = ''

        for (let i = 0; i < logslist.length; i++) {
          res.rows[0]['logs_list'][logslist[i]] === true ? text += `**${logslist[i]}** : ${this.client.emote.others.on} \n` : text += `**${logslist[i]}** : ${this.client.emote.others.off} \n`
        }

        embed.setDescription(text)

        return message.channel.send(embed)

      } else if (logslist.includes(args[0])) {
        const log = logslist.find(p => p === args[0])

        if (res.rows[0]['logs_list'][log] === true) {
          this.client.database.query(`UPDATE settings SET logs_list = jsonb_set(logs_list, \'{${log}}\', \'false\') WHERE id = $1`, [message.guild.id])
          return message.channel.send(message.language.get('LOGS_DISABLE', log))
        } else {
          this.client.database.query(`UPDATE settings SET logs_list = jsonb_set(logs_list, \'{${log}}\', \'true\') WHERE id = $1`, [message.guild.id])
          return message.channel.send(message.language.get('LOGS_ENABLE', log))
        }

      } else {
        return message.channel.send(message.language.get('LOGS_ARGS'))
      }

    })
  }
}