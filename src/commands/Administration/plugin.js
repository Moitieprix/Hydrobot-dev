'use strict'

const Command = require('../../../core/Command.js')
const { MessageEmbed } = require('discord.js')

module.exports = class Plugin extends Command {
  constructor (client) {
    super(client, {
      name: 'plugin',
      cooldown: 3,
      enabled: true,
      owner: false,
      plugin: false,
      aliases: [],
      permission: ['ADMINISTRATOR'],
      botpermissions: ['EMBED_LINKS'],
      usage: (language, prefix) => language.get('PLUGIN_USAGE', prefix),
      category: (language) => language.get('UTILS').GUILDADMIN_CATEGORY,
      examples: (language, prefix) => language.get('PLUGIN_EXAMPLE', prefix)
    })
  }

  async run (message, args) {
    this.client.database.query('SELECT * FROM settings WHERE id = $1', [message.guild.id], (err, res) => {
      if (err) return message.channel.send(message.language.get('UTILS').DATABASE_ERROR(err))

      const plugins = ['logs', 'modlogs', 'autorole', 'welcome', 'goodbye', 'antilink', 'anticaps', 'badwords', 'massmentions', 'captcha', 'nsfw', 'customCommands', 'images']

      switch (args[0]) {
        case 'list': {
          const embedList = new MessageEmbed()
            .setColor(this.client.config.embed.color)
            .setDescription(plugins.map(plugin => res.rows[0].system[plugin] === true ? `**${plugin}** : ${this.client.emote.others.on} \n` : `**${plugin}** : ${this.client.emote.others.off} \n`).join(' \n'))
            .setTimestamp()
            .setFooter(this.client.user.username, this.client.user.avatarURL())

          message.channel.send(embedList)
          break
        }

        case 'enable-all': {
          for (const plugin of plugins) {
            if (res.rows[0].system[plugin] === false) this.client.database.query(`UPDATE settings SET system = jsonb_set(logs_list, '{${plugin}}', 'true') WHERE id = $1`, [message.guild.id])
          }
          message.channel.send(message.language.get('PLUGIN')[0])
          break
        }

        case 'disable-all': {
          for (const plugin of plugins) {
            if (res.rows[0].system[plugin] === true) this.client.database.query(`UPDATE settings SET system = jsonb_set(logs_list, '{${plugin}}', 'false') WHERE id = $1`, [message.guild.id])
          }
          message.channel.send(message.language.get('PLUGIN')[1])
          break
        }

        default: {
          if (plugins.includes(args[0])) {
            const plugin = plugins.find(p => p === args[0])

            if (res.rows[0].system[plugin] === true) {
              this.client.database.query(`UPDATE settings SET system = jsonb_set(system, '{${plugin}}', 'false') WHERE id = $1`, [message.guild.id])
              return message.channel.send(message.language.get('PLUGIN_DISABLE', plugin))
            } else {
              this.client.database.query(`UPDATE settings SET system = jsonb_set(system, '{${plugin}}', 'true') WHERE id = $1`, [message.guild.id])
              return message.channel.send(message.language.get('PLUGIN_ENABLE', plugin))
            }
          } else {
            const embed = new MessageEmbed()
              .setColor(this.client.config.embed.color)
              .setTitle(message.language.get('PLUGIN')[2])
              .setDescription(message.language.get('PLUGIN')[3])
              .setTimestamp()
              .setFooter(this.client.user.username, this.client.user.avatarURL())
            message.channel.send(embed)
          }
          break
        }
      }
    })
  }
}
