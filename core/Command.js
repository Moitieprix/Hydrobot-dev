'use strict'

module.exports = class Command {
  constructor (client, {
    name = null,
    cooldown = 3,
    enabled = true,
    owner = false,
    plugin = false,
    aliases = [],
    permission = [],
    botpermissions = [],
    usage = 'Not defined',
    category = 'Not defined',
    examples = 'Not defined'
  }) {
    this.client = client
    this.conf = { enabled, aliases, permission, botpermissions, owner, cooldown, plugin }
    this.help = { name, category, usage, examples }
  }
}
