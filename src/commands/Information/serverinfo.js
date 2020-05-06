'use strict'

const Command = require('../../../core/Command.js')
const {MessageEmbed} = require('discord.js')

module.exports = class Serverinfo extends Command {
  constructor (client) {
    super(client, {
      name: 'serverinfo',
      cooldown: 3,
      enabled: true,
      owner: false,
      plugin: false,
      aliases: ['guildinfo', 'guild', 'server'],
      permission: [],
      botpermissions: ['EMBED_LINKS'],
      usage: (language, prefix) => language.get('SERVERINFO_USAGE', prefix),
      category: (language) => language.get('UTILS').INFORMATION_CATEGORY,
      examples: (language, prefix) => language.get('SERVERINFO_USAGE', prefix)
    })
  }

  async run (message) {

    const guildCreateDate = message.guild.createdAt.toString().split(' ')
    const guildMembers = await message.guild.members.fetch()

    const embed = new MessageEmbed()
      .setColor(this.client.config.embed.color)
      .setThumbnail(message.guild.iconURL())
      .setDescription(message.language.get('SERVERINFO_EMBED')[0])
      .addField(message.language.get('SERVERINFO_EMBED')[1], `${message.language.get('SERVERINFO_EMBED')[2]} **${message.guild.name}** \n${message.language.get('SERVERINFO_EMBED')[3]} **${message.guild.id}** \n${message.language.get('SERVERINFO_EMBED')[4]} **${message.guild.owner}** \n${message.language.get('SERVERINFO_EMBED')[5]} **${message.language.get('UTILS').REGION[message.guild.region] ? message.language.get('UTILS').REGION[message.guild.region] : message.guild.region}** \n${message.language.get('SERVERINFO_EMBED')[6]} **${this.client.functions.getDate(guildCreateDate, message)}**`)
      .addField(message.language.get('SERVERINFO_EMBED')[7], `${message.language.get('SERVERINFO_EMBED')[8]} ${Array.from(message.channel.guild.members.cache.values()).sort((a, b) => b.joinedAt - a.joinedAt).map(m => `<@!${m.id}>`).slice(0, 1)} \n${message.language.get('SERVERINFO_EMBED')[9]} **${message.language.get('UTILS').VERIFICATION_LEVEL[message.guild.verificationLevel]}** \n${message.language.get('SERVERINFO_EMBED')[10]} **${message.language.get('UTILS').CONTENT_LEVEL[message.guild.explicitContentFilter]}** \n${message.language.get('SERVERINFO_EMBED')[11]} ${message.guild.afkChannelID !== null ? message.guild.afkChannel : `${message.language.get('SERVERINFO_EMBED')[13]}`} \n${message.language.get('SERVERINFO_EMBED')[12]} **${message.guild.afkTimeout}** \n• Shard : **${message.guild.shard.id + 1} / ${this.client.shard.count}**`)
      .addField('\u200b', '\u200b', false)
      .addField(`${message.language.get('SERVERINFO_EMBED')[14]} (${message.guild.memberCount})`, `**${guildMembers.filter(member => !member.user.bot).size}** ${message.language.get('SERVERINFO_EMBED')[15]} • **${guildMembers.filter(member => member.user.bot).size}** ${message.language.get('SERVERINFO_EMBED')[16]} \n${message.language.get('UTILS').STATUS['online']} : **${guildMembers.filter(o => o.presence.status === 'online').size}** \n${message.language.get('UTILS').STATUS['idle']} : **${guildMembers.filter(o => o.presence.status === 'idle').size}** \n${message.language.get('UTILS').STATUS['dnd']} : **${guildMembers.filter(o => o.presence.status === 'dnd').size}** \n${message.language.get('UTILS').STATUS['offline']} : **${guildMembers.filter(o => o.presence.status === 'offline').size}**`, true)
      .addField(`${message.language.get('SERVERINFO_EMBED')[19]} (${message.guild.channels.cache.size})`, `${message.language.get('SERVERINFO_EMBED')[20]} **${message.guild.channels.cache.filter(chan => chan.type === 'text').size}** \n${message.language.get('SERVERINFO_EMBED')[21]} **${message.guild.channels.cache.filter(chan => chan.type === 'voice').size}** \n${message.language.get('SERVERINFO_EMBED')[22]} **${message.guild.channels.cache.filter(chan => chan.type === 'category').size}**`, true)
      .addField('\u200b', '\u200b', false)
      .addField(message.language.get('SERVERINFO_EMBED')[17], `${(message.guild.roles.cache.array().length > 10 ? `${message.guild.roles.cache.array().slice(0, 10).join(', ')} ${message.language.get('ROLE_MORE_SIZE', message.guild.roles.cache.array().length - 10)}` : message.guild.roles.cache.array().join(', '))}`)
      .addField(message.language.get('SERVERINFO_EMBED')[18], `${message.guild.emojis.cache.array().length !== 0 ? ((message.guild.emojis.cache.array().length > 10 ? `${message.guild.emojis.cache.array().slice(0, 10).join(', ')} ${message.language.get('EMOTE_MORE_SIZE', message.guild.emojis.cache.array().length - 10)}` : message.guild.emojis.cache.array().join(', '))) : message.language.get('EMOTE_0')}`)
      .setTimestamp()
      .setFooter(this.client.user.username, this.client.user.avatarURL())

    return message.channel.send(embed)
  }
}
