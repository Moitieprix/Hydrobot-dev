'use strict'

const Command = require('../../../core/Command.js')
const {MessageEmbed} = require('discord.js')
const SpeedTest = require('speedtest-net')

module.exports = class Speedtest extends Command {
  constructor (client) {
    super(client, {
      name: 'speedtest',
      cooldown: 5,
      enabled: true,
      owner: false,
      nsfw: false,
      plugin: false,
      aliases: [],
      permission: [],
      botpermissions: ['EMBED_LINKS'],
      usage: (language, prefix) => language.get('SPEEDTEST_USAGE', prefix),
      category: (language) => language.get('UTILS').BOT_CATEGORIE,
      examples: (language, prefix) => language.get('SPEEDTEST_USAGE', prefix),
    })
  }

  async run (message) {

    const loading = new MessageEmbed()
      .setColor(this.client.config.embed.color)
      .setDescription(message.language.get('CHARGEMENT'))
      .setTimestamp()
      .setFooter(this.client.user.username, this.client.user.avatarURL())

    const msg = await message.channel.send(loading)


    SpeedTest({ maxTime: 5000 }).on('data', async data => {
      const embed = new MessageEmbed()
        .setColor(this.client.config.embed.color)
        .setTitle(':ping_pong: • Pong !')
        .addField(message.language.get('LATENCE_SERVEUR'), '`' + data.server.ping + 'ms`', true)
        .addField(message.language.get('LATENCE_BOT'), `\`${msg.createdTimestamp - message.createdTimestamp}ms\``, true)
        .addField(message.language.get('LATENCE_API'), '`' + Math.round(this.client.ws.ping) + 'ms`', true)
        .addField(message.language.get('DOWNLOAD'), `${message.language.get('BANDE')} \`${data.speeds.download}Mbps\` \n${message.language.get('BANDE_NON_AJUSTE')} \`${Math.round(data.speeds.originalDownload / 1000)}Ko/s\``, true)
        .addField(message.language.get('UPLOAD'), `${message.language.get('BANDE')} \`${data.speeds.upload}Mbps\` \n${message.language.get('BANDE_NON_AJUSTE')} \`${Math.round(data.speeds.originalUpload / 1000)}Ko/s\``, true)
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.avatarURL())

        return msg.edit(embed)
      })
  }
}
