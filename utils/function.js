'use strict'

const { MessageEmbed } = require('discord.js')

module.exports = {

  checkUserPerm (message, user, command) {
    let perms = []

    for (const perm of command.conf.permission) {
      if (!message.channel.permissionsFor(user.id).has(perm)) {
        perms = command.conf.permission.map((perm0) => `\`${perm0}\``).join(', ')
      }
    }

    return perms
  },

  checkBotPerm (message, command) {
    let perms = []

    command.conf.botpermissions.forEach((perm) => {
      if (!message.channel.permissionsFor(message.guild.me).has(perm)) {
        perms = command.conf.botpermissions.map((perm0) => `\`${perm0}\``).join(', ')
      }
    })

    return perms
  },

  async userFilter (message, args) {
    const users = await message.guild.members.fetch()

    if (!args[0]) return message.author

    if (users.some(member => member.id === args[0])) return (await message.guild.members.fetch(args[0])).user

    if (message.mentions.users.first()) return message.mentions.users.first()

    const usersFilter = users.filter(m => m.displayName.toLowerCase().includes(args.join(' ').toLowerCase()) || m.user.username.toLowerCase().includes(args.join(' ').toLowerCase()))

    if (usersFilter.size === 0) {
      message.channel.send(message.language.get('UTILS').USER_DEFAUT)
      return null
    }

    if (usersFilter.size === 1) return usersFilter.first().user

    if (usersFilter.size > 25) return message.channel.send(message.language.get('UTILS').TOO_MANY_RESULTS)

    if (usersFilter.size > 1) {
      const usersList = usersFilter.array().slice(0, 25)

      message.channel.send(new MessageEmbed()
        .setColor(message.client.config.embed.color)
        .setTitle(message.language.get('UTILS').USERFILTER)
        .setDescription(`${usersList.map((user, i) => `${i + 1} • ${user.displayName} - ${user.user}`).join(' \n')} \n\n${message.language.get('UTILS').FILTER[0]}`)
        .setTimestamp()
        .setFooter(message.client.user.username, message.client.user.avatarURL())
      )

      const userCollector = await new Promise(resolve => {
        const collector = message.channel.createMessageCollector(msg => msg.author.id === message.author.id, { time: 15000 })

        collector.on('collect', collected => {
          if (collected.content === 'cancel') collector.stop('queryCancelled')
          else {
            const num = parseInt(collected.content)

            if (isNaN(num) || num <= 0 || num > usersList.length) message.channel.send(message.language.get('UTILS').FILTER[1])
            else {
              resolve(usersList[num - 1].user)
              collector.stop('collectorResolve')
            }
          }
        })

        collector.on('end', (_collected, reason) => {
          if (reason === 'queryCancelled') message.channel.send(message.language.get('UTILS').FILTER[2])
          if (reason !== 'collectorResolve' && reason !== 'queryCancelled') message.channel.send('Timeout')
          resolve(null)
        })
      })
      return userCollector
    }
  },

  async channelFilter (message, args) {
    const channels = message.guild.channels.cache

    if (!args[0]) return message.channel

    if (channels.some(channel => channel.id === args[0])) return message.guild.channels.cache.get(args[0])

    if (message.mentions.channels.first()) return message.mentions.channels.first()

    const channelsFilter = channels.filter(m => m.name.toLowerCase().includes(args.join(' ').toLowerCase()))

    if (channelsFilter.size === 0) {
      message.channel.send(message.language.get('UTILS').CHANNEL_DEFAUT)
      return null
    }

    if (channelsFilter.size === 1) return channelsFilter.first().user

    if (channelsFilter.size > 15) return message.channel.send(message.language.get('UTILS').TOO_MANY_RESULTS)

    if (channelsFilter.size > 1) {
      const channelsList = channelsFilter.array().slice(0, 15)

      message.channel.send(new MessageEmbed()
        .setColor(message.client.config.embed.color)
        .setTitle(message.language.get('UTILS').CHANNELFILTER)
        .setDescription(`${channelsList.map((channel, i) => `${i + 1} • ${channel} - **${channel.parent.name}**`).join(' \n')} \n\n${message.language.get('UTILS').FILTER[0]}`)
        .setTimestamp()
        .setFooter(message.client.user.username, message.client.user.avatarURL())
      )

      const channelCollector = await new Promise(resolve => {
        const collector = message.channel.createMessageCollector(msg => msg.author.id === message.author.id, { time: 15000 })

        collector.on('collect', collected => {
          if (collected.content === 'cancel') collector.stop('queryCancelled')
          else {
            const num = parseInt(collected.content)

            if (isNaN(num) || num <= 0 || num > channelsList.length) message.channel.send(message.language.get('UTILS').FILTER[1])
            else {
              resolve(channelsList[num - 1])
              collector.stop('collectorResolve')
            }
          }
        })

        collector.on('end', (_collected, reason) => {
          if (reason === 'queryCancelled') message.channel.send(message.language.get('UTILS').FILTER[2])
          if (reason !== 'collectorResolve' && reason !== 'queryCancelled') message.channel.send('Timeout')
          resolve(false)
        })
      })
      return channelCollector
    }
  },

  async roleFilter (message, args) {
    const roles = message.guild.roles.cache

    if (!args[0]) {
      message.channel.send(message.language.get('UTILS').NO_ROLE)
      return null
    }

    if (roles.some(role => role.id === args[0])) return message.guild.roles.cache.get(args[0])

    if (message.mentions.roles.first()) return message.mentions.roles.first()

    const rolesFilter = roles.filter(m => m.name.toLowerCase().includes(args.join(' ').toLowerCase()))

    if (rolesFilter.size === 0) {
      message.channel.send(message.language.get('UTILS').ROLE_DEFAUT)
      return null
    }

    if (rolesFilter.size === 1) return rolesFilter.first().user

    if (rolesFilter.size > 15) return message.channel.send(message.language.get('UTILS').TOO_MANY_RESULTS)

    if (rolesFilter.size > 1) {
      const rolesList = rolesFilter.array().slice(0, 15)

      message.channel.send(new MessageEmbed()
        .setColor(message.client.config.embed.color)
        .setTitle(message.language.get('UTILS').ROLEFILTER)
        .setDescription(`${rolesList.map((role, i) => `${i + 1} • ${role}`).join(' \n')} \n\n${message.language.get('UTILS').FILTER[0]}`)
        .setTimestamp()
        .setFooter(message.client.user.username, message.client.user.avatarURL())
      )

      const channelCollector = await new Promise(resolve => {
        const collector = message.channel.createMessageCollector(msg => msg.author.id === message.author.id, { time: 15000 })

        collector.on('collect', collected => {
          if (collected.content === 'cancel') collector.stop('queryCancelled')
          else {
            const num = parseInt(collected.content)

            if (isNaN(num) || num <= 0 || num > rolesList.length) message.channel.send(message.language.get('UTILS').FILTER[1])
            else {
              resolve(rolesList[num - 1])
              collector.stop('collectorResolve')
            }
          }
        })

        collector.on('end', (_collected, reason) => {
          if (reason === 'queryCancelled') message.channel.send(message.language.get('UTILS').FILTER[2])
          if (reason !== 'collectorResolve' && reason !== 'queryCancelled') message.channel.send('Timeout')
          resolve(false)
        })
      })
      return channelCollector
    }
  },

  getCpuUsagePercent () {
    const time = process.hrtime()
    const usage = process.cpuUsage()

    const elapTime = time[0] * 1000 + time[1] / 1000000
    const elapUser = usage.user / 1000000
    const elapSyst = usage.system / 1000000

    return ((100 * (elapUser + elapSyst) / elapTime)).toFixed(2)
  },

  parseEmoji (text) {
    if (text.includes('%')) text = decodeURIComponent(text)

    const m = text.match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/)

    if (!m || !text.includes(':')) return null

    return { animated: Boolean(m[1]), name: m[2], id: m[3] }
  },

  messageCommandError (cmd, message, error) {
    return new MessageEmbed()
      .setColor('RED')
      .setDescription(`An Error occured in command \`${cmd}\``)
      .addField('Error :', `\`${error}\``)
      .addField('Content :', `\`${message.content}\``)
      .setTimestamp()
  },

  messageCommandRun (cmd, message) {
    return new MessageEmbed()
      .setColor(message.client.config.embed.color)
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

  getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  },

  getDuration (milliseconds) {
    const week = Math.floor(milliseconds / 86400000 * 7)
    const day = Math.floor(milliseconds / 86400000)
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

    if (week > 0) {
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

  getDate (date, message) {
    return date[2] + ' ' + message.language.get('UTILS').MONTHS[date[1]] + ' ' + date[3] + ', ' + date[4]
  },

  async getDataSettings (client, id, message = false) {
    try {
      const res = await client.database.query('SELECT * FROM settings WHERE id = $1', [id])

      if (res.rows.length === 0) {
        await client.database.query('INSERT INTO settings (id, premium, prefix, language, system, channels, welcome_message, goodbye_message, logs_list, captcha, antilink, badwords, anticaps, massmentions, autorole, custom_cmd, user_logs) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)', [
          id,
          false,
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
            massmentions: false,
            captcha: false,
            nsfw: false,
            customCommands: false,
            images: false,
            picture: false,
            pictureLink: '0'
          },
          {
            welcome: '0',
            goodbye: '0',
            logs: '0',
            modlogs: '0'
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
          {
            channel: '0',
            roles: [],
            time: 30,
            attempts: 3
          },
          {
            roles: [],
            channels: [],
            sanction: 1
          },
          {
            roles: [],
            channels: [],
            words: [],
            sanction: 1
          },
          {
            roles: [],
            channels: [],
            sanction: 1
          },
          {
            roles: [],
            channels: [],
            max: 5,
            sanction: 1
          },
          [],
          [],
          []
        ])

        return await client.database.query('SELECT * FROM settings WHERE id = $1', [message.guild.id])
      }

      return res
    } catch (err) {
      if (message) message.channel.send(message.language.get('UTILS').DATABASE_ERROR(err))
      return null
    }
  },

  createDataSettings (id, database) {
    return new Promise(() => {
      database.query('INSERT INTO settings (id, premium, prefix, language, system, channels, welcome_message, goodbye_message, logs_list, captcha, antilink, badwords, anticaps, massmentions, autorole, custom_cmd, user_logs) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)', [
        id,
        false,
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
          massmentions: false,
          captcha: false,
          nsfw: false,
          customCommands: false,
          images: false,
          picture: false,
          pictureLink: '0'
        },
        {
          welcome: '0',
          goodbye: '0',
          logs: '0',
          modlogs: '0'
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
          channel: '0',
          roles: [],
          time: 30,
          attempts: 3
        }],
        [{
          roles: [],
          channels: [],
          sanction: 1
        }],
        [{
          roles: [],
          channels: [],
          words: [],
          sanction: 1
        }],
        {
          roles: [],
          channels: [],
          sanction: 1
        },
        [{
          roles: [],
          channels: [],
          max: 5,
          sanction: 1
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
