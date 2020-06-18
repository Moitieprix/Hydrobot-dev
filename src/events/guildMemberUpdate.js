'use strict'

const { MessageEmbed } = require('discord.js')

module.exports = async (client, oldMember, newMember) => {
  if (oldMember.user.bot) return

  if (oldMember.nickname !== newMember.nickname || oldMember.roles.cache.size !== newMember.roles.cache.size) {
    const res = await client.functions.getDataSettings(client, newMember.guild.id)
    if (!res) return

    const channel = res.rows[0].channels.logs

    if (!res.rows[0].system.logs || !res.rows[0].logs_list.guildMemberUpdate || channel === '0') return
    if (!newMember.guild.channels.cache.some(ch => ch.id === channel)) return
    if (!client.channels.cache.get(channel).permissionsFor(client.user.id).has('SEND_MESSAGES')) return

    const language = new (require(`../../i18n/${res.rows[0].language}`))()

    const embed = new MessageEmbed()
      .setColor(client.config.embed.color)
      .setTitle(language.get('LOGS_EVENTS').GUILD_MEMBER_UPDATED[0])
      .setTimestamp()
      .setFooter(client.user.username, client.user.avatarURL())

    if (oldMember.nickname !== newMember.nickname) {
      const oldNickname = oldMember.nickname ? oldMember.nickname : language.get('LOGS_EVENTS').GUILD_MEMBER_UPDATED[5]
      const newNickname = newMember.nickname ? newMember.nickname : language.get('LOGS_EVENTS').GUILD_MEMBER_UPDATED[5]

      embed.addField(language.get('LOGS_EVENTS').GUILD_MEMBER_UPDATED[2], `${newMember.user.tag} (ID: ${newMember.user.id})`)
      embed.addField(language.get('LOGS_EVENTS').GUILD_MEMBER_UPDATED[1], `${language.get('LOGS_EVENTS').GUILD_MEMBER_UPDATED[3]} **${oldNickname}** \n${language.get('LOGS_EVENTS').GUILD_MEMBER_UPDATED[4]} **${newNickname}**`)
    }

    if (oldMember.roles.cache.size !== newMember.roles.cache.size) {
      if (oldMember.roles.cache.size < newMember.roles.cache.size) {
        newMember.roles.cache.map(role => {
          if (!oldMember.roles.cache.has(role.id)) {
            embed.addField(language.get('LOGS_EVENTS').GUILD_MEMBER_UPDATED[2], `${newMember.user.tag} (ID: ${newMember.user.id})`)
            embed.addField(language.get('LOGS_EVENTS').GUILD_MEMBER_UPDATED[6], `**${oldMember.guild.roles.cache.get(role.id).name}**`)
          }
        })
      } else if (oldMember.roles.cache.size > newMember.roles.cache.size) {
        oldMember.roles.cache.map(role => {
          if (!newMember.roles.cache.has(role.id)) {
            embed.addField(language.get('LOGS_EVENTS').GUILD_MEMBER_UPDATED[2], `${newMember.user.tag} (ID: ${newMember.user.id})`)
            embed.addField(language.get('LOGS_EVENTS').GUILD_MEMBER_UPDATED[7], `**${oldMember.guild.roles.cache.get(role.id).name}**`)
          }
        })
      }
    }
    newMember.guild.channels.cache.get(channel).send(embed)
  }
}
