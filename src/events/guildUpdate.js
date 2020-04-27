'use strict'

const { MessageEmbed } = require('discord.js')

module.exports = async (client, oldGuild, newGuild) => {
  client.database.query('SELECT * FROM settings WHERE id = $1', [newGuild.id], async (err, res) => {

    const channel = res.rows[0].channels.logs

    if(!res.rows[0].system.logs || !res.rows[0]['logs_list']['guildUpdate'] || channel === '0') return
    if (!newGuild.channels.cache.some(ch => ch.id === channel)) return
    if (!client.channels.cache.get(channel).permissionsFor(client.user.id).has('SEND_MESSAGES')) return

    const language = new (require(`../../i18n/${res.rows[0].language}`))

    const embed = new MessageEmbed()
      .setColor(client.config.embed.color)
      .setTitle(language.get('LOGS').GUILD_UPDATED[0])
      .setTimestamp()
      .setFooter(client.user.username, client.user.avatarURL());

    if (oldGuild.name !== newGuild.name) embed.addField(language.get('LOGS').GUILD_UPDATED[1], `${language.get('LOGS').GUILD_UPDATED[2]} **${oldGuild.name}** \n${language.get('LOGS').GUILD_UPDATED[3]} **${newGuild.name}**`)

    if (oldGuild.region !== newGuild.region) embed.addField(language.get('LOGS').GUILD_UPDATED[4], `${language.get('LOGS').GUILD_UPDATED[5]} **${language.get('UTILS').REGION[oldGuild.region]}** \n${language.get('LOGS').GUILD_UPDATED[6]} **${language.get('UTILS').REGION[newGuild.region]}**`)

    if (oldGuild.icon !== newGuild.icon) {
      const oldIcon = oldGuild.iconURL() ? `[[${language.get('LOGS').GUILD_UPDATED[8]}]](${oldGuild.iconURL()})` : language.get('LOGS').GUILD_UPDATED[10]
      const newIcon = newGuild.iconURL() ? `[[${language.get('LOGS').GUILD_UPDATED[9]}]](${newGuild.iconURL()})` : language.get('LOGS').GUILD_UPDATED[10]

      embed.addField(language.get('LOGS').GUILD_UPDATED[7], `${oldIcon} → ${newIcon}`)
    }

    if (oldGuild.premiumSubscriptionCount !== newGuild.premiumSubscriptionCount) {
      if (oldGuild.premiumSubscriptionCount < newGuild.premiumSubscriptionCount) embed.addField(language.get('LOGS').GUILD_UPDATED[11], `${language.get('LOGS').GUILD_UPDATED[13]} ${newGuild.premiumSubscriptionCount}`)
      if (oldGuild.premiumSubscriptionCount > newGuild.premiumSubscriptionCount) embed.addField(language.get('LOGS').GUILD_UPDATED[12], `${language.get('LOGS').GUILD_UPDATED[13]} ${newGuild.premiumSubscriptionCount}`)
    }

    if (oldGuild.premiumTier !== newGuild.premiumTier) {
      if (oldGuild.premiumTier < newGuild.premiumTier) embed.addField(language.get('LOGS').GUILD_UPDATED[14], `${language.get('LOGS').GUILD_UPDATED[16]} **${newGuild.premiumTier}**`)
      if (oldGuild.premiumTier > newGuild.premiumTier) embed.addField(language.get('LOGS').GUILD_UPDATED[15], `${language.get('LOGS').GUILD_UPDATED[16]} **${newGuild.premiumTier}**`)
    }

    if (oldGuild.afkChannel !== newGuild.afkChannel) {
      const oldAfk = oldGuild.afkChannel ? oldGuild.afkChannel : language.get('LOGS').GUILD_UPDATED[20]
      const newAfk = newGuild.afkChannel ? newGuild.afkChannel : language.get('LOGS').GUILD_UPDATED[20]

      embed.addField(language.get('LOGS').GUILD_UPDATED[17], `${language.get('LOGS').GUILD_UPDATED[18]} **${oldAfk}** \n${language.get('LOGS').GUILD_UPDATED[19]} **${newAfk}**`)
    }

    if (oldGuild.banner !== newGuild.banner) {
      const oldBanner = oldGuild.bannerURL() ? `[[${language.get('LOGS').GUILD_UPDATED[22]}]](${oldGuild.bannerURL()})` : language.get('LOGS').GUILD_UPDATED[24]
      const newBanner = newGuild.bannerURL() ? `[[${language.get('LOGS').GUILD_UPDATED[23]}]](${newGuild.bannerURL()})` : language.get('LOGS').GUILD_UPDATED[24]

      embed.addField(language.get('LOGS').GUILD_UPDATED[21], `${oldBanner} → ${newBanner}`)
    }

    if (oldGuild.vanityURLCode !== newGuild.vanityURLCode) {
      const oldURL = oldGuild.vanityURLCode ? oldGuild.vanityURLCode : language.get('LOGS').GUILD_UPDATED[28]
      const newURL = newGuild.vanityURLCode ? newGuild.vanityURLCode : language.get('LOGS').GUILD_UPDATED[28]

      embed.addField(language.get('LOGS').GUILD_UPDATED[25], `${language.get('LOGS').GUILD_UPDATED[26]} **${oldURL}** \n${language.get('LOGS').GUILD_UPDATED[27]} **${newURL}**`)
    }

    if (oldGuild.explicitContentFilter !== newGuild.explicitContentFilter) embed.addField(language.get('LOGS').GUILD_UPDATED[29], `${language.get('LOGS').GUILD_UPDATED[30]} **${language.get('UTILS').CONTENT_LEVEL[oldGuild.explicitContentFilter]}** \n${language.get('LOGS').GUILD_UPDATED[31]} **${language.get('UTILS').CONTENT_LEVEL[newGuild.explicitContentFilter]}**`)

    if (oldGuild.verificationLevel !== newGuild.verificationLevel) embed.addField(language.get('LOGS').GUILD_UPDATED[32], `${language.get('LOGS').GUILD_UPDATED[33]} **${language.get('UTILS').VERIFICATION_LEVEL[oldGuild.verificationLevel]}** \n${language.get('LOGS').GUILD_UPDATED[34]} **${language.get('UTILS').VERIFICATION_LEVEL[newGuild.verificationLevel]}**`)

    return newGuild.channels.cache.get(channel).send(embed)

  })
}