const Command = require('../../../core/Command.js')

class Autorole extends Command {
  constructor (client) {
    super(client, {
      name: 'autorole',
      usage: (language, prefix) => language.get('AUTOROLE_USAGE', prefix),
      enabled: true,
      category: (language) => language.get('UTILS').GUILDADMIN_CATEGORIE,
      aliases: [],
      permission: ['ADMINISTRATOR'],
      botpermissions: ['EMBED_LINKS', 'MANAGE_MESSAGES'],
      examples: (language, prefix) => language.get('AUTOROLE_EXEMPLE', prefix),
      owner: false,
      cooldown: 5,
      nsfw: false,
      plugin: false
    })
  }

  run (message, args) {
      const embed = {
        color: this.client.config.embed.color,
        author: {
          name: message.author.tag,
          icon_url: message.author.avatarURL()
        },
        timestamp: new Date(),
        footer: {
          text: this.client.user.username,
          icon_url: this.client.user.avatarURL()
        }
      }

      if (args[0] === 'setrole') {
        if (!message.mentions.roles.first()) {
          embed.title = message.language.get('UTILS').EMBED_ERREUR
          embed.description = message.language.get('BADWORDS_EMBED')[7]
        } else {
          if (this.client.settings.getProp(message.guild.id, 'autoRole.role') !== undefined && this.client.settings.getProp(message.guild.id, 'autoRole.role').includes(message.mentions.roles.first().id)) {
            embed.title = message.language.get('UTILS').EMBED_ERREUR
            embed.description = message.language.get('BADWORDS_EMBED')[8]
          } else {
            embed.description = message.language.get('AUTOROLE_SETROLE', message.mentions.roles.first().id)
            this.client.settings.set(message.guild.id, message.mentions.roles.first().id, 'autoRole.role')
          }
        }
      } else {
        embed.title = message.language.get('AUTOROLE_EMBED2')[0]
        embed.description = message.language.get('AUTOROLE_EMBED2')[1]
      }

      return message.channel.send({ embed: embed })
  }
}

module.exports = Autorole
