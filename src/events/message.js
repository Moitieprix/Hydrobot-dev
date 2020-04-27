'use strict'

const {WebhookClient} = require('discord.js')
const commandsCooldowns = {}

module.exports = async (client, message) => {
  if (message.author.bot) return
  if (!message.guild) return
  if (message.attachments.size !== 0) return

  if (message.partial) await message.fetch()

  client.database.query('SELECT * FROM settings WHERE id = $1', [message.guild.id], async (err, res) => {
    if (res.rows.length === 0) {
      await client.functions.createDataSettings(message.guild.id, client.database)
    }

    const language = new (require(`../../i18n/${res.rows[0].language}`))
    message.language = language

    /// ///////////////
    // Automodération//
    /// ///////////////

    if (!message.content.startsWith(res.rows[0].prefix) && message.guild.me.hasPermission('MANAGE_MESSAGES')) {

      const dataBadwords = JSON.parse(res.rows[0].badwords[0])
      if (res.rows[0].system.badwords === true) {
        if (dataBadwords.roles.length === 0 || !message.member.roles.cache.some(r => dataBadwords.roles.includes(r.id))) {
          if (dataBadwords.channels.length === 0 || !dataBadwords.channels.includes(message.channel.id)) {
            if (dataBadwords.words.length !== 0) {
              const array = dataBadwords.words
              const words = message.content.toLowerCase().trim().split(' ')
              for (let i = 0; i < array.length; i++) {
                const test = words.some(word => {
                  return array[i].toLowerCase().includes(word)
                })
                if (test && words.includes(array[i].toLowerCase())) {
                  message.delete()
                  return message.author.send(message.language.get('AUTOMOD').BADWORDS_WARN).catch()
                }
              }
            }
          }
        }
      }

      const dataAntilink = JSON.parse(res.rows[0].antilink[0])
      if (res.rows[0].system.antilink === true) {
        if (dataAntilink.roles.length === 0 || !message.member.roles.cache.some(r => dataAntilink.roles.includes(r.id))) {
          if (dataAntilink.channels.length === 0 || !dataAntilink.channels.includes(message.channel.id)) {
            if (message.content.match(new RegExp(/(http[s]?:\/\/)(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&\/=]*)/gi))) {
              message.delete()
              return message.author.send(message.language.get('AUTOMOD').ANTILINK_WARN).catch()
            }
          }
        }
      }

      const dataAnticaps = JSON.parse(res.rows[0].anticaps[0])
      if (res.rows[0].system.anticaps === true) {
        if ((dataAnticaps.roles.length === 0 || !message.member.roles.cache.some(r => dataAnticaps.roles.includes(r.id))) && (dataAnticaps.channels.length === 0 || !dataAnticaps.channels.includes(message.channel.id))) {

          const length = message.content.replace(/[^A-Z]/g, '').length
          const percentile = Math.floor((length / message.content.length) * 100)

          if (percentile > 70 && message.content.length > 6) {
            message.delete()
            return message.author.send(message.language.get('AUTOMOD').ANTICAPS_WARN).catch()
          }
        }
      }
    }

    const botMention = new RegExp(`^<@!?${client.user.id}>( |)$`)
    if (message.content.match(botMention)) return message.channel.send(language.get('INFO_PREFIX', res.rows[0].prefix))

    if (message.content.indexOf(res.rows[0].prefix) !== 0) return

    const args = message.content.slice(res.rows[0].prefix.length).split(/ +/g)

    if (message.guild && !message.channel.permissionsFor(client.user).has('SEND_MESSAGES')) return

    const command = args.shift().toLowerCase()

    if (message.guild && !message.member) await message.guild.members.fetch(message.author)

    const cmd = client.commands[command] || client.commands[client.aliases[command]]

    let test
    if (cmd) {
      test = await new WebhookClient(client.config.webhooks.commands.id, client.config.webhooks.commands.token).send({
        embeds: [client.functions.messageCommandRun(command, message, client.config)]

      })
    } else {
      return
    }

    //////////////////////////
    // Paramètres commandes //
    //////////////////////////
    if ((cmd.conf.plugin.toString() === 'image' && res.rows[0].system.images === false) || (cmd.conf.plugin.toString() === 'nsfw' && res.rows[0].system.nsfw === false)) return

    if (!cmd.conf.enabled) return message.channel.send(message.language.get('COMMANDE_DISABLED'))

    if (client.functions.checkBotPerm(message, cmd).length !== 0) return message.channel.send(message.language.get('BOT_PERMISSION', client.functions.checkBotPerm(message, cmd)))

    if (client.functions.checkUserPerm(message, message.author, cmd).length !== 0) return message.channel.send(message.language.get('USER_PERMISSION'), client.functions.checkUserPerm(message, message.author, cmd))

    if (cmd.conf.owner && !client.config.owners.includes(message.author.id)) return message.channel.send(message.language.get('OWNER'))

    if (cmd.conf.nsfw && !message.channel.nsfw) return message.channel.send(message.language.get('NSFW'))

    if (cmd.conf.cooldown !== 0) {
      let userCooldowns = commandsCooldowns[message.member.user.id]

      if (!userCooldowns) {
        commandsCooldowns[message.member.user.id] = {}
        userCooldowns = commandsCooldowns[message.member.user.id]
      }

      const cooldown = userCooldowns[cmd.help.name] || 0

      if (Math.round(cooldown - Date.now()) > 0 && cooldown > Date.now()) {
        return message.channel.send(message.language.get('COOLDOWN', client.functions.getDuration(cooldown - Date.now()))).then(m => m.delete({timeout: 5000}))
      }

      commandsCooldowns[message.member.user.id][cmd.help.name] = Date.now() + cmd.conf.cooldown * 1000
    }

    try {
      cmd.run(message, args)
    } catch (error) {
      message.channel.send(message.language.get('UTILS').ERREUR(error))
      new WebhookClient(client.config.webhooks.errors.id, client.config.webhooks.errors.token).send({
        embeds: [client.functions.messageCommandError(command, message, error, test.id)]

      })
    }
  })
}
