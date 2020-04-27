'use strict'

const { WebhookClient } = require('discord.js')

module.exports = async (client, guild) => {
  const guilds = await client.shard.fetchClientValues('guilds.cache.size')

  let guildsSize = 0
  for (let i = 0; i < client.shard.count; i++) {
    guildsSize = guildsSize + guilds[i]
  }

  new WebhookClient(client.config.webhooks.guilds.id, client.config.webhooks.guilds.token).send({
    embeds: [{
      color: 0xFF0000,
      title: `Serveur retiré ! ${guild.available ? '' : `${client.emote.others.caution} Serveur en panne`}`,
      thumbnail: {
        url: guild.iconURL(),
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

  console.log(guild.available)

  if(guild.available) {
    client.database.query('SELECT * FROM settings WHERE id = $1', [guild.id], async (err, res) => {
      if (res.rows.length === 1) {
        await client.database.query('DELETE FROM settings WHERE id = $1', [guild.id])
      }
    })
  }

}