'use strict'

const Command = require('../../../core/Command.js')
const weather = require('weather-js')
const {MessageEmbed} = require('discord.js')

module.exports = class Weather extends Command {
  constructor (client) {
    super(client, {
      name: 'weather',
      cooldown: 5,
      enabled: true,
      owner: false,
      nsfw: false,
      plugin: false,
      aliases: [],
      permission: [],
      botpermissions: ['EMBED_LINKS'],
      description: (language) => language.get('WEATHER_DESC'),
      usage: (language, prefix) => language.get('WEATHER_USAGE', prefix),
      category: (language) => language.get('UTILS').OTHERS_CATEGORIE,
      examples: (language, prefix) => language.get('WEATHER_EXEMPLE', prefix)
    })
  }

  async run (message, args) {
    weather.find({ search: args.join(' '), degreeType: 'C' }, (err, result) => {

      if (result === undefined) return message.channel.send(message.language.get('WEATHER_ARGS'))


      if (result.length === 0) return message.channel.send(message.language.get('WEATHER_VILLE'))


      const current = result[0].current
      const results = result[0]

      const embed = new MessageEmbed()
        .setColor(this.client.config.embed.color)
        .setThumbnail(current.imageUrl)
        .setDescription(message.language.get('WEATHER_DESCRIPTION', current['observationpoint']))
        .addField(message.language.get('WEATHER_EMBED')[0], `${message.language.get('WEATHER_EMBED')[6]} **${message.language.get('WEATHER_TEMPS')[current['skytext']]}** \n${message.language.get('WEATHER_EMBED')[1]} **${current['temperature']}°C** \n${message.language.get('WEATHER_EMBED')[2]} **${current['feelslike']}°C** \n${message.language.get('WEATHER_EMBED')[3]} **${current['winddisplay']}** \n${message.language.get('WEATHER_EMBED')[4]} **${current['humidity']}%**`)
        .addField('\u200b', '\u200b', false)
        .addField(message.language.get('WEATHER_EMBED')[5], `${message.language.get('WEATHER_EMBED')[6]} **${message.language.get('WEATHER_TEMPS')[results.forecast[1]['skytextday']]}** \n${message.language.get('WEATHER_EMBED')[7]} **${results.forecast[1].high}°C** \n${message.language.get('WEATHER_EMBED')[8]} **${results.forecast[1].low}°C** \n${message.language.get('WEATHER_EMBED')[9]} **${results.forecast[1]['precip']}%**`)
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.avatarURL())

      return message.channel.send(embed)
    })
  }
}