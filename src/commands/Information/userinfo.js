'use strict'

const Command = require('../../classes/Command')
const { MessageEmbed } = require('discord.js')

module.exports = class Userinfo extends Command {
  constructor (client) {
    super(client, {
      name: 'userinfo',
      aliases: ['user', 'member', 'memberinfo', 'whois'],
      botpermissions: ['EMBED_LINKS'],
      usage: (language, prefix) => language.get('USERINFO_USAGE', prefix),
      category: (language) => language.get('UTILS').INFORMATION_CATEGORY,
      examples: (language, prefix) => language.get('USERINFO_EXAMPLE', prefix)
    })
  }

  async run (message, args) {
    const user = await this.client.functions.userFilter(message, args)

    if (!user) {
      return
    }

    const member = message.guild.member(user)

    const guildUsers = await message.guild.members.fetch()
    const guildarray = guildUsers.array()

    guildarray.sort((a, b) => a.joinedTimestamp - b.joinedTimestamp)

    const joinPos = guildarray.findIndex(mem => mem.joinedTimestamp === member.joinedTimestamp)
    const nearbyMems = []
    for (let i = joinPos - 2; i < joinPos + 3; i++) {
      if (i < 0 || i >= message.guild.memberCount) {
        continue
      }
      nearbyMems.push(i === joinPos ? `**${guildarray[i].user.username}**` : guildarray[i].user.username)
    }

    const playing = user.presence.activities.some(pr => pr.type === 'PLAYING') ? user.presence.activities.find(ch => ch.type === 'PLAYING').name : message.language.get('USERINFO')[10]

    const permissionsArraySerialize = Object.entries(message.channel.permissionsFor(user).serialize())
    const permissionsArray = []
    for (const perm of permissionsArraySerialize) {
      if (perm[1]) {
        permissionsArray.push(`\`${perm[0]}\``)
      }
    }

    const flags = await user.fetchFlags()
    const flagsArraySerialize = Object.entries(flags.serialize())
    const flagsArray = []
    for (const flag of flagsArraySerialize) {
      if (flag[1]) {
        flagsArray.push(`\`${flag[0]}\``)
      }
    }

    message.channel.send(new MessageEmbed()
      .setColor(this.client.config.embed.color)
      .setAuthor(user.username, user.displayAvatarURL({ dynamic: true }))
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .setDescription(message.language.get('USERINFO')[0])
      .addField(message.language.get('USERINFO')[1], `${message.language.get('USERINFO')[2]} **${user.tag}** \n${message.language.get('USERINFO')[3]} **${user.id}** \n${message.language.get('USERINFO')[4]} **${this.client.functions.timestampToDate(user.createdTimestamp, message)}** \n${message.language.get('USERINFO')[5]} **${this.client.functions.timestampToDate(member.joinedTimestamp, message)}** \n${message.language.get('USERINFO')[6]} **${message.language.get('UTILS').STATUS[user.presence.status]}**`)
      .addField(message.language.get('USERINFO')[7], `${message.language.get('USERINFO')[8]} ${member.nickname ? `**${member.nickname}**` : `**${user.username}**`} \n${message.language.get('USERINFO')[9]} **${playing}** \n${message.language.get('USERINFO')[11]} ${member.roles.highest} \n${message.language.get('USERINFO')[12]} ${message.language.get('UTILS').BOOLEAN[member.user.bot]}`)
      .addField('\u200b', '\u200b')
      .addField(`${message.language.get('USERINFO')[14]} (${joinPos + 1})`, nearbyMems.join(' > '))
      .addField(message.language.get('USERINFO')[13], `${(member.roles.cache.array().length > 10 ? `${member.roles.cache.array().slice(0, 10).join(', ')} ${message.language.get('ROLE_MORE_SIZE', member.roles.cache.array().length - 10)}` : member.roles.cache.array().join(', '))}`)
      .addField(message.language.get('USERINFO')[15], permissionsArray ? permissionsArray.join(', ') : message.language.get('USERINFO')[16])
      .addField(message.language.get('USERINFO')[17], flagsArray ? flagsArray.join(', ') : message.language.get('USERINFO')[18])
      .setTimestamp()
      .setFooter(this.client.user.username, this.client.user.avatarURL())
    )
  }
}
