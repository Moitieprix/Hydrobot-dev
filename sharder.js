'use strict'

const { readFileSync } = require('fs')
const { parse } = require('toml')

if (Number(process.version.slice(1).split('.')[0]) < 10) { throw new Error('Node 10.0.0 or higher is required. Update Node on your system.') }

const { ShardingManager } = require('discord.js')
const config = parse(readFileSync('./config.toml', 'utf-8'))
const sharder = new ShardingManager('index.js', { token: config.token, totalShards: 'auto' })

sharder
  .on('shardCreate', (shard) => { console.log(`Loading of the shard ${shard.id}...`) })
  .spawn().then(() => {
    console.log(`${sharder.totalShards} shards loaded !`)
  })
