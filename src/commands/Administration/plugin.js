'use strict'

const Command = require('../../../core/Command.js')
const { MessageEmbed } = require('discord.js')

module.exports = class Plugin extends Command {
  constructor (client) {
    super(client, {
      name: 'plugin',
      cooldown: 5,
      permission: ['ADMINISTRATOR'],
      botpermissions: ['EMBED_LINKS'],
      usage: (language, prefix) => language.get('PLUGIN_USAGE', prefix),
      category: (language) => language.get('UTILS').GUILDADMIN_CATEGORY,
      examples: (language, prefix) => language.get('PLUGIN_EXAMPLE', prefix)
    })
  }

  async run (message, args, res) {
    const plugins = ['logs', 'modlogs', 'autorole', 'welcome', 'goodbye', 'antilink', 'anticaps', 'badwords', 'massmentions', 'captcha', 'nsfw', 'customCommands', 'images']

    switch (args[0]) {
      case 'list': {
        message.channel.send(new MessageEmbed()
          .setColor(this.client.config.embed.color)
          .setDescription(plugins.map(plugin => res.rows[0].system[plugin] === true ? `**${plugin}** : ${this.client.emote.others.on}` : `**${plugin}** : ${this.client.emote.others.off}`).join(' \n'))
          .setTimestamp()
          .setFooter(this.client.user.username, this.client.user.avatarURL()))
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

          if (res.rows[0].system[plugin]) {
            this.client.database.query(`UPDATE settings SET system = jsonb_set(system, '{${plugin}}', 'false') WHERE id = $1`, [message.guild.id])
            message.channel.send(message.language.get('PLUGIN_DISABLE', plugin))
            return
          } else {
            this.client.database.query(`UPDATE settings SET system = jsonb_set(system, '{${plugin}}', 'true') WHERE id = $1`, [message.guild.id])
            message.channel.send(message.language.get('PLUGIN_ENABLE', plugin))
            return
          }
        }

        message.channel.send(new MessageEmbed()
          .setColor(this.client.config.embed.color)
          .setTitle(message.language.get('PLUGIN')[2])
          .setDescription(message.language.get('PLUGIN')[3])
          .setTimestamp()
          .setFooter(this.client.user.username, this.client.user.avatarURL())
        )
        break
      }
    }
  }
}
