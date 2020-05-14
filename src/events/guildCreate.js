'use strict'

const { WebhookClient } = require('discord.js')

module.exports = async (client, guild) => {
  const guilds = await client.shard.fetchClientValues('guilds.cache.size')
  const guildsSize = guilds.reduce((accumulator, currentValue) => accumulator + currentValue, 0)

  new WebhookClient(client.config.webhooks.guilds.id, client.config.webhooks.guilds.token).send({
    embeds: [{
      color: 0x00FF00,
      title: 'Nouveau serveur !',
      thumbnail: {
        url: guild.iconURL()
      },
      fields: [
        {
          name: 'Nom',
          value: guild.name,
          inline: true
        },
        {
          name: 'ID',
          value: guild.id,
          inline: true
        },
        {
          name: 'Nombre de membres',
          value: guild.memberCount,
          inline: true
        },
        {
          name: 'Owner',
          value: `${guild.owner.user.tag} (${guild.owner.id})`,
          inline: true
        },
        {
          name: 'Shard :',
          value: guild.shardID,
          inline: true
        },
        {
          name: 'Nombre de serveur :',
          value: guildsSize,
          inline: true
        }
      ],
      timestamp: new Date()
    }]
  })

  await client.functions.getDataSettings(client, guild.id)
}
