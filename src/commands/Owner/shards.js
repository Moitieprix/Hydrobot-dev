const Command = require('../../classes/Command')

class Shards extends Command {
  constructor (client) {
    super(client, {
      name: 'shards',
      usage: 'h!shards',
      enabled: true,
      category: (language) => language.get('UTILS').BOTSTAFF_CATEGORY,
      aliases: [],
      permission: [],
      botpermissions: ['EMBED_LINKS'],
      examples: 'h!shards',
      owner: true,
      nsfw: false,
      cooldown: 3,
      plugin: false,
    })
  }

  async run (message) {
    const shardStatus = {
      0: 'Ready',
      1: 'Connecting',
      2: 'Reconnecting',
      3: 'Idle',
      4: 'Nearly',
      5: 'Disconnected'
    }

    const ram = await this.client.shard.broadcastEval(`[
        this.shard.ids,
        (process.memoryUsage().heapUsed / 1000 / 1000).toFixed(2),
        this.ws.ping,
        this.guilds.cache.size,
        this.users.cache.size,
        this.ws.status,
        this.uptime
        ]`)

    const ramArray = []

    ram.forEach(i => {
      ramArray.push({
        id: i[0],
        ram: i[1],
        ping: i[2],
        guilds: i[3],
        users: i[4],
        status: i[5],
        uptime: i[6]
      })
    }
    )

    const array = []
    for (let i = 0; i < this.client.shard.count; i++) {
      const found = ramArray.find(element => element.id[0] === i)
      console.log(ramArray)
      array.push(`${message.guild.shard.id !== found.id[0] ? '' : '✔ '}Shard ${found.id} | Ping: ${Math.round(found.ping)}ms | ${found.guilds} guilds | ${found.users} users | uptime : ${this.client.functions.getDuration(found.uptime)} | statut : ${shardStatus[found.status]} | ram : ${found.ram}Mo`)
    }

    message.channel.send(`\`\`\`${array.join(' \n')}\`\`\``)
  }
}

module.exports = Shards
