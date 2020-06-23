const Command = require('../../classes/Command')

class Shutdown extends Command {
  constructor (client) {
    super(client, {
      name: 'shutdown',
      usage: 'shutdown',
      enabled: true,
      category: (language) => language.get('UTILS').BOTSTAFF_CATEGORY,
      aliases: [],
      permission: [],
      botpermissions: ['EMBED_LINKS'],
      examples: 'h!shutdown',
      owner: true,
      nsfw: false,
      cooldown: 3,
      plugin: false,
    })
  }

  async run (message) {
    try {
      await message.channel.send(':key: | Arrêt en cours...')
      this.client.commands.forEach(async cmd => {
        await this.client.unloadCommand(cmd.conf.location, cmd.conf.name)
      })
      process.exit(1)
      this.client.destroy()
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = Shutdown
