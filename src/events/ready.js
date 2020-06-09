'use strict'

const { WebhookClient, MessageEmbed } = require('discord.js')

module.exports = async (client) => {
  client.logger.info('Hydrobot ready!')

  const users = await client.shard.broadcastEval('this.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0)')
  const guilds = await client.shard.fetchClientValues('guilds.cache.size')

  const usersSize = users.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  const guildsSize = guilds.reduce((accumulator, currentValue) => accumulator + currentValue, 0)

  const embed = new MessageEmbed()
    .setTitle('Bot Ready')
    .setColor(client.config.embed.color)
    .addField('Nombre de shard(s) :', client.shard.count, true)
    .addField('Nombre de serveur :', guildsSize, true)
    .addField('Nombre d\'utilisateurs :', usersSize, true)
    .addField('RAM (heap) :', `${(process.memoryUsage().heapUsed / 1000 / 1000).toFixed(2)}Mo`, true)
    .addField('RAM (total) :', `${(process.memoryUsage().heapTotal / 1000 / 1000).toFixed(2)}Mo`, true)
    .addField('CPU :', `${client.functions.getCpuUsagePercent()}%`, true)
    .setTimestamp()

  new WebhookClient(client.config.webhooks.boot.id, client.config.webhooks.boot.token).send(embed)

  const games = [
    {
      name: `h!guide • ${client.config.version}`
    },
    {
      name: `h!guide • ${usersSize} users`
    },
    {
      name: `h!guide • ${guildsSize} guilds`
    },
    {
      name: 'h!guide • Thank for using me ! ❤'
    }
  ]

  let i = 0
  setInterval(async function () {
    await client.user.setActivity(games[i].name)
    if (games[i + 1]) i++
    else i = 0
  }, 20000)
}
