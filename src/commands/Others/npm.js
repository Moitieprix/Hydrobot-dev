'use strict'

const Command = require('../../../core/Command.js')
const fetch = require('node-fetch')
const { MessageEmbed } = require('discord.js')

module.exports = class Npm extends Command {
  constructor (client) {
    super(client, {
      name: 'npm',
      cooldown: 10,
      botpermissions: ['EMBED_LINKS'],
      usage: (language, prefix) => language.get('NPM_USAGE', prefix),
      category: (language) => language.get('UTILS').OTHERS_CATEGORY,
      examples: (language, prefix) => language.get('NPM_EXAMPLE', prefix)
    })
  }

  async run (message, args) {
    if (!args[0]) {
      message.channel.send(message.language.get('NPM')[0])
      return
    }

    try {
      const res = await fetch(`http://registry.npmjs.com/-/v1/search?text=${encodeURIComponent(args.join(' '))}&size=1`)
      const body = await res.json()

      if (!body.objects.length) {
        message.channel.send(message.language.get('NPM')[1])
        return
      }

      const resDownload = await fetch(`https://api.npmjs.org/downloads/point/last-week/${body.objects[0].package.name}`)
      const bodyDownload = await resDownload.json()

      message.channel.send(new MessageEmbed()
        .setColor(this.client.config.embed.color)
        .setAuthor('NPM', 'https://i.imgur.com/ErKf5Y0.png', 'https://www.npmjs.com/')
        .setTitle(`:label: • ${body.objects[0].package.name}`)
        .setDescription(body.objects[0].package.description ? body.objects[0].package.description : message.language.get('NPM')[2])
        .addField(message.language.get('NPM')[3], body.objects[0].package.version)
        .addField(message.language.get('NPM')[4], this.client.functions.getDate(new Date(body.objects[0].package.date).toString().split(' '), message))
        .addField(message.language.get('NPM')[5], body.objects[0].package.author ? body.objects[0].package.author.name : message.language.get('NPM')[6])
        .addField(message.language.get('NPM')[7], body.objects[0].package.maintainers ? body.objects[0].package.maintainers.map(element => element.username).join(', ') : message.language.get('NPM')[6])
        .addField(message.language.get('NPM')[8], bodyDownload.downloads)
        .addField(message.language.get('NPM')[9], body.objects[0].package.keywords ? body.objects[0].package.keywords.join(', ') : message.language.get('NPM')[10])
        .addField(message.language.get('NPM')[11], `${body.objects[0].package.links.npm ? `[[${message.language.get('NPM')[12]}]](${body.objects[0].package.links.npm})` : ''} ${body.objects[0].package.links.homepage ? ` • [[${message.language.get('NPM')[13]}]](${body.objects[0].package.links.homepage})` : ''} ${body.objects[0].package.links.repository ? ` • [[${message.language.get('NPM')[14]}]](${body.objects[0].package.links.repository})` : ''}`)
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.avatarURL())
      )
    } catch {
      message.channel.send(message.language.get('ERRORS').ERROR_WITHOUT_REASON)
    }
  }
}
