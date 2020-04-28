'use strict'

const { MessageEmbed } = require('discord.js')

module.exports = async (client, oldUser, newUser) => {

  if (oldUser.bot) return

  client.guilds.cache.forEach(async guild => {
    const fetchMembers = await guild.members.fetch()
    if (!fetchMembers.has(oldUser.id)) return

    const res = await client.database.query('SELECT * FROM settings WHERE id = $1', [guild.id])

      if (res.rows.length === 0) return

      const channel = res.rows[0].channels.logs

      if(!res.rows[0].system.logs || !res.rows[0]['logs_list']['userUpdate'] || channel === '0') return
      if (!guild.channels.cache.some(ch => ch.id === channel)) return
      if (!client.channels.cache.get(channel).permissionsFor(client.user.id).has('SEND_MESSAGES')) return

      const language = new (require(`../../i18n/${res.rows[0].language}`))

      const embed = new MessageEmbed()
        .setColor(client.config.embed.color)
        .setTitle(language.get('LOGS').USER_UPDATED[0])
        .setTimestamp()
        .setFooter(client.user.username, client.user.avatarURL())

      if (oldUser.username !== newUser.username) {
        embed.addField(language.get('LOGS').USER_UPDATED[10], `${newUser.tag} (ID: ${newUser.id})`)
        embed.addField(language.get('LOGS').USER_UPDATED[1], `${language.get('LOGS').USER_UPDATED[1]} **${oldUser.username}** \n${language.get('LOGS').USER_UPDATED[2]} **${newUser.username}**`)
      }

      if (oldUser.discriminator !== newUser.discriminator) {
        embed.addField(language.get('LOGS').USER_UPDATED[10], `${newUser.tag} (ID: ${newUser.id})`)
        embed.addField(language.get('LOGS').USER_UPDATED[4], `${language.get('LOGS').USER_UPDATED[5]} **#${oldUser.discriminator}** \n${language.get('LOGS').USER_UPDATED[6]} **#${newUser.discriminator}**`)
      }

      if (oldUser.avatar !== newUser.avatar) {
        embed.addField(language.get('LOGS').USER_UPDATED[10], `${newUser.tag} (ID: ${newUser.id})`)
        embed.addField(language.get('LOGS').USER_UPDATED[7], `[[${language.get('LOGS').USER_UPDATED[8]}]](${oldUser.displayAvatarURL({dynamic: true})}) → [[${language.get('LOGS').USER_UPDATED[9]}]](${newUser.displayAvatarURL({dynamic: true})})`)
      }

      return guild.channels.cache.get(channel).send(embed)
    })
}