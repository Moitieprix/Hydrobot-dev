const Command = require('../../../core/Command.js')

class Blacklist extends Command {
  constructor (client) {
    super(client, {
      name: 'blacklist',
      usage: language => language.get('BLACKLIST_USAGE'),
      enabled: true,
      category: (language) => language.get('UTILS').BOTSTAFF_CATEGORIE,
      aliases: [],
      permission: [],
      botpermissions: ['EMBED_LINKS'],
      examples: language => language.get('BLACKLIST_EXEMPLE'),
      owner: true,
      nsfw: false,
      cooldown: 3,
      plugin: false,
    })
  }

  async run (message, args) {
      if (args[0] === 'add') {

      } else if (args[0] === 'remove') {

      } else {

      }
  }
}

module.exports = Blacklist
