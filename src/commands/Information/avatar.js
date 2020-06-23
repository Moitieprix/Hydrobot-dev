'use strict'

const Command = require('../../classes/Command')
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

    if (!user) {
      return
    }

    message.channel.send(new MessageEmbed()
      .setColor(this.client.config.embed.color)
      .setAuthor(user.username, user.displayAvatarURL({ dynamic: true }))
      .setDescription(!user.displayAvatarURL({ dynamic: true }).includes('.gif') ? `[PNG](${user.displayAvatarURL({ format: 'png', size: 256 })}) • [JPG](${user.displayAvatarURL({ format: 'jpg', size: 256 })})` : `[PNG](${user.displayAvatarURL({ format: 'png', size: 256 })}) • [JPG](${user.displayAvatarURL({ format: 'jpg', size: 256 })}) • [GIF](${user.displayAvatarURL({ format: 'gif', size: 256 })})`)
      .setImage(user.displayAvatarURL({ dynamic: true, size: 256 }))
      .setTimestamp()
      .setFooter(this.client.user.username, this.client.user.avatarURL())
    )
  }
}
