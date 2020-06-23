'use strict'

const Command = require('../../classes/Command')
const { MessageEmbed } = require('discord.js')

module.exports = class FetchUser extends Command {
  constructor (client) {
    super(client, {
      name: 'fetch-user',
      botpermissions: ['EMBED_LINKS'],
      usage: (language, prefix) => language.get('FETCHUSER_USAGE', prefix),
      category: (language) => language.get('UTILS').INFORMATION_CATEGORY,
      examples: (language, prefix) => language.get('FETCHUSER_EXAMPLE', prefix)
    })
  }

  async run (message, args) {
    if (!args[0] || isNaN(args[0]) || args[0].length !== 18) {
      message.channel.send(message.language.get('FETCHUSER')[8])
      return
    }

    try {
      const user = await this.client.users.fetch(args[0])

      const flags = await user.fetchFlags()
      const array = Object.entries(flags.serialize())
      const flagsArray = []
      for (const flag of array) {
        if (flag[1]) {
          flagsArray.push(`\`${flag[0]}\``)
        }
      }

      message.channel.send(new MessageEmbed()
        .setColor(this.client.config.embed.color)
        .setAuthor(user.username, user.displayAvatarURL({ dynamic: true }))
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .setDescription(message.language.get('FETCHUSER')[0])
        .addField(message.language.get('FETCHUSER')[1], `${message.language.get('FETCHUSER')[2]} **${user.tag}** \n${message.language.get('FETCHUSER')[3]} **${user.id}** \n${message.language.get('FETCHUSER')[4]} **${this.client.functions.timestampToDate(user.createdTimestamp, message)}** \n${message.language.get('FETCHUSER')[5]} **${message.language.get('UTILS').STATUS[user.presence.status]}**`)
        .addField(message.language.get('FETCHUSER')[6], flagsArray.length ? flagsArray.join(', ') : message.language.get('FETCHUSER')[7])
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.avatarURL())
      )
    } catch {
      message.channel.send(message.language.get('FETCHUSER')[9])
    }
  }
}
