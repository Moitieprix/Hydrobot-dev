'use strict'

const Command = require('../../../core/Command.js')
const { MessageEmbed } = require('discord.js')

module.exports = class Avatar extends Command {
  constructor (client) {
    super(client, {
      name: 'avatar',
      botpermissions: ['EMBED_LINKS'],
      usage: (language, prefix) => language.get('AVATAR_USAGE', prefix),
      category: (language) => language.get('UTILS').INFORMATION_CATEGORY,
      examples: (language, prefix) => language.get('AVATAR_EXAMPLE', prefix)
    })
  }

  async run (message, args) {
    const user = await this.client.functions.userFilter(message, args)

    if (!user) return

    const embed = new MessageEmbed()
      .setColor(this.client.config.embed.color)
      .setAuthor(user.username, user.displayAvatarURL({ dynamic: true }))
      .setDescription(!user.displayAvatarURL({ dynamic: true }).includes('.gif') ? `[PNG](${user.displayAvatarURL({ format: 'png' })}) • [JPG](${user.displayAvatarURL({ format: 'jpg' })})` : `[PNG](${user.displayAvatarURL({ format: 'png' })}) • [JPG](${user.displayAvatarURL({ format: 'jpg' })}) • [GIF](${user.displayAvatarURL({ format: 'gif' })})`)
      .setImage(user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setFooter(this.client.user.username, this.client.user.avatarURL())

    return message.channel.send(embed)
  }
}
