'use strict'

const { MessageEmbed } = require('discord.js')

module.exports = async (client, oldUser, newUser) => {
  if (oldUser.bot) return

  const guildsId = []
  for (const [id, guild] of client.guilds.cache) {
    try {
      guild.members.fetch(oldUser.id)
      guildsId.push(`'${id}'`)
    } catch (e) {
      if (e === 'DiscordAPIError: Unknown User') continue
      else return
    }
  }

  const res = await client.database.query(`SELECT id, channels, language FROM settings WHERE id IN (${guildsId.join()}) AND system->>'logs' = 'true' AND channels->>'logs' <> '0' AND logs_list->>'userUpdate' = 'true'`)
  if (res.rows.length === 0) return

  for (const element of res.rows) {
    const channel = element.channels.logs

    if (!client.channels.cache.get(channel)) continue
    if (!client.channels.cache.get(channel).permissionsFor(client.user.id).has('SEND_MESSAGES')) continue

    const language = new (require(`../../i18n/${element.language}`))()

    const embed = new MessageEmbed()
      .setColor(client.config.embed.color)
      .setTitle(language.get('LOGS_EVENTS').USER_UPDATED[0])
      .setTimestamp()
      .setFooter(client.user.username, client.user.avatarURL())

    if (oldUser.username !== newUser.username) {
      embed.addField(language.get('LOGS_EVENTS').USER_UPDATED[10], `${newUser.tag} (ID: ${newUser.id})`)
      embed.addField(language.get('LOGS_EVENTS').USER_UPDATED[1], `${language.get('LOGS').USER_UPDATED[1]} **${oldUser.username}** \n${language.get('LOGS_EVENTS').USER_UPDATED[2]} **${newUser.username}**`)
    }

    if (oldUser.discriminator !== newUser.discriminator) {
      embed.addField(language.get('LOGS_EVENTS').USER_UPDATED[10], `${newUser.tag} (ID: ${newUser.id})`)
      embed.addField(language.get('LOGS_EVENTS').USER_UPDATED[4], `${language.get('LOGS_EVENTS').USER_UPDATED[5]} **#${oldUser.discriminator}** \n${language.get('LOGS_EVENTS').USER_UPDATED[6]} **#${newUser.discriminator}**`)
    }

    if (oldUser.avatar !== newUser.avatar) {
      embed.addField(language.get('LOGS_EVENTS').USER_UPDATED[10], `${newUser.tag} (ID: ${newUser.id})`)
      embed.addField(language.get('LOGS_EVENTS').USER_UPDATED[7], `[[${language.get('LOGS_EVENTS').USER_UPDATED[8]}]](${oldUser.displayAvatarURL({ dynamic: true })}) → [[${language.get('LOGS_EVENTS').USER_UPDATED[9]}]](${newUser.displayAvatarURL({ dynamic: true })})`)
    }

    client.channels.cache.get(channel).send(embed)
    continue
  }
}
