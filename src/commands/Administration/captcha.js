'use strict'

const { MessageEmbed } = require('discord.js')
const Command = require('../../classes/Command')

module.exports = class Captcha extends Command {
  constructor (client) {
    super(client, {
      name: 'captcha',
      cooldown: 5,
      permission: ['ADMINISTRATOR'],
      botpermissions: ['EMBED_LINKS', 'MANAGE_MESSAGES', 'MANAGE_ROLES'],
      usage: (language, prefix) => language.get('CAPTCHA_USAGE', prefix),
      category: (language) => language.get('UTILS').GUILDADMIN_CATEGORY,
      examples: (language, prefix) => language.get('CAPTCHA_EXAMPLE', prefix)
    })
  }

  async run (message, args, res) {
    const data = res.rows[0].captcha

    switch (args[0]) {
      case 'set-channel': {
        const channel = await this.client.functions.channelFilter(message, args[1])
        if (!channel) {
          return
        }

        this.client.database.query(`UPDATE settings SET captcha = jsonb_set(captcha, '{channel}', '"${channel.id}"') WHERE id = $1`, [message.guild.id])
        message.channel.send(message.language.get('LOGS_CHANNEL', channel))
        break
      }

      case 'add-role': {
        const role = await this.client.functions.roleFilter(message, args.shift())
        if (!role) {
          return
        }

        if (data.roles.length && data.roles.includes(role.id)) {
          message.channel.send(message.language.get('AUTOROLE')[0])
          return
        }

        if (message.guild.member(this.client.user).roles.highest.position <= role.position) {
          message.channel.send(message.language.get('AUTOROLE')[1])
          return
        }

        if (data.roles.length === 10 && !res.premium) {
          message.channel.send(message.language.get('UTILS').AUTOROLE_SIZE_PREMIUM(res.rows[0].prefix))
          return
        }

        this.client.database.query(`UPDATE settings SET captcha = jsonb_insert(captcha, '{roles, 0}', '"${role.id}"') WHERE id = $1`, [message.guild.id])
        message.channel.send(message.language.get('AUTOROLE_ADDROLE', role))
        break
      }

      case 'remove-role': {
        const role = await this.client.functions.roleFilter(message, args.shift())
        if (!role) {
          return
        }

        if (!data.length || !data.includes(role.id)) {
          message.channel.send(message.language.get('AUTOROLE')[2])
          return
        }

        this.client.database.query(`UPDATE settings SET captcha = jsonb_set(captcha, '{roles}', (captcha->'roles') - '${role.id}') WHERE id = $1`, [message.guild.id])
        message.channel.send(message.language.get('CAPTCHA_REMOVEROLE', role))
        break
      }

      case 'set-time': {
        if (!args[1]) {
          message.channel.send('Tu dois m\'indiquer un nombre !')
          return
        }

        const numberTime = Number(args[1])

        if (Number.isNaN(numberTime)) {
          message.channel.send('Tu dois m\'indiquer un nombre valide !')
          return
        }

        if (numberTime < 15 || numberTime > 300) {
          message.channel.send('Le temps doit être compris entre 15 et 300 secondes')
          return
        }

        this.client.database.query(`UPDATE settings SET captcha = jsonb_set(captcha, '{time}', '${numberTime}') WHERE id = $1`, [message.guild.id])
        message.channel.send(`Temps de captcha fixé sur ${args[1]}`)

        break
      }

      case 'set-attempts': {
        if (!args[1]) {
          message.channel.send('Tu dois m\'indiquer un nombre !')
          return
        }

        const numberTime = Number(args[1])

        if (Number.isNaN(numberTime)) {
          message.channel.send('Tu dois m\'indiquer un nombre valide !')
          return
        }

        if (numberTime < 1 || numberTime > 10) {
          message.channel.send('Le temps doit être compris entre 1 et 10 secondes')
          return
        }

        this.client.database.query(`UPDATE settings SET captcha = jsonb_set(captcha, '{attempts}', '${numberTime}') WHERE id = $1`, [message.guild.id])
        message.channel.send(`Nombre d'essai fixé sur ${args[1]}`)

        break
      }

      case 'setup': {
        const mentionRole = data.map(role => {
          if (!message.guild.roles.cache.get(role)) {
            this.client.database.query(`UPDATE settings SET captcha = jsonb_set(captcha, '{roles}', (captcha->'roles') - '${role}') WHERE id = $1`, [message.guild.id])
          } else {
            return `• <@&${role}>`
          }
        })

        message.channel.send('a faire')
        break
      }

      default: {
        message.channel.send('a faire')
      }
    }
  }
}
