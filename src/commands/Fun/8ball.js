'use strict'

const Command = require('../../classes/Command')
const { MessageEmbed } = require('discord.js')

module.exports = class EightBall extends Command {
  constructor (client) {
    super(client, {
      name: '8ball',
      botpermissions: ['EMBED_LINKS'],
      usage: (language, prefix) => language.get('BALL_USAGE', prefix),
      category: (language) => language.get('UTILS').FUN_CATEGORY,
      examples: (language, prefix) => language.get('BALL_EXAMPLE', prefix)
    })
  }

  async run (message, args) {
    if (!args[0]) {
      message.channel.send(message.language.get('BALL')[0])
      return
    }

    const question = args.join(' ')

    if (question.length > 255) {
      message.channel.send(message.language.get('BALL')[1])
      return
    }

    message.channel.send(new MessageEmbed()
      .setColor(this.client.config.embed.color)
      .setTitle(':8ball: • 8ball')
      .addField(question, message.language.get('BALL_ANSWERS')[this.client.functions.getRandomInt(0, message.language.get('BALL_ANSWERS').length - 1)])
      .setTimestamp()
      .setFooter(this.client.user.username, this.client.user.avatarURL())
    )
  }
}
