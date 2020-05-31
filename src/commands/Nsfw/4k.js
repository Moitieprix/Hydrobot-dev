'use strict'

const Command = require('../../../core/Command.js')
const fetch = require('node-fetch')
const { MessageEmbed } = require('discord.js')

module.exports = class Fourk extends Command {
  constructor (client) {
    super(client, {
      name: '4k',
      cooldown: 10,
      plugin: 'nsfw',
      botpermissions: ['ATTACH_FILES'],
      usage: (language, prefix) => language.get('NSFW_USAGE', prefix, '4k'),
      category: (language) => language.get('UTILS').NSFW_CATEGORY,
      examples: (language, prefix) => language.get('NSFW_EXEMPLE', prefix, '4k')
    })
  }

  async run (message) {
    const res = await fetch('https://nekobot.xyz/api/image?type=4k')
    const body = await res.json()

    message.channel.send(new MessageEmbed()
      .setColor(this.client.config.embed.color)
      .setDescription(message.language.get('IMAGE_NOT_DISPLAYED', body.message))
      .setImage(body.message)
      .setTimestamp()
      .setFooter(this.client.user.username, this.client.user.avatarURL())
    )
  }
}
