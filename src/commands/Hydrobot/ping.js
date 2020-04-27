'use strict'

const Command = require('../../../core/Command.js')
const {MessageEmbed} = require('discord.js')

module.exports = class Ping extends Command {
  constructor (client) {
    super(client, {
      name: 'ping',
      cooldown: 3,
      enabled: true,
      owner: false,
      nsfw: false,
      plugin: false,
      aliases: [],
      permission: [],
      botpermissions: ['EMBED_LINKS'],
      description: (language) => language.get('PING_DESCRIPTION'),
      usage: (language, prefix) => language.get('PING_USAGE', prefix),
      category: (language) => language.get('UTILS').BOT_CATEGORIE,
      examples: (language, prefix) => language.get('PING_USAGE', prefix)
    })
  }

  async run (message) {

    const loading = new MessageEmbed()
      .setColor(this.client.config.embed.color)
      .setTitle(':ping_pong: • Ping !')
      .setTimestamp()
      .setFooter(this.client.user.username, this.client.user.avatarURL())

      const msg = await message.channel.send(loading)

    const embed = new MessageEmbed()
      .setColor(this.client.config.embed.color)
      .setTitle(':ping_pong: • Pong !')
      .addField(message.language.get('LATENCE_BOT'), `\`${msg.createdTimestamp - message.createdTimestamp}ms\``, true)
      .addField(message.language.get('LATENCE_API'), '`' + Math.round(this.client.ws.ping) + 'ms`', true)
      .setTimestamp()
      .setFooter(this.client.user.username, this.client.user.avatarURL())

      return msg.edit(embed)
  }
}
