const {MessageEmbed} = require('discord.js')
const Command = require('../../../core/Command.js')

module.exports = class Antilink extends Command {
  constructor (client) {
    super(client, {
      name: 'antilink',
      usage: (language, prefix) => language.get('ANTILINK_USAGE', prefix),
      enabled: true,
      category: (language) => language.get('UTILS').GUILDADMIN_CATEGORIE,
      aliases: [],
      permission: ['ADMINISTRATOR'],
      botpermissions: ['EMBED_LINKS', 'MANAGE_MESSAGES'],
      examples: (language, prefix) => language.get('ANTILINK_EXEMPLE', prefix),
      owner: false,
      cooldown: 5,
      nsfw: false,
      plugin: false
    })
  }

  async run (message, args) {
    this.client.database.query('SELECT * FROM settings WHERE id = $1', [message.guild.id], async (err, res) => {
      const data = JSON.parse(res.rows[0].antilink[0])

      if (args[0] === 'addrole') {
        if (!message.mentions.roles.first()) {
          message.channel.send(message.language.get('AUTOMOD').ROLES_ERROR[0])
        } else {
          if (data.roles.length !== 0 && data.roles.includes(message.mentions.roles.first().id)) {
            message.channel.send(message.language.get('AUTOMOD').ROLES_ERROR[1])
          } else {
            data.roles.push(message.mentions.roles.first().id)
            this.client.database.query('UPDATE settings SET antilink = $1 WHERE id = $2', [[data], message.guild.id])
            message.channel.send(message.language.get('AUTOMOD').ADDROLE(message.mentions.roles.first().id))
          }
        }
      } else if (args[0] === 'removerole') {
        if (!message.mentions.roles.first()) {
          message.channel.send(message.language.get('AUTOMOD').ROLES_ERROR[0])
        } else {
          if (data.roles.length === 0 || !data.roles.includes(message.mentions.roles.first().id)) {
            message.channel.send(message.language.get('AUTOMOD').ROLES_ERROR[2])
          } else {
            const pos = data.roles.indexOf(message.mentions.roles.first().id)
            data.roles.splice(pos, 1)
            this.client.database.query('UPDATE settings SET antilink = $1 WHERE id = $2', [[data], message.guild.id])
            message.channel.send(message.language.get('AUTOMOD').REMOVEROLE(message.mentions.roles.first().id))
          }
        }
      } else if (args[0] === 'addchannel') {
        if (!message.mentions.channels.first()) {
          message.channel.send(message.language.get('AUTOMOD').CHANNELS_ERROR[0])
        } else {
          if (data.channels.length !== 0 && data.channels.includes(message.mentions.channels.first().id)) {
            message.channel.send(message.language.get('AUTOMOD').CHANNELS_ERROR[1])
          } else {
            data.channels.push(message.mentions.channels.first())
            this.client.database.query('UPDATE settings SET antilink = $1 WHERE id = $2', [[data], message.guild.id])
            message.channel.send(message.language.get('AUTOMOD').ADDCHANNEL(message.mentions.channels.first()))

          }
        }
      } else if (args[0] === 'removechannel') {
        if (!message.mentions.channels.first()) {
          message.channel.send(message.language.get('AUTOMOD').CHANNELS_ERROR[0])
        } else {
          if (data.channels.length === 0 && !data.channels.includes(message.mentions.channels.first().id)) {
            message.channel.send(message.language.get('AUTOMOD').CHANNELS_ERROR[2])
          } else {
            const pos = data.channels.indexOf(message.mentions.roles.first().id)
            data.channels.splice(pos, 1)
            this.client.database.query('UPDATE settings SET antilink = $1 WHERE id = $2', [[data], message.guild.id])
            message.channel.send(message.language.get('AUTOMOD').REMOVECHANNEL(message.mentions.channels.first()))
          }
        }
      } else {
        const embed = new MessageEmbed()
          .setColor(this.client.config.embed.color)
          .setTimestamp()
          .setTitle(message.language.get('AUTOMOD').ANTILINK[4])
          .setDescription(message.language.get('AUTOMOD').ANTILINK[5])
          .setFooter(this.client.user.username, this.client.user.avatarURL())

        return message.channel.send(embed)
      }
    })
  }
}
