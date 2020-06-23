'use strict'

const { MessageEmbed } = require('discord.js')
const Command = require('../../classes/Command')

module.exports = class Poll extends Command {
  constructor (client) {
    super(client, {
      name: 'poll',
      cooldown: 5,
      aliases: ['survey'],
      permission: ['MANAGE_MESSAGES'],
      botpermissions: ['EMBED_LINKS', 'ADD_REACTIONS'],
      usage: (language, prefix) => language.get('POLL_USAGE', prefix),
      category: (language) => language.get('UTILS').MODERATION_CATEGORY,
      examples: (language, prefix) => language.get('POLL_EXAMPLE', prefix)
    })
  }

  async run (message, args) {
    if (!args[0]) {
      message.channel.send(message.language.get('POLL')[0])
      return
    }

    const arrayPoll = args.join(' ').split(';')
    const question = arrayPoll[0]

    if (question.length > 200) {
      message.channel.send(message.language.get('POLL')[1])
      return
    }

    arrayPoll.shift()

    if (arrayPoll.length < 2) {
      message.channel.send(message.language.get('POLL')[2])
      return
    }

    if (arrayPoll.length > 10) {
      message.channel.send(message.language.get('POLL')[3])
      return
    }

    for (const element of arrayPoll) {
      if (element.length > 150) {
        message.channel.send(message.language.get('POLL')[4])
        return
      }
      if (element.trim().length <= 0) {
        arrayPoll.splice(arrayPoll.indexOf(element), 1)
      }
    }

    const answers = arrayPoll.map((answer, i) => `${i + 1} • ${answer}`)

    const msg = await message.channel.send(new MessageEmbed()
      .setColor(this.client.config.embed.color)
      .setTitle(question)
      .setDescription(answers.join(' \n'))
      .setTimestamp()
      .setFooter(this.client.user.username, this.client.user.avatarURL())
    )
    const reactions = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟']

    for (let i = 0; i < answers.length; i++) {
      await msg.react(reactions[i])
    }
  }
}
