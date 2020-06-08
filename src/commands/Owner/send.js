const Command = require('../../../core/Command.js')

module.exports = class Send extends Command {
  constructor (client) {
    super(client, {
      name: 'send',
      usage: language => language.get('BLACKLIST_USAGE'),
      enabled: true,
      category: (language) => language.get('UTILS').BOTSTAFF_CATEGORY,
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

    if (!args[0]) return message.channel.send('Tu dois m\'indiquer un salon !')


    if (isNaN(args[0]) || args[0].length !== 18) return message.channel.send("Tu dois m'indiquer un salon valide")


    if (!args[1]) return message.channel.send("Tu dois m'indiquer un texte à envoyer !")


    const salon = args[0]

    args.shift()

    if(args.join(' ').includes('`')) return message.channel.send('Je ne peux pas envoyer des messages avec " ` "')

    this.client.shard.broadcastEval(`
        const channel = this.channels.cache.get('${salon}')
        if (channel) {
        channel.send(\`[Admin - ${message.author.username}] > ${args.join(' ')}\`)
        } else {
        false
        }
        `).then(s => {
        for (let i = 0; s.length > i; i++) {
          if (s[i]) return message.channel.send(`Message correctement envoyé au salon ${salon}`)
        }
        message.channel.send(`Le salon ${salon} n'est présent sur aucune shard :/`)
      })
  }
}
