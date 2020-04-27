'use strict'

const { WebhookClient } = require('discord.js')

module.exports = (client, err, shardID) => {
  client.logger.shard(`Shard ${shardID} en cours de relancement !`)

  new WebhookClient(client.config.webhooks.shards.id, client.config.webhooks.shards.token).send({
    embeds: [{
      color: 0xFF0000,
      description: `:warning: • Erreur sur la shard \`${shardID}\` \n\`\`\`js\n${err}\`\`\``,
      timestamp: new Date()
    }]

  })
}
