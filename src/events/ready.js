'use strict'

const { WebhookClient, MessageEmbed } = require('discord.js')

module.exports = async (client) => {
  client.logger.info('Hydrobot ready!')

  const users = await client.shard.fetchClientValues('users.cache.size')
  const guilds = await client.shard.fetchClientValues('guilds.cache.size')

  let usersSize = 0
  let guildsSize = 0
  for (let i = 0; i < client.shard.count; i++) {
    usersSize = usersSize + users[i]
    guildsSize = guildsSize + guilds[i]
  }

  const embed = new MessageEmbed()
    .setTitle('Bot Ready')
    .setColor(client.config.embed.color)
    .addField('Nombre de shard(s) :', client.shard.count, true)
    .addField('Nombre de serveur :', guildsSize, true)
    .addField('Nombre d\'utilisateurs :', usersSize, true)
    .addField('RAM (heap) :', `${(process.memoryUsage()['heapUsed'] / 1000 / 1000).toFixed(2)}Mo`, true)
    .addField('RAM (total) :', `${(process.memoryUsage()['heapTotal'] / 1000 / 1000).toFixed(2)}Mo`, true)
    .addField('CPU :', `${client.functions.getCpuUsagePercent()}%`, true)
    .setTimestamp()

  new WebhookClient(client.config.webhooks.boot.id, client.config.webhooks.boot.token).send(embed)

  const games = [
    {
      name: `mention me ! • ${client.config.version}`
    },
    {
      name: `mention me ! • ${usersSize} users`
    },
    {
      name: `mention me ! • ${guildsSize} guilds`
    },
    {
      name: 'mention me ! • Thank for using me ! ❤'
    }
  ]

  let i = 0
  setInterval(async function () {
    await client.user.setActivity(games[i].name)
    if (games[parseInt(i + 1)]) i++
    else i = 0
  }, 15000)
}
