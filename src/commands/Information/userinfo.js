'use strict'

const Command = require('../../../core/Command.js')
const {MessageEmbed} = require('discord.js')

module.exports = class Userinfo extends Command {
  constructor (client) {
    super(client, {
      name: 'userinfo',
      cooldown: 3,
      enabled: true,
      owner: false,
      nsfw: false,
      plugin: false,
      aliases: ['user', 'member', 'memberinfo', 'whois'],
      permission: [],
      botpermissions: ['EMBED_LINKS'],
      description: (language) => language.get('USERINFO_DESC'),
      usage: (language, prefix) => language.get('USERINFO_USAGE', prefix),
      category: (language) => language.get('UTILS').INFORMATION_CATEGORIE,
      examples: (language, prefix) => language.get('USERINFO_EXEMPLE', prefix)
    })
  }

  async run (message, args) {
    const user = await this.client.functions.userFilter(message, args)

    if (!user) return message.channel.send(message.language.get('UTILS').USER_DEFAUT)

    const member = message.guild.member(user)

    const guildUsers = await message.guild.members.fetch()
    const guildarray = guildUsers.array()

    guildarray.sort((a, b) => a.joinedTimestamp - b.joinedTimestamp)

    const joinPos = guildarray.findIndex(mem => mem.joinedTimestamp === member.joinedTimestamp)
    const nearbyMems = []
    for (let i = joinPos - 2; i < joinPos + 3; i++) {
      if (i < 0 || i >= message.guild.memberCount) continue
      nearbyMems.push(i === joinPos ? `**${guildarray[i].user.username}**` : guildarray[i].user.username)
    }

    const playing = user.presence.activities.some(pr => pr.type === 'PLAYING') ? user.presence.activities.find(ch => ch.type === 'PLAYING').name : message.language.get('USERINFO_EMBED')[10]

    const object = message.channel.permissionsFor(user).serialize()
    const array = Object.entries(object)
    const permission = array.map(e => e[1] ? '`' + e[0] + '`, ' : '').join('')

    const memberCreatedAt = member.user.createdAt.toString().split(' ')
    const memberJoinedAt = member.joinedAt.toString().split(' ')

    const embed = new MessageEmbed()
      .setColor(this.client.config.embed.color)
      .setAuthor(user.username, user.displayAvatarURL({ dynamic: true }))
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .setDescription(message.language.get('USERINFO_EMBED')[0])
      .addField(message.language.get('USERINFO_EMBED')[1], `${message.language.get('USERINFO_EMBED')[2]} ${`**${user.tag}**`} \n${message.language.get('USERINFO_EMBED')[3]} **${user.id}** \n${message.language.get('USERINFO_EMBED')[4]} **${this.client.functions.getDate(memberCreatedAt, message)}** \n${message.language.get('USERINFO_EMBED')[5]} **${this.client.functions.getDate(memberJoinedAt, message)}** \n${message.language.get('USERINFO_EMBED')[6]} **${message.language.get('UTILS').STATUS[member.presence.status]}**`)
      .addField(message.language.get('USERINFO_EMBED')[7], `${message.language.get('USERINFO_EMBED')[8]} ${member.nickname ? `**${member.nickname}**` : `**${user.username}**`} \n${message.language.get('USERINFO_EMBED')[9]} **${playing}** \n${message.language.get('USERINFO_EMBED')[11]} ${member.roles.highest} \n${message.language.get('USERINFO_EMBED')[12]} ${message.language.get('UTILS').BOOLEAN[member.user.bot]}`)
      .addField('\u200b', '\u200b', false)
      .addField(`${message.language.get('USERINFO_EMBED')[14]} (${joinPos + 1})`, nearbyMems.join(' > '))
      .addField(message.language.get('USERINFO_EMBED')[13], `${(member.roles.cache.array().length > 15 ? `${member.roles.cache.array().slice(0, 15).join(', ')} ${message.language.get('ROLE_MORE_SIZE', member.roles.cache.array().length - 15)}` : member.roles.cache.array().join(', '))}`)
      .addField(message.language.get('USERINFO_EMBED')[15], permission ? permission.substring(0, permission.length - 2) : message.language.get('USERINFO_EMBED')[16])
      .setTimestamp()
      .setFooter(this.client.user.username, this.client.user.avatarURL())

    return message.channel.send(embed)
  }
}