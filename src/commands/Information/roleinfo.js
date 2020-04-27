'use strict'

const Command = require('../../../core/Command.js')
const { MessageEmbed } = require('discord.js')

module.exports = class Roleinfo extends Command {
  constructor (client) {
    super(client, {
      name: 'roleinfo',
      cooldown: 3,
      enabled: true,
      owner: false,
      nsfw: false,
      plugin: false,
      aliases: ['ri', 'role'],
      permission: [],
      botpermissions: ['EMBED_LINKS'],
      description: (language) => language.get('ROLEINFO_DESC'),
      usage: (language, prefix) => language.get('ROLEINFO_USAGE', prefix),
      category: (language) => language.get('UTILS').INFORMATION_CATEGORIE,
      examples: (language, prefix) => language.get('ROLEINFO_EXEMPLE', prefix)
    })
  }

  async run (message, args) {
    const roleId = this.client.functions.roleFilter(message, args[0])

    if (!roleId) return message.channel.send(message.language.get('UTILS').ROLE_DEFAUT)

    const role = await message.guild.roles.fetch(roleId)

    const array = Object.entries(role.permissions.serialize())
    const permission = array.map(e => e[1] ? '`' + e[0] + '`, ' : '').join('')

    const embed = new MessageEmbed()
      .setColor(this.client.config.embed.color)
      .setTitle(`:label: • ${role.name}`)
      .addField(message.language.get('ROLEINFO')[0], `${message.language.get('ROLEINFO')[1]} **${role.id}** \n${message.language.get('ROLEINFO')[2]} **${role.hexColor}** \n${message.language.get('ROLEINFO')[3]} **${this.client.functions.getDate(role.createdAt.toString().split(' '), message)}**`)
      .addField(message.language.get('ROLEINFO')[4], `${message.language.get('ROLEINFO')[5]} **${role.members.size}** ${message.language.get('ROLEINFO')[6]} \n${message.language.get('ROLEINFO')[7]} **${role.position}** \n${message.language.get('ROLEINFO')[8]} **${message.language.get('UTILS').BOOLEAN[role.mentionable]}** \n${message.language.get('ROLEINFO')[9]} **${message.language.get('UTILS').BOOLEAN[role.hoist]}**`)
      .addField(message.language.get('ROLEINFO')[10], `${permission ? permission.substring(0, permission.length - 2) : message.language.get('ROLEINFO')[11]}`)
      .setTimestamp()
      .setFooter(this.client.user.username, this.client.user.avatarURL())

    return message.channel.send(embed)

  }
}