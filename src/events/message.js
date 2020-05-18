'use strict'

const { WebhookClient } = require('discord.js')
const commandsCooldowns = {}

module.exports = async (client, message) => {
  if (message.author.bot) return
  if (!message.guild) return
  if (message.attachments.size !== 0) return

  if (message.partial) await message.fetch()

  const res = await client.functions.getDataSettings(client, message.guild.id, message)
  if (!res) return

  const language = new (require(`../../i18n/${res.rows[0].language}`))()
  message.language = language

  if (!message.content.startsWith(res.rows[0].prefix) && message.guild.me.hasPermission('MANAGE_MESSAGES')) {
    const dataBadwords = res.rows[0].badwords
    if (res.rows[0].system.badwords) {
      if ((dataBadwords.roles.length === 0 || !message.member.roles.cache.some(r => dataBadwords.roles.includes(r.id))) && (dataBadwords.channels.length === 0 || !dataBadwords.channels.includes(message.channel.id))) {
        if (dataBadwords.words.length > 0) {
          const array = dataBadwords.words
          const words = message.content.toLowerCase().trim().split(' ')
          for (let i = 0; i < array.length; i++) {
            const test = words.some(word => {
              return array[i].toLowerCase().includes(word)
            })
            if (test && words.includes(array[i].toLowerCase())) {
              message.delete()
              return message.author.send(message.language.get('UTILS').BADWORDS_WARN).catch()
            }
          }
        }
      }
    }

    const dataAntilink = res.rows[0].antilink
    if (res.rows[0].system.antilink) {
      if (dataAntilink.roles.length === 0 || !message.member.roles.cache.some(r => dataAntilink.roles.includes(r.id))) {
        if (dataAntilink.channels.length === 0 || !dataAntilink.channels.includes(message.channel.id)) {
          if (message.content.match(/(http[s]?:\/\/)(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/gi)) {
            message.delete()
            return message.author.send(message.language.get('UTILS').ANTILINK_WARN).catch()
          }
        }
      }
    }

    const dataAnticaps = res.rows[0].anticaps
    if (res.rows[0].system.anticaps) {
      if ((dataAnticaps.roles.length === 0 || !message.member.roles.cache.some(r => dataAnticaps.roles.includes(r.id))) && (dataAnticaps.channels.length === 0 || !dataAnticaps.channels.includes(message.channel.id))) {
        const length = message.content.replace(/[^A-Z]/g, '').length
        const percentile = Math.floor((length / message.content.length) * 100)

        if (percentile > 70 && message.content.length > 6) {
          message.delete()
          return message.author.send(message.language.get('UTILS').ANTICAPS_WARN).catch()
        }
      }
    }

    const dataMassmentions = res.rows[0].massmentions
    if (res.rows[0].system.massmentions) {
      if ((dataMassmentions.roles.length === 0 || !message.member.roles.cache.some(r => dataMassmentions.roles.includes(r.id))) && (dataMassmentions.channels.length === 0 || !dataMassmentions.channels.includes(message.channel.id))) {
        const mentionsSize = message.mentions.users.size

        if (mentionsSize > dataMassmentions.max) {
          message.delete()
          return message.author.send(message.language.get('UTILS').MASSMENTIONS_WARN).catch()
        }
      }
    }
  }

  const botMention = new RegExp(`^<@!?${client.user.id}>( |)$`)
  if (message.content.match(botMention) || message.content === 'h!guide') return message.channel.send(language.get('INFO_PREFIX', res.rows[0].prefix))

  if (message.content.indexOf(res.rows[0].prefix) !== 0) return

  const args = message.content.slice(res.rows[0].prefix.length).split(/ +/g)

  if (!message.channel.permissionsFor(client.user).has('SEND_MESSAGES')) return

  const command = args.shift().toLowerCase()

  const cmd = client.commands[command] || client.commands[client.aliases[command]]

  if (!cmd) return

  // Commands options //
  if ((cmd.conf.plugin.toString() === 'images' && !res.rows[0].system.images) || (cmd.conf.plugin.toString() === 'nsfw' && !res.rows[0].system.nsfw)) return

  if (!cmd.conf.enabled) return message.channel.send(message.language.get('COMMANDE_DISABLED'))

  if (client.functions.checkBotPerm(message, cmd).length !== 0) return message.channel.send(message.language.get('BOT_PERMISSION', client.functions.checkBotPerm(message, cmd)))

  if (client.functions.checkUserPerm(message, message.author, cmd).length !== 0) return message.channel.send(message.language.get('USER_PERMISSION'), client.functions.checkUserPerm(message, message.author, cmd))

  if (cmd.conf.owner && !client.config.owners.includes(message.author.id)) return message.channel.send(message.language.get('OWNER'))

  if (cmd.conf.plugin.toString() === 'nsfw' && !message.channel.nsfw) return message.channel.send(message.language.get('NSFW'))

  if (cmd.conf.cooldown !== 0) {
    let userCooldowns = commandsCooldowns[message.member.user.id]

    if (!userCooldowns) {
      commandsCooldowns[message.member.user.id] = {}
      userCooldowns = commandsCooldowns[message.member.user.id]
    }

    const cooldown = userCooldowns[cmd.help.name] || 0

    if (Math.round(cooldown - Date.now()) > 0 && cooldown > Date.now()) {
      return message.channel.send(message.language.get('COOLDOWN', client.functions.getDuration(cooldown - Date.now()))).then(m => m.delete({ timeout: 5000 }))
    }

    commandsCooldowns[message.member.user.id][cmd.help.name] = Date.now() + cmd.conf.cooldown * 1000
  }

  cmd.run(message, args)
    .then(() => {
      new WebhookClient(client.config.webhooks.commands.id, client.config.webhooks.commands.token).send(client.functions.messageCommandRun(command, message))
    })
    .catch((err) => {
      message.channel.send(message.language.get('UTILS').ERROR(err))
      new WebhookClient(client.config.webhooks.errors.id, client.config.webhooks.errors.token).send(client.functions.messageCommandError(command, message, err))
    })
}
