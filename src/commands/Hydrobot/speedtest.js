'use strict'

const Command = require('../../../core/Command.js')
const { MessageEmbed } = require('discord.js')
const SpeedTest = require('speedtest-net')

module.exports = class Speedtest extends Command {
  constructor (client) {
    super(client, {
      name: 'speedtest',
      cooldown: 5,
      botpermissions: ['EMBED_LINKS'],
      usage: (language, prefix) => language.get('SPEEDTEST_USAGE', prefix),
      category: (language) => language.get('UTILS').HYDROBOT_CATEGORY,
      examples: (language, prefix) => language.get('SPEEDTEST_EXAMPLE', prefix)
    })
  }

  async run (message) {
    const msg = await message.channel.send(new MessageEmbed()
      .setColor(this.client.config.embed.color)
      .setDescription(message.language.get('SPEEDTEST')[0])
      .setTimestamp()
      .setFooter(this.client.user.username, this.client.user.avatarURL())
    )

    SpeedTest({ maxTime: 5000 }).on('data', async data => {
      msg.edit(new MessageEmbed()
        .setColor(this.client.config.embed.color)
        .setTitle(':ping_pong: • Pong !')
        .addField(message.language.get('SPEEDTEST')[1], '`' + data.server.ping + 'ms`', true)
        .addField(message.language.get('SPEEDTEST')[2], `\`${msg.createdTimestamp - message.createdTimestamp}ms\``, true)
        .addField(message.language.get('SPEEDTEST')[3], '`' + Math.round(this.client.ws.ping) + 'ms`', true)
        .addField(message.language.get('SPEEDTEST')[4], `${message.language.get('SPEEDTEST')[6]} \`${data.speeds.download}Mbps\` \n${message.language.get('SPEEDTEST')[7]} \`${Math.round(data.speeds.originalDownload / 1000)}Ko/s\``, true)
        .addField(message.language.get('SPEEDTEST')[5], `${message.language.get('SPEEDTEST')[6]} \`${data.speeds.upload}Mbps\` \n${message.language.get('SPEEDTEST')[7]} \`${Math.round(data.speeds.originalUpload / 1000)}Ko/s\``, true)
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.avatarURL())
      )
    })
  }
}
