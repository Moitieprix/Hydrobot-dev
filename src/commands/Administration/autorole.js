'use strict'

const Command = require('../../../core/Command.js')

module.exports = class Autorole extends Command {
  constructor (client) {
    super(client, {
      name: 'autorole',
      cooldown: 5,
      enabled: true,
      owner: false,
      plugin: false,
      aliases: [],
      permission: ['ADMINISTRATOR'],
      botpermissions: ['EMBED_LINKS', 'MANAGE_MESSAGES'],
      usage: (language, prefix) => language.get('AUTOROLE_USAGE', prefix),
      category: (language) => language.get('UTILS').GUILDADMIN_CATEGORY,
      examples: (language, prefix) => language.get('AUTOROLE_EXEMPLE', prefix)
    })
  }

  async run (message, args) {
    this.client.database.query('SELECT * FROM settings WHERE id = $1', [message.guild.id], async (err, res) => {

      const data = res.rows[0].autorole

      const role = await this.client.functions.roleFilter(message, args[1])

      switch (args[0]) {
        case 'addrole':
          if (!role) return message.channel.send(message.language.get('ANTILINK')[0])
          if (data.length !== 0 && data.includes(role)) return message.channel.send(message.language.get('ANTILINK')[1])

          data.push(role)
          this.client.database.query('UPDATE settings SET autorole = $1 WHERE id = $2', [data, message.guild.id])
          message.channel.send('role add')
          break

        case 'removerole':
          if (!role) return message.channel.send(message.language.get('ANTILINK')[0])
          if (data.roles === 0 || !data.roles.includes(role)) return message.channel.send(message.language.get('ANTILINK')[2])

          const pos = data.indexOf(role)
          data.splice(pos, 1)
          this.client.database.query('UPDATE settings SET autorole = $1 WHERE id = $2', [data, message.guild.id])
          message.channel.send('role remove')
          break
      }

    })
  }
}
