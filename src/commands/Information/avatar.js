'use strict'

const Command = require('../../../core/Command.js')
const {MessageEmbed} = require('discord.js')

module.exports = class Avatar extends Command {
  constructor (client) {
    super(client, {
      name: 'avatar',
      cooldown: 3,
      enabled: true,
      owner: false,
      plugin: false,
      aliases: [],
      permission: [],
      botpermissions: ['EMBED_LINKS'],
      usage: (language, prefix) => language.get('AVATAR_USAGE', prefix),
      category: (language) => language.get('UTILS').INFORMATION_CATEGORY,
      examples: (language, prefix) => language.get('AVATAR_EXEMPLE', prefix)
    })
  }

  async run (message, args) {
    const user = await this.client.functions.userFilter(message, args)

    if (!user) return

    const embed = new MessageEmbed()
      .setColor(this.client.config.embed.color)
      .setAuthor(user.username, user.displayAvatarURL({ dynamic: true }))
      .setDescription(!user.displayAvatarURL({ dynamic: true }).includes('.gif') ? `[PNG](https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=512) • [JPG](https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.jpg?size=512)` : `[PNG](https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=512) • [JPG](https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.jpg?size=512) • [GIF](https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.gif?size=512)`)
      .setImage(user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setFooter(this.client.user.username, this.client.user.avatarURL())

    return message.channel.send(embed)
  }
}
