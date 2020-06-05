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
  let date = new Date().getDate()
  let month = new Date().getMonth() + 1
  let hour = new Date().getHours()
  let minute = new Date().getMinutes()
  let second = new Date().getSeconds()
  const year = new Date().getFullYear()

  if (date < 10) date = `0${date}`

  if (month < 10) month = `0${month}`

  if (hour < 10) hour = `0${hour}`

  if (minute < 10) minute = `0${minute}`

  if (second < 10) second = `0${second}`

  return `${date}/${month}/${year} ${hour}:${minute}:${second}`
}
