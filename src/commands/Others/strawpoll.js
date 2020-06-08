'use strict'

const Command = require('../../../core/Command.js')
const fetch = require('node-fetch')
const { MessageEmbed } = require('discord.js')

module.exports = class Strawpoll extends Command {
  constructor (client) {
    super(client, {
      name: 'strawpoll',
      botpermissions: ['EMBED_LINKS'],
      usage: (language, prefix) => language.get('SHORTURL_USAGE', prefix),
      category: (language) => language.get('UTILS').OTHERS_CATEGORY,
      examples: (language, prefix) => language.get('SHORTURL_EXAMPLE', prefix)
    })
  }

  async run (message, args) {
    if (!args[0]) {
      message.channel.send(message.language.get('STRAWPOLL')[0])
      return
    }

    const arrayPoll = args.join(' ').split(';')
    const question = arrayPoll[0]

    if (question.length > 400) {
      message.channel.send(message.language.get('STRAWPOLL')[1])
      return
    }

    arrayPoll.shift()

    if (arrayPoll.length < 2) {
      message.channel.send(message.language.get('STRAWPOLL')[2])
      return
    }

    if (arrayPoll.length > 30) {
      message.channel.send(message.language.get('STRAWPOLL')[3])
      return
    }

    for (const element of arrayPoll) {
      if (element.length > 400) {
        message.channel.send(message.language.get('STRAWPOLL')[4])
        return
      }
      if (element.trim().length <= 0) {
        arrayPoll.splice(arrayPoll.indexOf(element), 1)
      }
    }

    try {
      const res = await fetch('https://www.strawpoll.me/api/v2/polls', {
        method: 'POST',
        body: JSON.stringify({
          title: question,
          options: arrayPoll,
          multi: true,
          dupcheck: 'normal',
          captcha: true
        }),
        headers: { 'Content-Type': 'application/json' }
      })
      const body = await res.json()

      if (!body.id) {
        message.channel.send(message.language.get('STRAWPOLL')[5])
        return
      }

      message.channel.send(new MessageEmbed()
        .setColor(this.client.config.embed.color)
        .setAuthor('Strawpoll', 'https://d2.alternativeto.net/dist/icons/strawpoll_153439.png?width=200&height=200&mode=crop&upscale=false', 'https://www.strawpoll.me/')
        .setTitle(message.language.get('STRAWPOLL')[6])
        .addField(message.language.get('STRAWPOLL')[7], `[[${message.language.get('STRAWPOLL')[8]}]](https://www.strawpoll.me/${body.id})`)
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.avatarURL())
      )
    } catch {
      message.channel.send(message.language.get('STRAWPOLL')[5])
    }
  }
}
