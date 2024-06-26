'use strict'

const Command = require('../../classes/Command')
const fetch = require('node-fetch')
const { MessageEmbed } = require('discord.js')

module.exports = class Strawpoll extends Command {
  constructor (client) {
    super(client, {
      name: 'strawpoll',
      cooldown: 10,
      botpermissions: ['EMBED_LINKS'],
      usage: (language, prefix) => language.get('STRAWPOLL_USAGE', prefix),
      category: (language) => language.get('UTILS').OTHERS_CATEGORY,
      examples: (language, prefix) => language.get('STRAWPOLL_EXAMPLE', prefix)
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
        message.channel.send(message.language.get('ERRORS').ERROR_WITHOUT_REASON)
        return
      }

      message.channel.send(new MessageEmbed()
        .setColor(this.client.config.embed.color)
        .attachFiles(['images/icons/strawpoll.png'])
        .setAuthor('Strawpoll', 'attachment://strawpoll.png', 'https://www.strawpoll.me/')
        .setTitle(message.language.get('STRAWPOLL')[5])
        .addField(message.language.get('STRAWPOLL')[6], `[[${message.language.get('STRAWPOLL')[7]}]](https://www.strawpoll.me/${body.id})`)
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.avatarURL())
      )
    } catch {
      message.channel.send(message.language.get('ERRORS').ERROR_WITHOUT_REASON)
    }
  }
}
