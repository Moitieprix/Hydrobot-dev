'use strict'

const Command = require('../../classes/Command')
const fetch = require('node-fetch')
const { MessageEmbed } = require('discord.js')

module.exports = class Hneko extends Command {
  constructor (client) {
    super(client, {
      name: 'hentai-neko',
      cooldown: 10,
      plugin: 'nsfw',
      botpermissions: ['ATTACH_FILES'],
      usage: (language, prefix) => language.get('NSFW_USAGE', prefix, 'hentai-neko'),
      category: (language) => language.get('UTILS').NSFW_CATEGORY,
      examples: (language, prefix) => language.get('NSFW_EXEMPLE', prefix, 'hentai-neko')
    })
  }

  async run (message) {
    try {
      const res = await fetch('https://nekobot.xyz/api/image?type=hneko')
      const body = await res.json()

      message.channel.send(new MessageEmbed()
        .setColor(this.client.config.embed.color)
        .setDescription(message.language.get('IMAGE_NOT_DISPLAYED', body.message))
        .setImage(body.message)
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.avatarURL())
      )
    } catch (e) {
      message.channel.send(message.language.get('ERRORS').NSFW_ERROR(e))
    }
  }
}
