'use strict'

module.exports = class Logger {
  static info (msg) {
    console.log(`\u001b[32m${getDate()} | \u001b[0m${msg}`)
  }

  static shard (msg) {
    console.log(`\u001b[36m${getDate()} | \u001b[0m${msg}`)
  }

  static warn (msg) {
    console.log(`\u001b[33m${getDate()} | \u001b[0m${msg}`)
  }

  static error (msg) {
    console.log(`\u001b[31m${getDate()} | \u001b[0m${msg}`)
  }

  static database (msg) {
    console.log(`\u001b[34m${getDate()} | \u001b[0m${msg}`)
  }
}

function getDate () {
  const date = new Date()

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const min = date.getMinutes()
  const sec = date.getSeconds()

  return `${day < 10 ? `0${day}` : day}/${month < 10 ? `0${month}` : month}/${year}, ${hour < 10 ? `0${hour}` : hour}:${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`
}
