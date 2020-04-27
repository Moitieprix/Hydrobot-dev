'use strict'

module.exports = class Command {
  constructor (client, {
    name = null,
    cooldown = 3,
    enabled = true,
    owner = false,
    nsfw = false,
    plugin = false,
    aliases = [],
    permission = [],
    botpermissions = [],
    description = false,
    usage = false,
    category = 'Not defined',
    examples = false
  }) {
    this.client = client
    this.conf = { enabled, aliases, permission, botpermissions, owner, cooldown, nsfw, plugin }
    this.help = { name, description, category, usage, examples }
  };
}
