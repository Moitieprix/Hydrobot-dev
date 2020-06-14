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
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hour = date.getHours()
  let min = date.getMinutes()
  let sec = date.getSeconds()

  if (day < 10) day = `0${date}`

  if (month < 10) month = `0${month}`

  if (hour < 10) hour = `0${hour}`

  if (min < 10) min = `0${min}`

  if (sec < 10) sec = `0${sec}`

  return `${day}/${month}/${year}, ${hour}:${min}:${sec}`
}
