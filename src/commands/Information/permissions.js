'use strict'

const Command = require('../../../core/Command.js')
const { MessageEmbed } = require('discord.js')

module.exports = class Permissions extends Command {
  constructor (client) {
    super(client, {
      name: 'permissions',
      cooldown: 3,
      owner: false,
      enabled: true,
      nsfw: false,
      plugin: false,
      aliases: [],
      permission: [],
      botpermissions: ['EMBED_LINKS'],
      description: (language) => language.get('PERMISSIONS_DESC'),
      usage: (language, prefix) => language.get('PERMISSIONS_USAGE', prefix),
      category: (language) => language.get('UTILS').INFORMATION_CATEGORIE,
      examples: (language, prefix) => language.get('PERMISSIONS_EXEMPLE', prefix)
    })
  }

  async run (message, args) {
    const user = await this.client.functions.userFilter(message, args)

    if (!user) return message.channel.send(message.language.get('UTILS').USER_DEFAUT)

    const permissions = ['ADMINISTRATOR', 'CREATE_INSTANT_INVITE', 'KICK_MEMBERS', 'BAN_MEMBERS', 'MANAGE_CHANNELS', 'MANAGE_GUILD', 'ADD_REACTIONS', 'VIEW_AUDIT_LOG', 'PRIORITY_SPEAKER', 'STREAM', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'SEND_TTS_MESSAGES', 'MANAGE_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'MENTION_EVERYONE', 'USE_EXTERNAL_EMOJIS', 'VIEW_GUILD_INSIGHTS', 'CONNECT', 'SPEAK', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS', 'MOVE_MEMBERS', 'USE_VAD', 'CHANGE_NICKNAME', 'MANAGE_NICKNAMES', 'MANAGE_ROLES', 'MANAGE_WEBHOOKS', 'MANAGE_EMOJIS']
    const mPermissions = message.channel.permissionsFor(user)
    const total = {
      denied: 0,
      allowed: 0
    }
    let text = ''

    permissions.forEach((perm) => {
      if (!mPermissions.has(perm)) {
        text += `\`${perm}\` • ${this.client.emote.others.no}\n`
        total.denied++
      } else {
        text += `\`${perm}\` • ${this.client.emote.others.yes}\n`
        total.allowed++
      }
    })

    const embed = new MessageEmbed()
      .setColor(this.client.config.embed.color)
      .setDescription(`:white_check_mark: • **${total.allowed} permissions**\n\n` + text)
      .setTimestamp()
      .setFooter(this.client.user.username, this.client.user.avatarURL())

    message.channel.send(embed)
  }
}
