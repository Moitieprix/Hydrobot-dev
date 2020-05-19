'use strict'

const Command = require('../../../core/Command.js')
const { MessageEmbed } = require('discord.js')

module.exports = class Membercount extends Command {
  constructor (client) {
    super(client, {
      name: 'membercount',
      aliases: ['usercount'],
      botpermissions: ['EMBED_LINKS'],
      usage: (language, prefix) => language.get('MEMBERCOUNT_USAGE', prefix),
      category: (language) => language.get('UTILS').INFORMATION_CATEGORY,
      examples: (language, prefix) => language.get('MEMBERCOUNT_EXAMPLE', prefix)
    })
  }

  async run (message) {
    const members = await message.guild.members.fetch()

    message.channel.send(new MessageEmbed()
      .setColor(this.client.config.embed.color)
      .addField(`${message.language.get('SERVERINFO_EMBED')[14]} (${message.guild.memberCount})`, `**${members.filter(member => !member.user.bot).size}** ${message.language.get('SERVERINFO_EMBED')[15]} • **${members.filter(member => member.user.bot).size}** ${message.language.get('SERVERINFO_EMBED')[16]} \n${message.language.get('UTILS').STATUS.online} : **${members.filter(o => o.presence.status === 'online').size}** \n${message.language.get('UTILS').STATUS.idle} : **${members.filter(o => o.presence.status === 'idle').size}** \n${message.language.get('UTILS').STATUS.dnd} : **${members.filter(o => o.presence.status === 'dnd').size}** \n${message.language.get('UTILS').STATUS.offline} : **${members.filter(o => o.presence.status === 'offline').size}**`)
      .setTimestamp()
      .setFooter(this.client.user.username, this.client.user.avatarURL())
    )
  }
}
