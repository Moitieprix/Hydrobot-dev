'use strict'

const Command = require('../../classes/Command')
const {inspect} = require('util')
const {MessageEmbed} = require('discord.js')

module.exports = class Eval extends Command {
  constructor (client) {
    super(client, {
      name: 'eval',
      cooldown: 3,
      enabled: true,
      owner: true,
      plugin: false,
      aliases: [],
      permission: [],
      botpermissions: ['EMBED_LINKS'],
      usage: (language, prefix) => language.get('EVAL_USAGE', prefix),
      category: (language) => language.get('UTILS').BOTSTAFF_CATEGORY,
      examples: (language, prefix) => language.get('EVAL_EXEMPLE', prefix)
    })
  }

  async run (message, args) {
    if (!args.join(' ')) return message.channel.send('Tu dois me donner un code à évaluer')

    const start = process.hrtime()

    Promise.resolve(eval(args.join(' ')))
      .then(async code => {
        const diff = process.hrtime(start)
        const type = `${(typeof code).charAt(0).toUpperCase()}${(typeof code).substring(1)}`

        if (typeof code !== 'string') {
          code = inspect(code, {
            depth: 0
          })
        }

        if (code.length > 1000) {
          code = `${code.substring(0, 1000)}\n\n...`
        }

        const evalTime = diff[1] < 100000 ? (diff[1] / 1000).toPrecision(3) + 'μs' : (diff[1] / 1000000).toPrecision(3) + 'ms'

        if (message.channel.permissionsFor(this.client.user).has('ADD_REACTIONS')) message.react('601815694467792935')

        const embed = new MessageEmbed()
          .setColor(this.client.config.embed.color)
          .setTitle(`${this.client.emote.others.yes} • \`SUCCESS (${evalTime})\``)
          .addField('Returned code', `\`\`\`js\n${clean(code, this.client)}\`\`\``)
          .addField('Returned code type', `\`\`\`js\n${type}\`\`\``)
          .setTimestamp()
          .setFooter(this.client.user.username, this.client.user.avatarURL())
        return message.channel.send(embed)
      }).catch(err => {
      if (message.channel.permissionsFor(this.client.user).has('ADD_REACTIONS')) message.react('601815693935247390')

      const embed = new MessageEmbed()
        .setColor(this.client.config.embed.color)
        .setTitle(`${this.client.emote.others.no} • \`ERROR\``)
        .addField('Returned code', `\`\`\`js\n${err}\`\`\``)
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.avatarURL())
      return message.channel.send(embed)
    })
  }
}

function clean (text, client) {
  if (typeof(text) === 'string')
    return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203)).replace(client.token, 'Client token')
  else
    return text
}


