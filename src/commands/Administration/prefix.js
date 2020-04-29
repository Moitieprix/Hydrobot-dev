'use strict'

const Command = require('../../../core/Command.js')
const {MessageEmbed} = require('discord.js')

module.exports = class Prefix extends Command {
  constructor (client) {
    super(client, {
      name: 'prefix',
      cooldown: 5,
      enabled: true,
      owner: false,
      nsfw: false,
      plugin: false,
      aliases: [],
      permission: ['ADMINISTRATOR'],
      botpermissions: ['EMBED_LINKS'],
      description: (language) => language.get('PREFIX_DESCRIPTION'),
      usage: (language, prefix) => language.get('PREFIX_USAGE', prefix),
      category: (language) => language.get('UTILS').GUILDADMIN_CATEGORIE,
      examples: (language, prefix) => language.get('PREFIX_EXEMPLE', prefix)
    })
  }

  run (message, args) {
    if (!args[0]) return message.channel.send(message.language.get('PREFIX_ARGS'))

    if (args[0].length > 3) return message.channel.send(message.language.get('PREFIX_LENGTH'))

    if(args[0].match(new RegExp(/[^A-Za-z!?;:*\-+=$/@]/))) return message.channel.send(message.language.get('PREFIX_ASCII'))

    this.client.database.query('UPDATE settings SET prefix = $1 WHERE id = $2', [args[0], message.guild.id])

    const embed = new MessageEmbed()
      .setColor(this.client.config.embed.color)
      .setTimestamp()
      .setTitle(message.language.get('PREFIX_CHANGE'))
      .setDescription(message.language.get('PREFIX_CHANGE_DESC', args))
      .setFooter(this.client.user.username, this.client.user.avatarURL())

    return message.channel.send(embed)
  }
}
