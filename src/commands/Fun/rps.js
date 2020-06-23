'use strict'

const Command = require('../../classes/Command')
const { MessageEmbed } = require('discord.js')

module.exports = class Rps extends Command {
  constructor (client) {
    super(client, {
      name: 'rps',
      botpermissions: ['EMBED_LINKS'],
      usage: (language, prefix) => language.get('RPS_USAGE', prefix),
      category: (language) => language.get('UTILS').FUN_CATEGORY,
      examples: (language, prefix) => language.get('RPS_EXAMPLE', prefix)
    })
  }

  async run (message, args) {
    if (!args[0] || (args[0] !== 'rock' && args[0] !== 'paper' && args[0] === 'scissors')) {
      message.channel.send(message.language.get('RPS')[0])
      return
    }

    const embed = new MessageEmbed()
      .setColor(this.client.config.embed.color)
      .setTitle(message.language.get('RPS')[1])
      .setTimestamp()
      .setFooter(this.client.user.username, this.client.user.avatarURL())

    const reponse = this.client.functions.getRandomInt(1, 3)

    if (args[0] === 'rock') {
      switch (reponse) {
        case 1:
          embed.setDescription(message.language.get('RPS')[2])
          break
        case 2:
          embed.setDescription(message.language.get('RPS')[3])
          break
        case 3:
          embed.setDescription(message.language.get('RPS')[4])
          break
      }
    } else if (args[0] === 'paper') {
      switch (reponse) {
        case 1:
          embed.setDescription(message.language.get('RPS')[5])
          break
        case 2:
          embed.setDescription(message.language.get('RPS')[6])
          break
        case 3:
          embed.setDescription(message.language.get('RPS')[7])
          break
      }
    } else if (args[0] === 'scissors') {
      switch (reponse) {
        case 1:
          embed.setDescription(message.language.get('RPS')[8])
          break
        case 2:
          embed.setDescription(message.language.get('RPS')[9])
          break
        case 3:
          embed.setDescription(message.language.get('RPS')[10])
          break
      }

      message.channel.send(embed)
    }
  }
}
