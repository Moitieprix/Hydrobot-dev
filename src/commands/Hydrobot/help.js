'use strict'

const Command = require('../../../core/Command.js')
const {MessageEmbed} = require('discord.js')

module.exports = class Help extends Command {
  constructor (client) {
    super(client, {
      name: 'help',
      cooldown: 3,
      enabled: true,
      owner: false,
      plugin: false,
      aliases: ['commands'],
      permission: [],
      botpermissions: ['EMBED_LINKS'],
      usage: (language, prefix) => language.get('HELP_USAGE', prefix),
      category: (language) => language.get('UTILS').HYDROBOT_CATEGORY,
      examples: (language, prefix) => language.get('HELP_EXAMPLE', prefix)
    })
  }

  async run (message, args) {
    this.client.database.query('SELECT * FROM settings WHERE id = $1', [message.guild.id], async (err, res) => {
        if (args[0]) {
          const cmd = this.client.commands[args[0]] || this.client.commands[this.client.aliases[args[0]]]

          if (!cmd) return message.channel.send(message.language.get('HELP_NOT_FOUND', args))

          if (cmd.conf.owner && !this.client.config.owners.includes(message.author.id)) return

          const embed = new MessageEmbed()
            .setColor(this.client.config.embed.color)
            .setTitle(`:label: • ${message.language.get('HELP_EMBED')[0]} \`${cmd.help.name}\``)
            .setDescription(message.language.get('HELP_EMBED_DESC', res.rows[0].prefix))
            .addField('\u200b', '\u200b', false)
            .addField(message.language.get('HELP_EMBED')[1], cmd.help.usage(message.language, res.rows[0].prefix))
            .addField(message.language.get('HELP_EMBED')[2], cmd.help.examples(message.language, res.rows[0].prefix), true)
            .addField(message.language.get('HELP_EMBED')[3], cmd.conf.aliases.length > 0 ? cmd.conf.aliases.map(a => '`' + res.rows[0].prefix + a + '`').join('\n') : message.language.get('HELP_EMBED')[4], true)
            .addField('\u200b', '\u200b', false)
            .addField(message.language.get('HELP_EMBED')[5], `\`${cmd.conf.cooldown} ${message.language.get('HELP_EMBED')[6]}\``, true)
            .addField(message.language.get('HELP_EMBED')[7], cmd.conf.permission.length > 0 ? cmd.conf.permission.map(a => '`' + a + '`').join('\n') : message.language.get('HELP_EMBED')[8], true)
            .setTimestamp()
            .setFooter(this.client.user.username, this.client.user.avatarURL())

          return message.channel.send(embed)
        }

      const embed = new MessageEmbed()
        .setColor(this.client.config.embed.color)
        .setTitle(message.language.get('HELP_EMBED')[9])
        .setDescription(message.language.get('HELP_EMBED_DESCRIPTION', res.rows[0].prefix))
        .addField('\u200b', '\u200b', false)
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.avatarURL())

        let commands_total = 0
        const categories = []

        Object.values(this.client.commands).forEach(cmd => {
          if (!categories.includes(cmd.help.category(message.language, res.rows[0].prefix))) {
            if (cmd.help.category(message.language) === message.language.get('UTILS').BOTSTAFF_CATEGORY && !this.client.config.owners.includes(message.author.id)) return
            if (cmd.help.category(message.language) === message.language.get('UTILS').IMAGE_CATEGORY && res.rows[0].system.images === false) return
            if (cmd.help.category(message.language) === message.language.get('UTILS').NSFW_CATEGORY && res.rows[0].system.nsfw === false) return
            categories.push(cmd.help.category(message.language, res.rows[0].prefix))
          }
        })

        categories.forEach(cat => {
          let category = ''
          let pos = 0
          const commands = Object.values(this.client.commands).filter(cmd => cmd.help.category(message.language) === cat)
          commands.forEach(cmd => {
            category += ' `' + cmd.help.name + '`'
            pos++
          })
          commands_total += pos

          embed.addField(cat + ' (' + pos + ')', category.replace(/[' _]/g, ', ').substr(1))
        })
        return message.channel.send(embed)

    })
  }
}
