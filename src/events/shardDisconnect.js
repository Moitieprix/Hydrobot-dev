'use strict'

const { WebhookClient } = require('discord.js')

module.exports = (client, event, shardID) => {
  client.logger.shard(`Shard ${shardID} en cours de relancement !`)

  new WebhookClient(client.config.webhooks.shards.id, client.config.webhooks.shards.token).send({
    embeds: [{
      color: 0xFF0000,
      description: `:warning: • Shard \`${shardID}\` déconnectée`,
      timestamp: new Date()
    }]
  })
}
