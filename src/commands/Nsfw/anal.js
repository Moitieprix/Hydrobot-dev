'use strict'

const Command = require('../../../core/Command.js')
const fetch = require('node-fetch')
const {MessageEmbed} = require('discord.js')

module.exports = class Anal extends Command {
  constructor (client) {
    super(client, {
      name: 'anal',
      cooldown: 5,
      enabled: true,
      owner: false,
      nsfw: true,
      plugin: 'nsfw',
      aliases: [],
      permission: [],
      botpermissions: ['ATTACH_FILES'],
      usage: (language, prefix) => language.get('BALANCE_USAGE', prefix),
      category: (language) => language.get('UTILS').NSFW_CATEGORIE,
      examples: (language, prefix) => language.get('BALANCE_EXEMPLE', prefix)
    })
  }

  async run (message) {
    fetch('https://nekobot.xyz/api/image?type=anal')
      .then(res => res.json())
      .then(res => {
        const embed = new MessageEmbed()
          .setColor(this.client.config.embed.color)
          .setImage(res.message)
          .setTimestamp()
          .setFooter(this.client.user.username, this.client.user.avatarURL())
        message.channel.send(embed)
      })
      .catch(err => message.channel.send(message.language.get('UTILS').API_ERROR(err)))
  }
}