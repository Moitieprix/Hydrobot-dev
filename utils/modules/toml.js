const parser = require('./toml/parser')
const compiler = require('./toml/compiler')

module.exports = {
  parse: function (input) {
    const nodes = parser.parse(input.toString())
    return compiler.compile(nodes)
  }
}
