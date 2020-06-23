'use strict'

const Command = require('../../classes/Command')
const { MessageEmbed } = require('discord.js')

module.exports = class Help extends Command {
  constructor (client) {
    super(client, {
      name: 'help',
      aliases: ['commands'],
      botpermissions: ['EMBED_LINKS'],
      usage: (language, prefix) => language.get('HELP_USAGE', prefix),
      category: (language) => language.get('UTILS').HYDROBOT_CATEGORY,
      examples: (language, prefix) => language.get('HELP_EXAMPLE', prefix)
    })
  }

  async run (message, args, res) {
    if (args[0]) {
      const cmd = this.client.commands[args[0]] || this.client.commands[this.client.aliases[args[0]]]

      if (!cmd) {
        message.channel.send(message.language.get('HELP_NOT_FOUND', args))
        return
      }

      if (cmd.conf.owner && !this.client.config.owners.includes(message.author.id)) return

      message.channel.send(new MessageEmbed()
        .setColor(this.client.config.embed.color)
        .setTitle(`:label: • ${message.language.get('HELP')[0]} \`${cmd.help.name}\``)
        .setDescription(message.language.get('HELP_EMBED_DESCRIPTION', res.rows[0].prefix))
        .addField('\u200b', '\u200b')
        .addField(message.language.get('HELP')[1], cmd.help.usage(message.language, res.rows[0].prefix))
        .addField(message.language.get('HELP')[2], cmd.help.examples(message.language, res.rows[0].prefix), true)
        .addField(message.language.get('HELP')[3], cmd.conf.aliases.length > 0 ? cmd.conf.aliases.map(a => '`' + res.rows[0].prefix + a + '`').join('\n') : message.language.get('HELP')[4], true)
        .addField('\u200b', '\u200b')
        .addField(message.language.get('HELP')[5], `\`${cmd.conf.cooldown} ${message.language.get('HELP')[6]}\``, true)
        .addField(message.language.get('HELP')[7], cmd.conf.permission.length > 0 ? cmd.conf.permission.map(a => '`' + a + '`').join('\n') : message.language.get('HELP')[8], true)
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.avatarURL())
      )

      return
    }

    const embed = new MessageEmbed()
      .setColor(this.client.config.embed.color)
      .setTitle(message.language.get('HELP')[9])
      .setDescription(message.language.get('HELP_EMBED_DESCRIPTION', res.rows[0].prefix))
      .addField('\u200b', '\u200b', false)
      .setTimestamp()
      .setFooter(this.client.user.username, this.client.user.avatarURL())

    const categories = []

    for (const cmd of Object.values(this.client.commands)) {
      if (!categories.includes(cmd.help.category(message.language, res.rows[0].prefix))) {
        if (cmd.help.category(message.language) === message.language.get('UTILS').BOTSTAFF_CATEGORY && !this.client.config.owners.includes(message.author.id)) continue
        if (cmd.help.category(message.language) === message.language.get('UTILS').IMAGE_CATEGORY && res.rows[0].system.images === false) continue
        if (cmd.help.category(message.language) === message.language.get('UTILS').NSFW_CATEGORY && res.rows[0].system.nsfw === false) continue
        categories.push(cmd.help.category(message.language, res.rows[0].prefix))
      }
    }

    for (const cat of categories) {
      let category = ''
      let pos = 0
      const commands = Object.values(this.client.commands).filter(cmd => cmd.help.category(message.language) === cat)
      for (const cmd of commands) {
        category += ' `' + cmd.help.name + '`'
        pos++
      }

      embed.addField(cat + ' (' + pos + ')', category.replace(/[' _]/g, ', ').substr(1))
    }
    message.channel.send(embed)
  }
}
