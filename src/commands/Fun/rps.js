'use strict'

const Command = require('../../../core/Command.js')
const {MessageEmbed} = require('discord.js')

module.exports = class Rps extends Command {
  constructor (client) {
    super(client, {
      name: 'rps',
      cooldown: 3,
      enabled: true,
      owner: false,
      nsfw: false,
      plugin: false,
      aliases: [],
      permission: [],
      botpermissions: ['EMBED_LINKS'],
      description: (language) => language.get('RPS_DESC'),
      usage: (language, prefix) => language.get('RPS_USAGE', prefix),
      category: (language) => language.get('UTILS').FUN_CATEGORIE,
      examples: (language, prefix) => language.get('RPS_EXEMPLE', prefix)
    })
  }

  async run (message, args) {

    const embed = new MessageEmbed()
      .setColor(this.client.config.embed.color)
      .setTitle(message.language.get('RPS_TITLE'))
      .setTimestamp()
      .setFooter(this.client.user.username, this.client.user.avatarURL())

    const reponse = this.client.functions.getRandomInt(1, 3)

    if (args[0] === 'rock') {
      switch (reponse) {
        case 1:
          embed.setDescription(message.language.get('RPS_REPONSES')[0])
          break
        case 2:
          embed.setDescription(message.language.get('RPS_REPONSES')[1])
          break
        case 3:
          embed.setDescription(message.language.get('RPS_REPONSES')[2])
          break
      }
    } else if (args[0] === 'paper') {
      switch (reponse) {
        case 1:
          embed.setDescription(message.language.get('RPS_REPONSES')[3])
          break
        case 2:
          embed.setDescription(message.language.get('RPS_REPONSES')[4])
          break
        case 3:
          embed.setDescription(message.language.get('RPS_REPONSES')[5])
          break
      }
    } else if (args[0] === 'scissors') {
      switch (reponse) {
        case 1:
          embed.setDescription(message.language.get('RPS_REPONSES')[6])
          break
        case 2:
          embed.setDescription(message.language.get('RPS_REPONSES')[7])
          break
        case 3:
          embed.setDescription(message.language.get('RPS_REPONSES')[8])
          break
      }
    } else {
       return message.channel.send(message.language.get('RPS_ARGS'))
    }

    return message.channel.send(embed)

  }
}
