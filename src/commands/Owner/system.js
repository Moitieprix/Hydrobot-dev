const Command = require('../../classes/Command')

class System extends Command {
  constructor (client) {
    super(client, {
      name: 'system',
      usage: 'h!system',
      enabled: true,
      category: (language) => language.get('UTILS').BOTSTAFF_CATEGORY,
      aliases: [],
      permission: [],
      botpermissions: ['EMBED_LINKS'],
      examples: 'h!system',
      owner: true,
      nsfw: false,
      cooldown: 3,
      plugin: false,
    })
  }

  async run (message) {
    return message.channel.send(`\`\`\`CPU: ${this.client.functions.getCpuUsagePercent()}% \nRAM (heap): ${(process.memoryUsage().heapUsed / 1000 / 1000).toFixed(2)}Mo \nRSS: ${(process.memoryUsage().rss / 1000 / 1000).toFixed(2)}Mo \nExterne: ${(process.memoryUsage().external / 1000 / 1000).toFixed(2)}Mo \nRAM (total): ${(process.memoryUsage().heapTotal / 1000 / 1000).toFixed(2)}Mo\`\`\``)
  }
}

module.exports = System
