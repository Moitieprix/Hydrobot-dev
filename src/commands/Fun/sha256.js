'use strict'

const Command = require('../../../core/Command.js')
const shajs = require('sha.js')
const { MessageEmbed } = require('discord.js')

module.exports = class Sha256 extends Command {
  constructor (client) {
    super(client, {
      name: 'sha256',
      cooldown: 3,
      enabled: true,
      owner: false,
      nsfw: false,
      plugin: false,
      aliases: [],
      permission: [],
      botpermissions: ['EMBED_LINKS'],
      usage: (language, prefix) => language.get('SHA256_USAGE', prefix),
      category: (language) => language.get('UTILS').FUN_CATEGORIE,
      examples: (language, prefix) => language.get('SHA256_EXEMPLE', prefix)
    })
  }

  async run (message, args) {
    if (!args[0]) return message.channel.send(message.language.get('SHA_ARGS'))
    if (args.join(' ').length > 1000) return message.channel.send(message.language.get('SHA_LENGTH'))

    const embed = new MessageEmbed()
      .setColor(this.client.config.embed.color)
      .addField(`${message.language.get('SHA_ENTREE')}`, `\`\`\`${args.join(' ')}\`\`\``)
      .addField(`${message.language.get('SHA_SORTIE')}`, `\`\`\`${shajs('sha256').update(args.join(' ')).digest('hex')}\`\`\``)
      .setTimestamp()
      .setFooter(this.client.user.username, this.client.user.avatarURL())

    return message.channel.send(embed)
  }
}
