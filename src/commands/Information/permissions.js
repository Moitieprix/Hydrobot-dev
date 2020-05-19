'use strict'

const Command = require('../../../core/Command.js')
const { MessageEmbed } = require('discord.js')

module.exports = class Permissions extends Command {
  constructor (client) {
    super(client, {
      name: 'permissions',
      botpermissions: ['EMBED_LINKS'],
      usage: (language, prefix) => language.get('PERMISSIONS_USAGE', prefix),
      category: (language) => language.get('UTILS').INFORMATION_CATEGORY,
      examples: (language, prefix) => language.get('PERMISSIONS_EXAMPLE', prefix)
    })
  }

  async run (message, args) {
    const user = await this.client.functions.userFilter(message, args)

    if (!user) return

    const total = {
      denied: 0,
      allowed: 0
    }

    const array = Object.entries(message.channel.permissionsFor(user).serialize())

    const permissions = array.map(perm => {
      if (perm[1]) {
        total.allowed++
        return `\`${perm[0]}\` • ${this.client.emote.others.yes}`
      } else {
        total.denied++
        return `\`${perm[0]}\` • ${this.client.emote.others.no}`
      }
    })

    message.channel.send(new MessageEmbed()
      .setColor(this.client.config.embed.color)
      .setDescription(`${this.client.emote.others.yes} • **${total.allowed} permissions** \n${this.client.emote.others.no} • **${total.denied} permissions** \n\n` + permissions.join(' \n'))
      .setTimestamp()
      .setFooter(this.client.user.username, this.client.user.avatarURL())
    )
  }
}
