'use strict'

const Command = require('../../classes/Command')
const { MessageEmbed } = require('discord.js')

module.exports = class Serverinfo extends Command {
  constructor (client) {
    super(client, {
      name: 'serverinfo',
      aliases: ['guildinfo', 'guild', 'server'],
      botpermissions: ['EMBED_LINKS'],
      usage: (language, prefix) => language.get('SERVERINFO_USAGE', prefix),
      category: (language) => language.get('UTILS').INFORMATION_CATEGORY,
      examples: (language, prefix) => language.get('SERVERINFO_EXAMPLE', prefix)
    })
  }

  async run (message) {
    const guildMembers = await message.guild.members.fetch()

    message.channel.send(new MessageEmbed()
      .setColor(this.client.config.embed.color)
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setDescription(message.language.get('SERVERINFO')[0])
      .addField(message.language.get('SERVERINFO')[1], `${message.language.get('SERVERINFO')[2]} **${message.guild.name}** \n${message.language.get('SERVERINFO')[3]} **${message.guild.id}** \n${message.language.get('SERVERINFO')[4]} **${message.guild.owner}** \n${message.language.get('SERVERINFO')[5]} **${message.language.get('UTILS').REGION[message.guild.region] ? message.language.get('UTILS').REGION[message.guild.region] : message.guild.region}** \n${message.language.get('SERVERINFO')[6]} **${this.client.functions.timestampToDate(message.guild.createdTimestamp, message)}**`)
      .addField(message.language.get('SERVERINFO')[7], `${message.language.get('SERVERINFO')[8]} ${Array.from(message.channel.guild.members.cache.values()).sort((a, b) => b.joinedAt - a.joinedAt).map(m => `<@!${m.id}>`).slice(0, 1)} \n${message.language.get('SERVERINFO')[9]} **${message.language.get('UTILS').VERIFICATION_LEVEL[message.guild.verificationLevel]}** \n${message.language.get('SERVERINFO')[10]} **${message.language.get('UTILS').CONTENT_LEVEL[message.guild.explicitContentFilter]}** \n${message.language.get('SERVERINFO')[11]} ${message.guild.afkChannelID !== null ? message.guild.afkChannel : `${message.language.get('SERVERINFO')[13]}`} \n${message.language.get('SERVERINFO')[12]} **${message.guild.afkTimeout}** \n• Shard : **${message.guild.shard.id + 1} / ${this.client.shard.count}**`)
      .addField('\u200b', '\u200b')
      .addField(`${message.language.get('SERVERINFO')[14]} (${message.guild.memberCount})`, `**${guildMembers.filter(member => !member.user.bot).size}** ${message.language.get('SERVERINFO')[15]} • **${guildMembers.filter(member => member.user.bot).size}** ${message.language.get('SERVERINFO')[16]} \n${message.language.get('UTILS').STATUS.online} : **${guildMembers.filter(o => o.presence.status === 'online').size}** \n${message.language.get('UTILS').STATUS.idle} : **${guildMembers.filter(o => o.presence.status === 'idle').size}** \n${message.language.get('UTILS').STATUS.dnd} : **${guildMembers.filter(o => o.presence.status === 'dnd').size}** \n${message.language.get('UTILS').STATUS.offline} : **${guildMembers.filter(o => o.presence.status === 'offline').size}**`, true)
      .addField(`${message.language.get('SERVERINFO')[19]} (${message.guild.channels.cache.size})`, `${message.language.get('SERVERINFO')[20]} **${message.guild.channels.cache.filter(chan => chan.type === 'text').size}** \n${message.language.get('SERVERINFO')[21]} **${message.guild.channels.cache.filter(chan => chan.type === 'voice').size}** \n${message.language.get('SERVERINFO')[22]} **${message.guild.channels.cache.filter(chan => chan.type === 'category').size}**`, true)
      .addField('\u200b', '\u200b')
      .addField(message.language.get('SERVERINFO')[17], `${(message.guild.roles.cache.array().length > 10 ? `${message.guild.roles.cache.array().slice(0, 10).join(', ')} ${message.language.get('MORE_SIZE', message.guild.roles.cache.array().length - 10)}` : message.guild.roles.cache.array().join(', '))}`)
      .addField(message.language.get('SERVERINFO')[18], `${message.guild.emojis.cache.array().length !== 0 ? ((message.guild.emojis.cache.array().length > 10 ? `${message.guild.emojis.cache.array().slice(0, 10).join(', ')} ${message.language.get('MORE_SIZE', message.guild.emojis.cache.array().length - 10)}` : message.guild.emojis.cache.array().join(', '))) : message.language.get('EMOTE_0')}`)
      .setTimestamp()
      .setFooter(this.client.user.username, this.client.user.avatarURL())
    )
  }
}
