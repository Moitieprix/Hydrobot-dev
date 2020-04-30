'use strict'

const {MessageEmbed} = require('discord.js')

module.exports = {

  /**
   *
   * @param message
   * @param user
   * @param command
   * @returns {Array}
   */
  checkUserPerm (message, user, command) {
    let perms = []

    command.conf.permission.forEach((perm) => {
      if (!message.channel.permissionsFor(user.id).has(perm)) {
        perms = command.conf.permission.map((perm0) => `\`${perm0}\``).join(' ,')
      }
    })

    return perms
  },

  /**
   *
   * @param message
   * @param command
   * @returns {Array}
   */
  checkBotPerm (message, command) {
    let perms = []

    command.conf.botpermissions.forEach((perm) => {
      if (!message.channel.permissionsFor(message.guild.me).has(perm)) {
        perms = command.conf.botpermissions.map((perm0) => `\`${perm0}\``).join(', ')
      }
    })

    return perms
  },

  /**
   *
   * @param message
   * @param args
   * @returns {*}
   */
  async userFilter (message, args) {
    const users = await message.guild.members.fetch()

    if (!args.join(' ') && !message.mentions.users.first()) {
      return message.author

    } else if (args.join(' ') && !message.mentions.users.first()) {

       if (users.filter((m) => m.user.username.toLowerCase().includes(args.join(' ').toLowerCase())).size !== 0) {
         return users.filter((m) => m.user.username.toLowerCase().includes(args.join(' ').toLowerCase())).first().user

       } else if (users.filter((m) => m.displayName.toLowerCase().includes(args.join(' ').toLowerCase())).size !== 0){
         return users.filter((m) => m.displayName.toLowerCase().includes(args.join(' ').toLowerCase())).first().user

       } else if (users.filter((m) => m.user.username.toLowerCase().includes(args.join(' ').toLowerCase())).size === 0 && !isNaN(args[0]) && args[0].length === 18 && users.some(ch => ch.id === args[0])) {
         const member = await message.guild.members.fetch(args[0])
         return member.user

       } else {
         return false
       }

    } else if (message.mentions.users.first()) {
      return message.mentions.users.first()
    }
  },

  /**
   *
   * @param message
   * @param argsChannel
   * @returns {*}
   */
  channelFilter (message, argsChannel) {
    const channels = message.guild.channels.cache

    if (!argsChannel) {
      return message.channel.id
    } else if (message.mentions.channels.first() && channels.some(ch => ch.id === message.mentions.channels.first().id)) {
      return message.mentions.channels.first().id
    } else if (!message.mentions.channels.first() && !isNaN(argsChannel) && channels.some(ch => ch.id === argsChannel)) {
      return argsChannel
    } else {
      return false
    }
  },

  /**
   *
   * @param message
   * @param argsRole
   * @returns {*}
   */
  roleFilter (message, argsRole) {
    const roles = message.guild.roles.cache

    if (message.mentions.roles.first() && roles.some(ch => ch.id === message.mentions.roles.first().id)){
      return message.mentions.roles.first().id
    } else if (!message.mentions.roles.first() && !isNaN(argsRole) && roles.some(ch => ch.id === argsRole)) {
      return argsRole
    } else {
      return false
    }
  },

  /**
   *
   * @returns {string}
   */
  getCpuUsagePercent () {

    const time = process.hrtime()
    const usage = process.cpuUsage()

    const elapTime = time[0] * 1000 + time[1] / 1000000
    const elapUser = usage.user / 1000000
    const elapSyst = usage.system / 1000000

    return ((100 * (elapUser + elapSyst) / elapTime)).toFixed(2)

  },

  /**
   *
   * @param text
   * @returns {*}
   */
  parseEmoji (text) {
    if (text.includes('%')) text = decodeURIComponent(text)

    if (!text.includes(':')) return { animated: false, name: text, id: null }

    const m = text.match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/)

    if (!m) return null

    return { animated: Boolean(m[1]), name: m[2], id: m[3] }
  },

  /**
   *
   * @param cmd
   * @param message
   * @param error
   * @returns {MessageEmbed}
   */
  messageCommandError (cmd, message, error) {
    return new MessageEmbed()
      .setColor('RED')
      .setDescription(`An Error occured in command \`${cmd}\``)
      .addField(`Error :`, `\`${error}\``)
      .addField(`Content :`, `\`${message.content}\``)
      .setTimestamp()
  },

  /**
   *
   * @param cmd
   * @param message
   * @param config
   * @returns {MessageEmbed}
   */
  messageCommandRun (cmd, message, config) {
    return new MessageEmbed()
      .setColor(config.embed.color)
      .setDescription(`Command \`${cmd}\` executed`)
      .setThumbnail(message.author.displayAvatarURL())
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .addField('Author :', `${message.author.tag} (${message.author.id})`, true)
      .addField('Guild :', `${message.guild.name} (${message.guild.id})`, true)
      .addField('Channel :', `${message.channel.name} (${message.channel.id})`, true)
      .addField('Content :', message.content, true)
      .addField('Date :', getDate(), true)
      .addField('Shard :', message.guild.shard.id, true)
      .setTimestamp()
  },

  /**
   *
   * @param min
   * @param max
   * @returns {*}
   */
  getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  },

  /**
   *
   * @param milliseconds
   * @returns {string}
   */
  getDuration (milliseconds) {
    let week = Math.floor(milliseconds / 86400000 * 7)
    let day = Math.floor(milliseconds / 86400000)
    let hours = Math.floor(milliseconds / 3600000) % 24
    let minutes = Math.floor(milliseconds / 60000) % 60
    let seconds = Math.ceil(milliseconds / 1000) % 60

    if (seconds < 10) {
      seconds = `0${seconds}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    if (hours < 10) {
      hours = `0${hours}`
    }

    if (week > 0){
      return `${week}w, ${day}d, ${hours}h, ${minutes}min, ${seconds}s`
    } else if (week <= 0 && day > 0) {
      return `${day}d, ${hours}h, ${minutes}min, ${seconds}s`
    } else if (day <= 0 && hours > 0) {
      return `${hours}h, ${minutes}min, ${seconds}s`
    } else if (day <= 0 && hours <= 0 && minutes > 0) {
      return `${minutes}min, ${seconds}s`
    } else {
      return `${seconds}s`
    }
  },

  getDate(date, message) {
    return date[2] + ' ' + message.language.get('UTILS').MONTHS[date[1]] + ' ' + date[3] + ', ' + date[4]
  },

  createDataSettings (id, database) {
    return new Promise(() => {
      database.query('INSERT INTO settings (id, prefix, language, system, channels, welcome_message, goodbye_message, logs_list, antilink, badwords, anticaps, autoroles, cmd_guild, user_logs) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)', [
        id,
        'h!',
        'fr',
        {
          logs: false,
          modlogs: false,
          autorole: false,
          welcome: false,
          goodbye: false,
          antilink: false,
          anticaps: false,
          badwords: false,
          captcha: false,
          antiJoin: false,
          nsfw: false,
          customCommands: false,
          images: false,
          picture: false,
          pictureLink: '0',
          captchaRole: '0'
        },
        {
          welcome: '0',
          goodbye: '0',
          logs: '0',
          modlogs: '0',
          captcha: '0'
        },
        'Bienvenue à toi [USERNAME] sur [GUILD] !',
        'Au revoir [USERNAME] !',
        {
          channelCreate: true,
          channelDelete: true,
          channelPinsUpdate: true,
          channelUpdate: true,
          emojiCreate: true,
          emojiDelete: true,
          emojiUpdate: true,
          guildBanAdd: true,
          guildBanRemove: true,
          guildMemberAdd: true,
          guildMemberRemove: true,
          guildMemberUpdate: true,
          guildUpdate: true,
          inviteCreate: true,
          inviteDelete: true,
          messageDelete: true,
          messageDeleteBulk: true,
          messageUpdate: true,
          roleCreate: true,
          roleDelete: true,
          roleUpdate: true,
          userUpdate: true,
          voiceStateUpdate: true
        },
        [{
          "roles": [],
          "channels": []
        }],
        [{
          "roles": [],
          "channels": [],
          "words": []
        }],
        [{
          "roles": [],
          "channels": []
        }],
        [],
        [],
        []
      ])
    })
  }

}

function getDate () {
  let date = new Date().getDate()
  let month = new Date().getMonth() + 1
  let hour = new Date().getHours()
  let minute = new Date().getMinutes()
  let second = new Date().getSeconds()
  const year = new Date().getFullYear()

  if (date < 10) {
    date = `0${date}`
  }

  if (month < 10) {
    month = `0${month}`
  }

  if (hour < 10) {
    hour = `0${hour}`
  }

  if (minute < 10) {
    minute = `0${minute}`
  }

  if (second < 10) {
    second = `0${second}`
  }

  return `${date}/${month}/${year} ${hour}:${minute}:${second}`
}
