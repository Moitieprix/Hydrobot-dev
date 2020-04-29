'use strict'

const Command = require('../../../core/Command.js')
const superagent = require('superagent')
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
    superagent.get('https://nekobot.xyz/api/image')
      .query({ type: 'anal'})
      .end((err, response) => {
        const embed = new MessageEmbed()
          .setColor(this.client.config.embed.color)
          .setImage(response.body.message)
          .setTimestamp()
          .setFooter(this.client.user.username, this.client.user.avatarURL())
        message.channel.send(embed)
      });
  }
}