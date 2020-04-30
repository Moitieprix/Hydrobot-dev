'use strict'

const Command = require('../../../core/Command.js')
const {version, MessageEmbed} = require('discord.js')

module.exports = class About extends Command {
  constructor (client) {
    super(client, {
      name: 'about',
      cooldown: 3,
      enabled: true,
      owner: false,
      plugin: false,
      aliases: ['botinformation', 'stats', 'debug', 'botinfo'],
      permission: [],
      botpermissions: ['EMBED_LINKS'],
      usage: (language, prefix) => language.get('ABOUT_USAGE', prefix),
      category: (language) => language.get('UTILS').HYDROBOT_CATEGORY,
      examples: (language, prefix) => language.get('ABOUT_EXAMPLE', prefix)
    })
  }

  async run (message) {
    const users = await this.client.shard.fetchClientValues('users.cache.size')
    const guilds = await this.client.shard.fetchClientValues('guilds.cache.size')

    let usersSize = 0
    let guildsSize = 0

    for (let i = 0; i < this.client.shard.count; i++) {
      usersSize = usersSize + users[i]
      guildsSize = guildsSize + guilds[i]
    }

    const embed = new MessageEmbed()
      .setColor(this.client.config.embed.color)
      .setTimestamp()
      .setAuthor(this.client.user.username, this.client.user.avatarURL(), `https://discordapp.com/oauth2/authorize?client_id=${this.client.user.id}&scope=bot&permissions=2146958847`)
      .addField(message.language.get('ABOUT')[0], '`Moitié prix`', true)
      .addField(message.language.get('ABOUT')[1], '`Matthieu` \n`Ernest`', true)
      .addField(message.language.get('ABOUT')[2], '`Ernest` \n`Matthieu` \n`Maxime LUCE`', true)
      .addField('\u200b', '\u200b', false)
      .addField(message.language.get('ABOUT')[3], `\`\`\`${usersSize} ${message.language.get('ABOUT')[5]} \n${guildsSize} ${message.language.get('ABOUT')[6]} \nUptime : ${this.client.functions.getDuration(Math.floor(process.uptime() * 1000))}\`\`\``, true)
      .addField(message.language.get('ABOUT')[4] + ` (#${message.guild.shard.id})`, `\`\`\`${this.client.users.cache.size} ${message.language.get('ABOUT')[5]} \n${this.client.guilds.cache.size} ${message.language.get('ABOUT')[6]} \nUptime : ${this.client.functions.getDuration(Math.floor(this.client.uptime))}\`\`\``, true)
      .addField('\u200b', '\u200b', false)
      .addField(message.language.get('ABOUT')[7], `\`${this.client.config.version}\``, true)
      .addField(`${this.client.emote.others.nodejs} • Node.js :`, `\`${process.version}\``, true)
      .addField(`${this.client.emote.others.discordjs} • Discord.js :`, `\`v${version}\``, true)
      .setFooter(this.client.user.username, this.client.user.avatarURL())

    return message.channel.send(embed)
  }
}