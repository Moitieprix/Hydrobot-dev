'use strict'

const Command = require('../../classes/Command')
const { version, MessageEmbed } = require('discord.js')

module.exports = class About extends Command {
  constructor (client) {
    super(client, {
      name: 'about',
      aliases: ['botinformation', 'stats', 'debug', 'botinfo'],
      botpermissions: ['EMBED_LINKS'],
      usage: (language, prefix) => language.get('ABOUT_USAGE', prefix),
      category: (language) => language.get('UTILS').HYDROBOT_CATEGORY,
      examples: (language, prefix) => language.get('ABOUT_EXAMPLE', prefix)
    })
  }

  async run (message) {
    const users = await this.client.shard.broadcastEval('this.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0)')
    const guilds = await this.client.shard.fetchClientValues('guilds.cache.size')

    const usersSize = users.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    const guildsSize = guilds.reduce((accumulator, currentValue) => accumulator + currentValue)

    message.channel.send(new MessageEmbed()
      .setColor(this.client.config.embed.color)
      .setTimestamp()
      .setAuthor(this.client.user.username, this.client.user.avatarURL(), `https://discordapp.com/oauth2/authorize?client_id=${this.client.user.id}&scope=bot&permissions=2146958847`)
      .addField(message.language.get('ABOUT')[0], '`Moitié prix`', true)
      .addField(message.language.get('ABOUT')[1], '`Matthieu` \n`Kylian`', true)
      .addField(message.language.get('ABOUT')[2], '`Kylian` \n`Matthieu` \n`Maxime LUCE`', true)
      .addField('\u200b', '\u200b')
      .addField(message.language.get('ABOUT')[3], `\`\`\`${usersSize} ${message.language.get('ABOUT')[5]} \n${guildsSize} ${message.language.get('ABOUT')[6]} \nUptime : ${this.client.functions.getDuration(Math.floor(process.uptime() * 1000))}\`\`\``, true)
      .addField(message.language.get('ABOUT')[4] + ` (#${message.guild.shard.id})`, `\`\`\`${this.client.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0)} ${message.language.get('ABOUT')[5]} \n${this.client.guilds.cache.size} ${message.language.get('ABOUT')[6]} \nUptime : ${this.client.functions.getDuration(Math.floor(this.client.uptime))}\`\`\``, true)
      .addField('\u200b', '\u200b')
      .addField(message.language.get('ABOUT')[7], `\`${this.client.config.version}\``, true)
      .addField(`${this.client.emote.others.nodejs} • Node.js :`, `\`${process.version}\``, true)
      .addField(`${this.client.emote.others.discordjs} • Discord.js :`, `\`v${version}\``, true)
      .setFooter(this.client.user.username, this.client.user.avatarURL())
    )
  }
}
