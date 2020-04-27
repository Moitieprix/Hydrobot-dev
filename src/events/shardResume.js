'use strict'

const { WebhookClient } = require('discord.js')

module.exports = (client, shardID) => {
  client.logger.shard(`Shard ${shardID} Ready!`)

  new WebhookClient(client.config.webhooks.shards.id, client.config.webhooks.shards.token).send({
    embeds: [{
      color: 0x00FF00,
      description: `:white_check_mark: • Shard \`${shardID}\` relancé`,
      timestamp: new Date()
    }]

  })
}
