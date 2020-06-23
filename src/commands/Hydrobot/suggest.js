'use strict'

const Command = require('../../classes/Command')

module.exports = class Suggest extends Command {
  constructor (client) {
    super(client, {
      name: 'suggest',
      botpermissions: ['EMBED_LINKS'],
      usage: (language, prefix) => language.get('SUGGEST_USAGE', prefix),
      category: (language) => language.get('UTILS').HYDROBOT_CATEGORY,
      examples: (language, prefix) => language.get('SUGGEST_EXAMPLE', prefix)
    })
  }

  async run (message, args) {
    if (!args[0]) {
      message.channel.send(message.language.get('SUGGEST')[0])
      return
    }

    this.client.shard.broadcastEval(`
      const channel = this.channels.cache.get('669983836389507122')
      if (channel) {
        const { MessageEmbed } = require('discord.js')

        channel.send(new MessageEmbed()
        .setColor('${this.client.config.embed.color}')
        .setTitle(\`${message.author.tag}'s suggestion, sent from ${message.guild.name} guild !\`)
        .setDescription('${args.join(' ')}')
        .setTimestamp()
        .setFooter('${this.client.user.username}', '${this.client.user.avatarURL()}')
      ).then(async msg => {
        await msg.react('704689894571900988')
        await msg.react('➖')
        await msg.react('704689891250012201')
      })
      }
    `).then(message.channel.send(message.language.get('SUGGEST')[1]))
  }
}
