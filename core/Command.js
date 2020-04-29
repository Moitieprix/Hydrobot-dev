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
    usage = false,
    category = 'Not defined',
    examples = false
  }) {
    this.client = client
    this.conf = { enabled, aliases, permission, botpermissions, owner, cooldown, plugin }
    this.help = { name, category, usage, examples }
  };
}
