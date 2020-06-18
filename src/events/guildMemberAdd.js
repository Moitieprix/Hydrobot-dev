'use strict'

const { MessageEmbed } = require('discord.js')
const { randomBytes } = require('crypto')
const { loadFont, FONT_SANS_64_BLACK, read, MIME_PNG, create } = require('jimp')

module.exports = async (client, member) => {
  if (member.user.bot) {
    return
  }

  const res = await client.functions.getDataSettings(client, member.guild.id)
  if (!res) {
    return
  }

  if (res.rows[0].system.captcha) {
    if (res.rows[0].captcha.roles.length) {
      const captchaChannel = res.rows[0].captcha.channel

      if (member.guild.channel.cache.some(ch => ch.id === captchaChannel)) {
        const buf = randomBytes(5)
        const key = buf.toString('hex')

        const array = key.split('')

        const font = await loadFont(FONT_SANS_64_BLACK)
        const picture = await read('./images/captcha.png')
        const fontCanvas = await create(500, 150)

        picture.resize(500, 150)

        array.map(async (element, i) => {
          await fontCanvas.print(font, (i * 48) + 5, i, element, 500, 150).rotate(1.1)
        })
        picture.blit(fontCanvas, 0, 0)
        picture.displace(picture, 40)

        const buffer = await picture.getBufferAsync(MIME_PNG)
        member.guild.channels.cache.get(captchaChannel).send({
          files: [{ attachment: buffer, name: 'captcha.png' }]
        })
      }
    }
  }

  const channel = res.rows[0].channels.logs

  if (!res.rows[0].system.logs || !res.rows[0].logs_list.guildMemberUpdate || channel === '0') {
    return
  }

  if (!member.guild.channels.cache.some(ch => ch.id === channel)) {
    return
  }

  if (!client.channels.cache.get(channel).permissionsFor(client.user.id).has('SEND_MESSAGES')) {
    return
  }

  const language = new (require(`../../i18n/${res.rows[0].language}`))()

}