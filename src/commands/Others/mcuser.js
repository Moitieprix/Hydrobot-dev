'use strict'

const Command = require('../../../core/Command.js')
const fetch = require('node-fetch')
const { MessageEmbed } = require('discord.js')

module.exports = class Mcuser extends Command {
  constructor (client) {
    super(client, {
      name: 'mcuser',
      aliases: ['minecraftuser', 'minecraft-user', 'mc-user'],
      botpermissions: ['EMBED_LINKS'],
      usage: (language, prefix) => language.get('MCUSER_USAGE', prefix),
      category: (language) => language.get('UTILS').OTHERS_CATEGORY,
      examples: (language, prefix) => language.get('MCUSER_EXAMPLE', prefix)
    })
  }

  async run (message, args) {
    if (!args[0]) {
      message.channel.send(message.language.get('MCUSER')[0])
      return
    }

    try {
      const resUuid = await fetch(`https://api.mojang.com/users/profiles/minecraft/${args[0]}`)
      const bodyUuid = await resUuid.json()

      const resHistory = await fetch(`https://api.mojang.com/user/profiles/${bodyUuid.id}/names`)
      const bodyHistory = await resHistory.json()

      const UUID = bodyUuid.id.match(/(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})/)
      UUID.shift()

      const pseudoHistory = bodyHistory.map(element => {
        return element.changedToAt ? `${element.name} • ${this.client.functions.getDate(new Date(element.changedToAt).toString().split(' '), message)}` : element.name
      })

      pseudoHistory.reverse()

      message.channel.send(new MessageEmbed()
        .setColor(this.client.config.embed.color)
        .setAuthor('Minecraft', 'https://www.minecraft.net/etc.clientlibs/minecraft/clientlibs/main/resources/img/iso-grassblock.png', 'https://www.minecraft.net')
        .setTitle(message.language.get('MCUSER')[1])
        .addField(message.language.get('MCUSER')[2], args[0])
        .addField(message.language.get('MCUSER')[3], UUID.join('-'))
        .addField(message.language.get('MCUSER')[4], bodyUuid.id)
        .addField(message.language.get('MCUSER')[5], pseudoHistory.join(' \n'))
        .addField(message.language.get('MCUSER')[6], message.language.get('MCUSER_SKIN', `https://minotar.net/skin/${bodyUuid.id}`))
        .setThumbnail(`https://minotar.net/armor/body/${bodyUuid.id}/256.png`)
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.avatarURL())
      )
    } catch (e) {
      message.channel.send(message.language.get('MCUSER')[7])
    }
  }
}
