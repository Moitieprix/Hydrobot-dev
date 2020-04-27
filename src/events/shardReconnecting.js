'use strict'

const { WebhookClient } = require('discord.js')

module.exports = (client, shardID) => {
  client.logger.shard(`Shard ${shardID} en cours de relancement !`)

  new WebhookClient(client.config.webhooks.shards.id, client.config.webhooks.shards.token).send({
    embeds: [{
      color: 0x0100FF,
      description: `:clock4: • Relance de la shard \`${shardID}\`...`,
      timestamp: new Date()
    }]

  })
}
