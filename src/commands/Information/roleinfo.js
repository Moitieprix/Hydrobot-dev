'use strict'

const Command = require('../../../core/Command.js')
const { MessageEmbed } = require('discord.js')

module.exports = class Roleinfo extends Command {
  constructor (client) {
    super(client, {
      name: 'roleinfo',
      aliases: ['ri', 'role'],
      botpermissions: ['EMBED_LINKS'],
      usage: (language, prefix) => language.get('ROLEINFO_USAGE', prefix),
      category: (language) => language.get('UTILS').INFORMATION_CATEGORY,
      examples: (language, prefix) => language.get('ROLEINFO_EXAMPLE', prefix)
    })
  }

  async run (message, args) {
    const role = await this.client.functions.roleFilter(message, args)

    if (!role) return

    const array = Object.entries(role.permissions.serialize())
    const permissionsArray = []
    array.map(perm => {
      if (perm[1]) return permissionsArray.push(`\`${perm[0]}\``)
    })

    message.channel.send(new MessageEmbed()
      .setColor(this.client.config.embed.color)
      .setTitle(`:label: • ${role.name}`)
      .addField(message.language.get('ROLEINFO')[0], `${message.language.get('ROLEINFO')[1]} **${role.id}** \n${message.language.get('ROLEINFO')[2]} **${role.hexColor}** \n${message.language.get('ROLEINFO')[3]} **${this.client.functions.timestampToDate(role.createdTimestamp, message)}**`)
      .addField(message.language.get('ROLEINFO')[4], `${message.language.get('ROLEINFO')[5]} **${role.members.size}** ${message.language.get('ROLEINFO')[6]} \n${message.language.get('ROLEINFO')[7]} **${role.position}** \n${message.language.get('ROLEINFO')[8]} **${message.language.get('UTILS').BOOLEAN[role.mentionable]}** \n${message.language.get('ROLEINFO')[9]} **${message.language.get('UTILS').BOOLEAN[role.hoist]}**`)
      .addField(message.language.get('ROLEINFO')[10], `${permissionsArray ? permissionsArray.join(', ') : message.language.get('ROLEINFO')[11]}`)
      .setTimestamp()
      .setFooter(this.client.user.username, this.client.user.avatarURL())
    )
  }
}
