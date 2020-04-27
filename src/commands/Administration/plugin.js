'use strict'

const Command = require('../../../core/Command.js')
const {MessageEmbed} = require('discord.js')

module.exports = class Plugin extends Command {
  constructor (client) {
    super(client, {
      name: 'plugin',
      cooldown: 3,
      enabled: true,
      owner: false,
      nsfw: false,
      plugin: false,
      aliases: [],
      permission: ['ADMINISTRATOR'],
      botpermissions: ['EMBED_LINKS'],
      description: (language) => language.get('PLUGIN_DESCRIPTION'),
      usage: (language, prefix) => language.get('PLUGIN_USAGE', prefix),
      category: (language) => language.get('UTILS').GUILDADMIN_CATEGORIE,
      examples: (language, prefix) => language.get('PLUGIN_EXEMPLE', prefix)
    })
  }

  async run (message, args) {
    this.client.database.query('SELECT * FROM settings WHERE id = $1', [message.guild.id], (err, res) => {
      if (err) return message.channel.send(message.language.get('UTILS').DATABASE_ERROR(err))

      const plugins = ['logs', 'modlogs', 'autorole', 'welcome', 'goodbye', 'antilink', 'anticaps', 'badwords', 'captcha', 'antiJoin', 'nsfw', 'customCommands', 'images']

      if (plugins.includes(args[0])) {
        const plugin = plugins.find(p => p === args[0])

        if (res.rows[0].system[plugin] === true) {
          this.client.database.query(`UPDATE settings SET system = jsonb_set(system, \'{${plugin}}\', \'false\') WHERE id = $1`, [message.guild.id])
          return message.channel.send(message.language.get('PLUGIN_DISABLE', plugin))
        } else {
          this.client.database.query(`UPDATE settings SET system = jsonb_set(system, \'{${plugin}}\', \'true\') WHERE id = $1`, [message.guild.id])
          return message.channel.send(message.language.get('PLUGIN_ENABLE', plugin))
        }

      } else if (args[0] === 'list') {
        const embed = new MessageEmbed()
          .setColor(this.client.config.embed.color)
          .setTimestamp()
          .setFooter(this.client.user.username, this.client.user.avatarURL())

        let text = ''

        for (let i = 0; i < plugins.length; i++) {
          res.rows[0].system[plugins[i]] === true ? text += `**${plugins[i]}** : ${this.client.emote.others.on} \n` : text += `**${plugins[i]}** : ${this.client.emote.others.off} \n`
        }

        embed.setDescription(text)

        return message.channel.send(embed)
      } else {
        return message.channel.send(message.language.get('PLUGIN_ARGS'))
      }
    })
  }
}