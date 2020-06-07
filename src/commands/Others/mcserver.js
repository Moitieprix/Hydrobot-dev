'use strict'

const Command = require('../../../core/Command.js')
const fetch = require('node-fetch')
const { MessageEmbed } = require('discord.js')

module.exports = class Mcserver extends Command {
  constructor (client) {
    super(client, {
      name: 'mcserver',
      aliases: ['minecraftserver', 'minecraft-server', 'mc-server'],
      botpermissions: ['EMBED_LINKS'],
      usage: (language, prefix) => language.get('MCSERVER_USAGE', prefix),
      category: (language) => language.get('UTILS').OTHERS_CATEGORY,
      examples: (language, prefix) => language.get('MCSERVER_EXAMPLE', prefix)
    })
  }

  async run (message, args) {
    if (!args[0]) {
      message.channel.send(message.language.get('MCSERVER')[0])
      return
    }

    try {
      const res = await fetch(`https://eu.mc-api.net/v3/server/info/${args[0]}/json`)
      const body = await res.json()

      if (body.online) {
        message.channel.send(new MessageEmbed()
          .setAuthor('Minecraft', 'https://www.minecraft.net/etc.clientlibs/minecraft/clientlibs/main/resources/img/iso-grassblock.png', 'https://www.minecraft.net')
          .setTitle(`:desktop: • ${message.language.get('MCSERVER')[1]}`)
          .setColor(this.client.config.embed.color)
          .setThumbnail(body.favicon)
          .setTimestamp()
          .setFooter(this.client.user.username, this.client.user.avatarURL())
          .addField(`:label: • ${message.language.get('MCSERVER')[2]}`, args[0])
          .addField(`:bust_in_silhouette: • ${message.language.get('MCSERVER')[3]}`, body.players.online)
          .addField(`:busts_in_silhouette: • ${message.language.get('MCSERVER')[4]}`, body.players.max)
          .addField(`:level_slider: • ${message.language.get('MCSERVER')[5]}`, body.version.name)
          .addField(`:control_knobs: • ${message.language.get('MCSERVER')[6]}`, body.version.protocol)
        )
      } else {
        message.channel.send(new MessageEmbed()
          .setColor(this.client.config.embed.color)
          .setDescription(message.language.get('MCSERVER')[7])
          .setTimestamp()
          .setFooter(this.client.user.username, this.client.user.avatarURL())
        )
      }
    } catch (e) {
      message.channel.send(message.language.get('MCSERVER_ERROR', e))
    }
  }
}
