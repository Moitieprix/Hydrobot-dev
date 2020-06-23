const Command = require('../../classes/Command')

class Reload extends Command {
  constructor (client) {
    super(client, {
      name: 'reload',
      usage: 'reload [commande]',
      enabled: true,
      category: (language) => language.get('UTILS').BOTSTAFF_CATEGORY,
      aliases: [],
      permission: [],
      botpermissions: ['EMBED_LINKS'],
      examples: 'h!reload ping',
      owner: true,
      nsfw: false,
      cooldown: 5,
      plugin: false,
    })
  }

  async run (message, args) {
    if (!args) return message.channel.send("Tu dois m'indiquer une commande à reload")

    const cmd = this.client.commands[args[0]] || this.client.commands[this.client.aliases.get[args[0]]]

    const cmddefaut = {
      color: this.client.config.embed.color,
      title: `${this.client.emote.others.no} • **Erreur !**`,
      description: '`' + args[0] + '` introuvable !',
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

    if (!cmd) return message.channel.send({ embed: cmddefaut })

    let response = await this.client.unloadCommand(cmd.conf.location, cmd.help.name)
    if (response) return message.channel.send(`Erreur de déchargement: ${response}`)

    response = this.client.loadCommand(cmd.conf.location, cmd.help.name)
    if (response) return message.channel.send(`Erreur de chargement: ${response}`)

    return message.channel.send(`La commande \`${cmd.help.name}\` a bien été reload`)
  }
}

module.exports = Reload
