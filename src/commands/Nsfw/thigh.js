'use strict'

const Command = require('../../../core/Command.js')
const fetch = require('node-fetch')
const { MessageEmbed } = require('discord.js')

module.exports = class Thigh extends Command {
  constructor (client) {
    super(client, {
      name: 'thigh',
      cooldown: 10,
      plugin: 'nsfw',
      botpermissions: ['ATTACH_FILES'],
      usage: (language, prefix) => language.get('NSFW_USAGE', prefix, 'thigh'),
      category: (language) => language.get('UTILS').NSFW_CATEGORY,
      examples: (language, prefix) => language.get('NSFW_EXEMPLE', prefix, 'thigh')
    })
  }

  async run (message) {
    const res = await fetch('https://nekobot.xyz/api/image?type=thigh')
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
