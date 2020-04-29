'use strict'

const Command = require('../../../core/Command.js')
const Base64 = require('js-base64').Base64
const {MessageEmbed} = require('discord.js')

module.exports = class Encode extends Command {
  constructor (client) {
    super(client, {
      name: 'encode',
      cooldown: 3,
      enabled: true,
      owner: false,
      nsfw: false,
      plugin: false,
      aliases: [],
      permission: [],
      botpermissions: ['EMBED_LINKS'],
      usage: (language, prefix) => language.get('ENCODE_USAGE', prefix),
      category: (language) => language.get('UTILS').FUN_CATEGORIE,
      examples: (language, prefix) => language.get('ENCODE_EXEMPLE', prefix)
    })
  }

  async run (message, args) {

    if (!args[0]) return message.channel.send(message.language.get('ENCODE_ARGS'))

    if (args.join(' ').length > 750) return message.channel.send(message.language.get('ENCODE_LENGTH'))

    const text = args.join(' ')
    const encodeText = Base64.encode(text)

    const embed = new MessageEmbed()
      .setColor(this.client.config.embed.color)
      .addField(`${message.language.get('ENCODE_ENTREE')}`, `\`\`\`${text}\`\`\``)
      .addField(`${message.language.get('ENCODE_SORTIE')}`, `\`\`\`${encodeText}\`\`\``)
      .setTimestamp()
      .setFooter(this.client.user.username, this.client.user.avatarURL())

    return message.channel.send(embed)
  }
}
