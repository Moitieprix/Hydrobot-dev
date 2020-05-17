'use strict'

const Command = require('../../../core/Command.js')
const { MessageEmbed } = require('discord.js')

module.exports = class EightBall extends Command {
  constructor (client) {
    super(client, {
      name: '8ball',
      cooldown: 3,
      enabled: true,
      owner: false,
      nsfw: false,
      plugin: false,
      aliases: [],
      permission: [],
      botpermissions: ['EMBED_LINKS'],
      usage: (language, prefix) => language.get('BALL_USAGE', prefix),
      category: (language) => language.get('UTILS').FUN_CATEGORY,
      examples: (language, prefix) => language.get('BALL_EXAMPLE', prefix)
    })
  }

  run (message, args) {
    if (!args[0]) return message.channel.send(message.language.get('BALL')[0])

    if (args.join(' ').length > 255) return message.channel.send(message.language.get('BALL')[1])

    const embed = new MessageEmbed()
      .setColor(this.client.config.embed.color)
      .setTitle(':8ball: • 8ball')
      .addField(args.join(' '), message.language.get('BALL_ANSWERS')[this.client.functions.getRandomInt(0, message.language.get('BALL_REPLYS').length - 1)])
      .setTimestamp()
      .setFooter(this.client.user.username, this.client.user.avatarURL())
    return message.channel.send(embed)
  }
}
