/* eslint-disable no-control-regex */
'use strict'

module.exports = (function () {
  function SUBCLASS (child, parent) {
    function Ctor () { this.constructor = child }
    Ctor.prototype = parent.prototype
    child.prototype = new Ctor()
  }

  function SyntaxError (message, expected, found, offset, line, column) {
    this.message = message
    this.expected = expected
    this.found = found
    this.offset = offset
    this.line = line
    this.column = column

    this.name = 'SyntaxError'
  }

  SUBCLASS(SyntaxError, Error)

  function parse (input) {
    const options = arguments.length > 1 ? arguments[1] : {}

    const peg$FAILED = {}

    const peg$startRuleFunctions = { start: peg$parsestart }
    let peg$startRuleFunction = peg$parsestart

    const peg$c1 = function () { return nodes }
    const peg$c2 = peg$FAILED
    const peg$c3 = '#'
    const peg$c4 = { type: 'literal', value: '#', description: '"#"' }
    const peg$c5 = undefined
    const peg$c6 = { type: 'any', description: 'any character' }
    const peg$c7 = '['
    const peg$c8 = { type: 'literal', value: '[', description: '"["' }
    const peg$c9 = ']'
    const peg$c10 = { type: 'literal', value: ']', description: '"]"' }
    const peg$c11 = function (name) { addNode(node('ObjectPath', name, line, column)) }
    const peg$c12 = function (name) { addNode(node('ArrayPath', name, line, column)) }
    const peg$c13 = function (parts, name) { return parts.concat(name) }
    const peg$c14 = function (name) { return [name] }
    const peg$c15 = function (name) { return name }
    const peg$c16 = '.'
    const peg$c17 = { type: 'literal', value: '.', description: '"."' }
    const peg$c18 = '='
    const peg$c19 = { type: 'literal', value: '=', description: '"="' }
    const peg$c20 = function (key, value) { addNode(node('Assign', value, line, column, key)) }
    const peg$c21 = function (chars) { return chars.join('') }
    const peg$c22 = function (node) { return node.value }
    const peg$c23 = '"""'
    const peg$c24 = { type: 'literal', value: '"""', description: '"\\"\\"\\""' }
    const peg$c25 = null
    const peg$c26 = function (chars) { return node('String', chars.join(''), line, column) }
    const peg$c27 = '"'
    const peg$c28 = { type: 'literal', value: '"', description: '"\\""' }
    const peg$c29 = "'''"
    const peg$c30 = { type: 'literal', value: "'''", description: "\"'''\"" }
    const peg$c31 = "'"
    const peg$c32 = { type: 'literal', value: "'", description: "\"'\"" }
    const peg$c33 = function (char) { return char }
    const peg$c34 = function (char) { return char }
    const peg$c35 = '\\'
    const peg$c36 = { type: 'literal', value: '\\', description: '"\\\\"' }
    const peg$c37 = function () { return '' }
    const peg$c38 = 'e'
    const peg$c39 = { type: 'literal', value: 'e', description: '"e"' }
    const peg$c40 = 'E'
    const peg$c41 = { type: 'literal', value: 'E', description: '"E"' }
    const peg$c42 = function (left, right) { return node('Float', parseFloat(left + 'e' + right), line, column) }
    const peg$c43 = function (text) { return node('Float', parseFloat(text), line, column) }
    const peg$c44 = '+'
    const peg$c45 = { type: 'literal', value: '+', description: '"+"' }
    const peg$c46 = function (digits) { return digits.join('') }
    const peg$c47 = '-'
    const peg$c48 = { type: 'literal', value: '-', description: '"-"' }
    const peg$c49 = function (digits) { return '-' + digits.join('') }
    const peg$c50 = function (text) { return node('Integer', parseInt(text, 10), line, column) }
    const peg$c51 = 'true'
    const peg$c52 = { type: 'literal', value: 'true', description: '"true"' }
    const peg$c53 = function () { return node('Boolean', true, line, column) }
    const peg$c54 = 'false'
    const peg$c55 = { type: 'literal', value: 'false', description: '"false"' }
    const peg$c56 = function () { return node('Boolean', false, line, column) }
    const peg$c57 = function () { return node('Array', [], line, column) }
    const peg$c58 = function (value) { return node('Array', value ? [value] : [], line, column) }
    const peg$c59 = function (values) { return node('Array', values, line, column) }
    const peg$c60 = function (values, value) { return node('Array', values.concat(value), line, column) }
    const peg$c61 = function (value) { return value }
    const peg$c62 = ','
    const peg$c63 = { type: 'literal', value: ',', description: '","' }
    const peg$c64 = '{'
    const peg$c65 = { type: 'literal', value: '{', description: '"{"' }
    const peg$c66 = '}'
    const peg$c67 = { type: 'literal', value: '}', description: '"}"' }
    const peg$c68 = function (values) { return node('InlineTable', values, line, column) }
    const peg$c69 = function (key, value) { return node('InlineTableValue', value, line, column, key) }
    const peg$c70 = function (digits) { return '.' + digits }
    const peg$c71 = function (date) { return date.join('') }
    const peg$c72 = ':'
    const peg$c73 = { type: 'literal', value: ':', description: '":"' }
    const peg$c74 = function (time) { return time.join('') }
    const peg$c75 = 'T'
    const peg$c76 = { type: 'literal', value: 'T', description: '"T"' }
    const peg$c77 = 'Z'
    const peg$c78 = { type: 'literal', value: 'Z', description: '"Z"' }
    const peg$c79 = function (date, time) { return node('Date', new Date(date + 'T' + time + 'Z'), line, column) }
    const peg$c80 = function (date, time) { return node('Date', new Date(date + 'T' + time), line, column) }
    const peg$c81 = /^[ \t]/
    const peg$c82 = { type: 'class', value: '[ \\t]', description: '[ \\t]' }
    const peg$c83 = '\n'
    const peg$c84 = { type: 'literal', value: '\n', description: '"\\n"' }
    const peg$c85 = '\r'
    const peg$c86 = { type: 'literal', value: '\r', description: '"\\r"' }
    const peg$c87 = /^[0-9a-f]/i
    const peg$c88 = { type: 'class', value: '[0-9a-f]i', description: '[0-9a-f]i' }
    const peg$c89 = /^[0-9]/
    const peg$c90 = { type: 'class', value: '[0-9]', description: '[0-9]' }
    const peg$c91 = '_'
    const peg$c92 = { type: 'literal', value: '_', description: '"_"' }
    const peg$c93 = function () { return '' }
    const peg$c94 = /^[A-Za-z0-9_-]/
    const peg$c95 = { type: 'class', value: '[A-Za-z0-9_\\-]', description: '[A-Za-z0-9_\\-]' }
    const peg$c96 = function (d) { return d.join('') }
    const peg$c97 = '\\"'
    const peg$c98 = { type: 'literal', value: '\\"', description: '"\\\\\\""' }
    const peg$c99 = function () { return '"' }
    const peg$c100 = '\\\\'
    const peg$c101 = { type: 'literal', value: '\\\\', description: '"\\\\\\\\"' }
    const peg$c102 = function () { return '\\' }
    const peg$c103 = '\\b'
    const peg$c104 = { type: 'literal', value: '\\b', description: '"\\\\b"' }
    const peg$c105 = function () { return '\b' }
    const peg$c106 = '\\t'
    const peg$c107 = { type: 'literal', value: '\\t', description: '"\\\\t"' }
    const peg$c108 = function () { return '\t' }
    const peg$c109 = '\\n'
    const peg$c110 = { type: 'literal', value: '\\n', description: '"\\\\n"' }
    const peg$c111 = function () { return '\n' }
    const peg$c112 = '\\f'
    const peg$c113 = { type: 'literal', value: '\\f', description: '"\\\\f"' }
    const peg$c114 = function () { return '\f' }
    const peg$c115 = '\\r'
    const peg$c116 = { type: 'literal', value: '\\r', description: '"\\\\r"' }
    const peg$c117 = function () { return '\r' }
    const peg$c118 = '\\U'
    const peg$c119 = { type: 'literal', value: '\\U', description: '"\\\\U"' }
    const peg$c120 = function (digits) { return convertCodePoint(digits.join('')) }
    const peg$c121 = '\\u'
    const peg$c122 = { type: 'literal', value: '\\u', description: '"\\\\u"' }

    let peg$currPos = 0
    let peg$reportedPos = 0
    let peg$cachedPos = 0
    let peg$cachedPosDetails = { line: 1, column: 1, seenCR: false }
    let peg$maxFailPos = 0
    let peg$maxFailExpected = []
    let peg$silentFails = 0

    const peg$cache = {}

    if ('startRule' in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + '".')
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule]
    }

    function line () {
      return peg$computePosDetails(peg$reportedPos).line
    }

    function column () {
      return peg$computePosDetails(peg$reportedPos).column
    }

    function peg$computePosDetails (pos) {
      function advance (details, startPos, endPos) {
        let p, ch

        for (p = startPos; p < endPos; p++) {
          ch = input.charAt(p)
          if (ch === '\n') {
            if (!details.seenCR) { details.line++ }
            details.column = 1
            details.seenCR = false
          } else if (ch === '\r' || ch === '\u2028' || ch === '\u2029') {
            details.line++
            details.column = 1
            details.seenCR = true
          } else {
            details.column++
            details.seenCR = false
          }
        }
      }

      if (peg$cachedPos !== pos) {
        if (peg$cachedPos > pos) {
          peg$cachedPos = 0
          peg$cachedPosDetails = { line: 1, column: 1, seenCR: false }
        }
        advance(peg$cachedPosDetails, peg$cachedPos, pos)
        peg$cachedPos = pos
      }

      return peg$cachedPosDetails
    }

    function peg$fail (expected) {
      if (peg$currPos < peg$maxFailPos) { return }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos
        peg$maxFailExpected = []
      }

      peg$maxFailExpected.push(expected)
    }

    function peg$buildException (message, expected, pos) {
      function cleanupExpected (expected) {
        let i = 1

        expected.sort(function (a, b) {
          if (a.description < b.description) {
            return -1
          } else if (a.description > b.description) {
            return 1
          } else {
            return 0
          }
        })

        while (i < expected.length) {
          if (expected[i - 1] === expected[i]) {
            expected.splice(i, 1)
          } else {
            i++
          }
        }
      }

      function buildMessage (expected, found) {
        function stringEscape (s) {
          function hex (ch) { return ch.charCodeAt(0).toString(16).toUpperCase() }

          return s
            .replace(/\\/g, '\\\\')
            .replace(/"/g, '\\"')
            .replace(/\x08/g, '\\b')
            .replace(/\t/g, '\\t')
            .replace(/\n/g, '\\n')
            .replace(/\f/g, '\\f')
            .replace(/\r/g, '\\r')
            .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function (ch) { return '\\x0' + hex(ch) })
            .replace(/[\x10-\x1F\x80-\xFF]/g, function (ch) { return '\\x' + hex(ch) })
            .replace(/[\u0180-\u0FFF]/g, function (ch) { return '\\u0' + hex(ch) })
            .replace(/[\u1080-\uFFFF]/g, function (ch) { return '\\u' + hex(ch) })
        }

        const expectedDescs = new Array(expected.length)
        let i

        for (const element of expected) {
          expectedDescs[i] = element.description
        }

        const expectedDesc = expected.length > 1
          ? expectedDescs.slice(0, -1).join(', ') +
                ' or ' +
                expectedDescs[expected.length - 1]
          : expectedDescs[0]

        const foundDesc = found ? '"' + stringEscape(found) + '"' : 'end of input'

        return 'Expected ' + expectedDesc + ' but ' + foundDesc + ' found.'
      }

      const posDetails = peg$computePosDetails(pos)
      const found = pos < input.length ? input.charAt(pos) : null

      if (expected !== null) {
        cleanupExpected(expected)
      }

      return new SyntaxError(
        message !== null ? message : buildMessage(expected, found),
        expected,
        found,
        pos,
        posDetails.line,
        posDetails.column
      )
    }

    function peg$parsestart () {
      let s0, s1, s2

      const key = peg$currPos * 49 + 0
      const cached = peg$cache[key]

      if (cached) {
        peg$currPos = cached.nextPos
        return cached.result
      }

      s0 = peg$currPos
      s1 = []
      s2 = peg$parseline()
      while (s2 !== peg$FAILED) {
        s1.push(s2)
        s2 = peg$parseline()
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0
        s1 = peg$c1()
      }
      s0 = s1

      peg$cache[key] = { nextPos: peg$currPos, result: s0 }

      return s0
    }

    function peg$parseline () {
      let s0, s1, s2, s3, s4, s5, s6

      const key = peg$currPos * 49 + 1
      const cached = peg$cache[key]

      if (cached) {
        peg$currPos = cached.nextPos
        return cached.result
      }

      s0 = peg$currPos
      s1 = []
      s2 = peg$parseS()
      while (s2 !== peg$FAILED) {
        s1.push(s2)
        s2 = peg$parseS()
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseexpression()
        if (s2 !== peg$FAILED) {
          s3 = []
          s4 = peg$parseS()
          while (s4 !== peg$FAILED) {
            s3.push(s4)
            s4 = peg$parseS()
          }
          if (s3 !== peg$FAILED) {
            s4 = []
            s5 = peg$parsecomment()
            while (s5 !== peg$FAILED) {
              s4.push(s5)
              s5 = peg$parsecomment()
            }
            if (s4 !== peg$FAILED) {
              s5 = []
              s6 = peg$parseNL()
              if (s6 !== peg$FAILED) {
                while (s6 !== peg$FAILED) {
                  s5.push(s6)
                  s6 = peg$parseNL()
                }
              } else {
                s5 = peg$c2
              }
              if (s5 === peg$FAILED) {
                s5 = peg$parseEOF()
              }
              if (s5 !== peg$FAILED) {
                s1 = [s1, s2, s3, s4, s5]
                s0 = s1
              } else {
                peg$currPos = s0
                s0 = peg$c2
              }
            } else {
              peg$currPos = s0
              s0 = peg$c2
            }
          } else {
            peg$currPos = s0
            s0 = peg$c2
          }
        } else {
          peg$currPos = s0
          s0 = peg$c2
        }
      } else {
        peg$currPos = s0
        s0 = peg$c2
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos
        s1 = []
        s2 = peg$parseS()
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2)
            s2 = peg$parseS()
          }
        } else {
          s1 = peg$c2
        }
        if (s1 !== peg$FAILED) {
          s2 = []
          s3 = peg$parseNL()
          if (s3 !== peg$FAILED) {
            while (s3 !== peg$FAILED) {
              s2.push(s3)
              s3 = peg$parseNL()
            }
          } else {
            s2 = peg$c2
          }
          if (s2 === peg$FAILED) {
            s2 = peg$parseEOF()
          }
          if (s2 !== peg$FAILED) {
            s1 = [s1, s2]
            s0 = s1
          } else {
            peg$currPos = s0
            s0 = peg$c2
          }
        } else {
          peg$currPos = s0
          s0 = peg$c2
        }
        if (s0 === peg$FAILED) {
          s0 = peg$parseNL()
        }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 }

      return s0
    }

    function peg$parseexpression () {
      let s0

      const key = peg$currPos * 49 + 2
      const cached = peg$cache[key]

      if (cached) {
        peg$currPos = cached.nextPos
        return cached.result
      }

      s0 = peg$parsecomment()
      if (s0 === peg$FAILED) {
        s0 = peg$parsepath()
        if (s0 === peg$FAILED) {
          s0 = peg$parsetablearray()
          if (s0 === peg$FAILED) {
            s0 = peg$parseassignment()
          }
        }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 }

      return s0
    }

    function peg$parsecomment () {
      let s0, s1, s2, s3, s4, s5

      const key = peg$currPos * 49 + 3
      const cached = peg$cache[key]

      if (cached) {
        peg$currPos = cached.nextPos
        return cached.result
      }

      s0 = peg$currPos
      if (input.charCodeAt(peg$currPos) === 35) {
        s1 = peg$c3
        peg$currPos++
      } else {
        s1 = peg$FAILED
        if (peg$silentFails === 0) { peg$fail(peg$c4) }
      }
      if (s1 !== peg$FAILED) {
        s2 = []
        s3 = peg$currPos
        s4 = peg$currPos
        peg$silentFails++
        s5 = peg$parseNL()
        if (s5 === peg$FAILED) {
          s5 = peg$parseEOF()
        }
        peg$silentFails--
        if (s5 === peg$FAILED) {
          s4 = peg$c5
        } else {
          peg$currPos = s4
          s4 = peg$c2
        }
        if (s4 !== peg$FAILED) {
          if (input.length > peg$currPos) {
            s5 = input.charAt(peg$currPos)
            peg$currPos++
          } else {
            s5 = peg$FAILED
            if (peg$silentFails === 0) { peg$fail(peg$c6) }
          }
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5]
            s3 = s4
          } else {
            peg$currPos = s3
            s3 = peg$c2
          }
        } else {
          peg$currPos = s3
          s3 = peg$c2
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3)
          s3 = peg$currPos
          s4 = peg$currPos
          peg$silentFails++
          s5 = peg$parseNL()
          if (s5 === peg$FAILED) {
            s5 = peg$parseEOF()
          }
          peg$silentFails--
          if (s5 === peg$FAILED) {
            s4 = peg$c5
          } else {
            peg$currPos = s4
            s4 = peg$c2
          }
          if (s4 !== peg$FAILED) {
            if (input.length > peg$currPos) {
              s5 = input.charAt(peg$currPos)
              peg$currPos++
            } else {
              s5 = peg$FAILED
              if (peg$silentFails === 0) { peg$fail(peg$c6) }
            }
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5]
              s3 = s4
            } else {
              peg$currPos = s3
              s3 = peg$c2
            }
          } else {
            peg$currPos = s3
            s3 = peg$c2
          }
        }
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2]
          s0 = s1
        } else {
          peg$currPos = s0
          s0 = peg$c2
        }
      } else {
        peg$currPos = s0
        s0 = peg$c2
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 }

      return s0
    }

    function peg$parsepath () {
      let s0, s1, s2, s3, s4, s5

      const key = peg$currPos * 49 + 4
      const cached = peg$cache[key]

      if (cached) {
        peg$currPos = cached.nextPos
        return cached.result
      }

      s0 = peg$currPos
      if (input.charCodeAt(peg$currPos) === 91) {
        s1 = peg$c7
        peg$currPos++
      } else {
        s1 = peg$FAILED
        if (peg$silentFails === 0) { peg$fail(peg$c8) }
      }
      if (s1 !== peg$FAILED) {
        s2 = []
        s3 = peg$parseS()
        while (s3 !== peg$FAILED) {
          s2.push(s3)
          s3 = peg$parseS()
        }
        if (s2 !== peg$FAILED) {
          s3 = PARSETABLE_KEY()
          if (s3 !== peg$FAILED) {
            s4 = []
            s5 = peg$parseS()
            while (s5 !== peg$FAILED) {
              s4.push(s5)
              s5 = peg$parseS()
            }
            if (s4 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 93) {
                s5 = peg$c9
                peg$currPos++
              } else {
                s5 = peg$FAILED
                if (peg$silentFails === 0) { peg$fail(peg$c10) }
              }
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0
                s1 = peg$c11(s3)
                s0 = s1
              } else {
                peg$currPos = s0
                s0 = peg$c2
              }
            } else {
              peg$currPos = s0
              s0 = peg$c2
            }
          } else {
            peg$currPos = s0
            s0 = peg$c2
          }
        } else {
          peg$currPos = s0
          s0 = peg$c2
        }
      } else {
        peg$currPos = s0
        s0 = peg$c2
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 }

      return s0
    }

    function peg$parsetablearray () {
      let s0, s1, s2, s3, s4, s5, s6, s7

      const key = peg$currPos * 49 + 5
      const cached = peg$cache[key]

      if (cached) {
        peg$currPos = cached.nextPos
        return cached.result
      }

      s0 = peg$currPos
      if (input.charCodeAt(peg$currPos) === 91) {
        s1 = peg$c7
        peg$currPos++
      } else {
        s1 = peg$FAILED
        if (peg$silentFails === 0) { peg$fail(peg$c8) }
      }
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 91) {
          s2 = peg$c7
          peg$currPos++
        } else {
          s2 = peg$FAILED
          if (peg$silentFails === 0) { peg$fail(peg$c8) }
        }
        if (s2 !== peg$FAILED) {
          s3 = []
          s4 = peg$parseS()
          while (s4 !== peg$FAILED) {
            s3.push(s4)
            s4 = peg$parseS()
          }
          if (s3 !== peg$FAILED) {
            s4 = PARSETABLE_KEY()
            if (s4 !== peg$FAILED) {
              s5 = []
              s6 = peg$parseS()
              while (s6 !== peg$FAILED) {
                s5.push(s6)
                s6 = peg$parseS()
              }
              if (s5 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 93) {
                  s6 = peg$c9
                  peg$currPos++
                } else {
                  s6 = peg$FAILED
                  if (peg$silentFails === 0) { peg$fail(peg$c10) }
                }
                if (s6 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 93) {
                    s7 = peg$c9
                    peg$currPos++
                  } else {
                    s7 = peg$FAILED
                    if (peg$silentFails === 0) { peg$fail(peg$c10) }
                  }
                  if (s7 !== peg$FAILED) {
                    peg$reportedPos = s0
                    s1 = peg$c12(s4)
                    s0 = s1
                  } else {
                    peg$currPos = s0
                    s0 = peg$c2
                  }
                } else {
                  peg$currPos = s0
                  s0 = peg$c2
                }
              } else {
                peg$currPos = s0
                s0 = peg$c2
              }
            } else {
              peg$currPos = s0
              s0 = peg$c2
            }
          } else {
            peg$currPos = s0
            s0 = peg$c2
          }
        } else {
          peg$currPos = s0
          s0 = peg$c2
        }
      } else {
        peg$currPos = s0
        s0 = peg$c2
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 }

      return s0
    }

    function PARSETABLE_KEY () {
      let s0, s1, s2

      const key = peg$currPos * 49 + 6
      const cached = peg$cache[key]

      if (cached) {
        peg$currPos = cached.nextPos
        return cached.result
      }

      s0 = peg$currPos
      s1 = []
      s2 = PARSEDOT_ENDED_TABLE_KEY_PART()
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2)
          s2 = PARSEDOT_ENDED_TABLE_KEY_PART()
        }
      } else {
        s1 = peg$c2
      }
      if (s1 !== peg$FAILED) {
        s2 = PARSETABLE_KEY_PART()
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0
          s1 = peg$c13(s1, s2)
          s0 = s1
        } else {
          peg$currPos = s0
          s0 = peg$c2
        }
      } else {
        peg$currPos = s0
        s0 = peg$c2
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos
        s1 = PARSETABLE_KEY_PART()
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0
          s1 = peg$c14(s1)
        }
        s0 = s1
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 }

      return s0
    }

    function PARSETABLE_KEY_PART () {
      let s0, s1, s2, s3, s4

      const key = peg$currPos * 49 + 7
      const cached = peg$cache[key]

      if (cached) {
        peg$currPos = cached.nextPos
        return cached.result
      }

      s0 = peg$currPos
      s1 = []
      s2 = peg$parseS()
      while (s2 !== peg$FAILED) {
        s1.push(s2)
        s2 = peg$parseS()
      }
      if (s1 !== peg$FAILED) {
        s2 = PARSEKEY()
        if (s2 !== peg$FAILED) {
          s3 = []
          s4 = peg$parseS()
          while (s4 !== peg$FAILED) {
            s3.push(s4)
            s4 = peg$parseS()
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0
            s1 = peg$c15(s2)
            s0 = s1
          } else {
            peg$currPos = s0
            s0 = peg$c2
          }
        } else {
          peg$currPos = s0
          s0 = peg$c2
        }
      } else {
        peg$currPos = s0
        s0 = peg$c2
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos
        s1 = []
        s2 = peg$parseS()
        while (s2 !== peg$FAILED) {
          s1.push(s2)
          s2 = peg$parseS()
        }
        if (s1 !== peg$FAILED) {
          s2 = PARSEQUOTED_KEY()
          if (s2 !== peg$FAILED) {
            s3 = []
            s4 = peg$parseS()
            while (s4 !== peg$FAILED) {
              s3.push(s4)
              s4 = peg$parseS()
            }
            if (s3 !== peg$FAILED) {
              peg$reportedPos = s0
              s1 = peg$c15(s2)
              s0 = s1
            } else {
              peg$currPos = s0
              s0 = peg$c2
            }
          } else {
            peg$currPos = s0
            s0 = peg$c2
          }
        } else {
          peg$currPos = s0
          s0 = peg$c2
        }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 }

      return s0
    }

    function PARSEDOT_ENDED_TABLE_KEY_PART () {
      let s0, s1, s2, s3, s4, s5, s6

      const key = peg$currPos * 49 + 8
      const cached = peg$cache[key]

      if (cached) {
        peg$currPos = cached.nextPos
        return cached.result
      }

      s0 = peg$currPos
      s1 = []
      s2 = peg$parseS()
      while (s2 !== peg$FAILED) {
        s1.push(s2)
        s2 = peg$parseS()
      }
      if (s1 !== peg$FAILED) {
        s2 = PARSEKEY()
        if (s2 !== peg$FAILED) {
          s3 = []
          s4 = peg$parseS()
          while (s4 !== peg$FAILED) {
            s3.push(s4)
            s4 = peg$parseS()
          }
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 46) {
              s4 = peg$c16
              peg$currPos++
            } else {
              s4 = peg$FAILED
              if (peg$silentFails === 0) { peg$fail(peg$c17) }
            }
            if (s4 !== peg$FAILED) {
              s5 = []
              s6 = peg$parseS()
              while (s6 !== peg$FAILED) {
                s5.push(s6)
                s6 = peg$parseS()
              }
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0
                s1 = peg$c15(s2)
                s0 = s1
              } else {
                peg$currPos = s0
                s0 = peg$c2
              }
            } else {
              peg$currPos = s0
              s0 = peg$c2
            }
          } else {
            peg$currPos = s0
            s0 = peg$c2
          }
        } else {
          peg$currPos = s0
          s0 = peg$c2
        }
      } else {
        peg$currPos = s0
        s0 = peg$c2
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos
        s1 = []
        s2 = peg$parseS()
        while (s2 !== peg$FAILED) {
          s1.push(s2)
          s2 = peg$parseS()
        }
        if (s1 !== peg$FAILED) {
          s2 = PARSEQUOTED_KEY()
          if (s2 !== peg$FAILED) {
            s3 = []
            s4 = peg$parseS()
            while (s4 !== peg$FAILED) {
              s3.push(s4)
              s4 = peg$parseS()
            }
            if (s3 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 46) {
                s4 = peg$c16
                peg$currPos++
              } else {
                s4 = peg$FAILED
                if (peg$silentFails === 0) { peg$fail(peg$c17) }
              }
              if (s4 !== peg$FAILED) {
                s5 = []
                s6 = peg$parseS()
                while (s6 !== peg$FAILED) {
                  s5.push(s6)
                  s6 = peg$parseS()
                }
                if (s5 !== peg$FAILED) {
                  peg$reportedPos = s0
                  s1 = peg$c15(s2)
                  s0 = s1
                } else {
                  peg$currPos = s0
                  s0 = peg$c2
                }
              } else {
                peg$currPos = s0
                s0 = peg$c2
              }
            } else {
              peg$currPos = s0
              s0 = peg$c2
            }
          } else {
            peg$currPos = s0
            s0 = peg$c2
          }
        } else {
          peg$currPos = s0
          s0 = peg$c2
        }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 }

      return s0
    }

    function peg$parseassignment () {
      let s0, s1, s2, s3, s4, s5

      const key = peg$currPos * 49 + 9
      const cached = peg$cache[key]

      if (cached) {
        peg$currPos = cached.nextPos
        return cached.result
      }

      s0 = peg$currPos
      s1 = PARSEKEY()
      if (s1 !== peg$FAILED) {
        s2 = []
        s3 = peg$parseS()
        while (s3 !== peg$FAILED) {
          s2.push(s3)
          s3 = peg$parseS()
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 61) {
            s3 = peg$c18
            peg$currPos++
          } else {
            s3 = peg$FAILED
            if (peg$silentFails === 0) { peg$fail(peg$c19) }
          }
          if (s3 !== peg$FAILED) {
            s4 = []
            s5 = peg$parseS()
            while (s5 !== peg$FAILED) {
              s4.push(s5)
              s5 = peg$parseS()
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsevalue()
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0
                s1 = peg$c20(s1, s5)
                s0 = s1
              } else {
                peg$currPos = s0
                s0 = peg$c2
              }
            } else {
              peg$currPos = s0
              s0 = peg$c2
            }
          } else {
            peg$currPos = s0
            s0 = peg$c2
          }
        } else {
          peg$currPos = s0
          s0 = peg$c2
        }
      } else {
        peg$currPos = s0
        s0 = peg$c2
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos
        s1 = PARSEQUOTED_KEY()
        if (s1 !== peg$FAILED) {
          s2 = []
          s3 = peg$parseS()
          while (s3 !== peg$FAILED) {
            s2.push(s3)
            s3 = peg$parseS()
          }
          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 61) {
              s3 = peg$c18
              peg$currPos++
            } else {
              s3 = peg$FAILED
              if (peg$silentFails === 0) { peg$fail(peg$c19) }
            }
            if (s3 !== peg$FAILED) {
              s4 = []
              s5 = peg$parseS()
              while (s5 !== peg$FAILED) {
                s4.push(s5)
                s5 = peg$parseS()
              }
              if (s4 !== peg$FAILED) {
                s5 = peg$parsevalue()
                if (s5 !== peg$FAILED) {
                  peg$reportedPos = s0
                  s1 = peg$c20(s1, s5)
                  s0 = s1
                } else {
                  peg$currPos = s0
                  s0 = peg$c2
                }
              } else {
                peg$currPos = s0
                s0 = peg$c2
              }
            } else {
              peg$currPos = s0
              s0 = peg$c2
            }
          } else {
            peg$currPos = s0
            s0 = peg$c2
          }
        } else {
          peg$currPos = s0
          s0 = peg$c2
        }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 }

      return s0
    }

    function PARSEKEY () {
      let s0, s1, s2

      const key = peg$currPos * 49 + 10
      const cached = peg$cache[key]

      if (cached) {
        peg$currPos = cached.nextPos
        return cached.result
      }

      s0 = peg$currPos
      s1 = []
      s2 = ASCII_BASIC()
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2)
          s2 = ASCII_BASIC()
        }
      } else {
        s1 = peg$c2
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0
        s1 = peg$c21(s1)
      }
      s0 = s1

      peg$cache[key] = { nextPos: peg$currPos, result: s0 }

      return s0
    }

    function PARSEQUOTED_KEY () {
      let s0, s1

      const key = peg$currPos * 49 + 11
      const cached = peg$cache[key]

      if (cached) {
        peg$currPos = cached.nextPos
        return cached.result
      }

      s0 = peg$currPos
      s1 = PARSEDOUBLE_QUOTED_SINGLE_LINE_STRING()
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0
        s1 = peg$c22(s1)
      }
      s0 = s1
      if (s0 === peg$FAILED) {
        s0 = peg$currPos
        s1 = PARSESINGLE_QUOTED_SINGLE_LINE_STRING()
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0
          s1 = peg$c22(s1)
        }
        s0 = s1
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 }

      return s0
    }

    function peg$parsevalue () {
      let s0

      const key = peg$currPos * 49 + 12
      const cached = peg$cache[key]

      if (cached) {
        peg$currPos = cached.nextPos
        return cached.result
      }

      s0 = peg$parsestring()
      if (s0 === peg$FAILED) {
        s0 = peg$parsedatetime()
        if (s0 === peg$FAILED) {
          s0 = peg$parsefloat()
          if (s0 === peg$FAILED) {
            s0 = peg$parseinteger()
            if (s0 === peg$FAILED) {
              s0 = peg$parseboolean()
              if (s0 === peg$FAILED) {
                s0 = peg$parsearray()
                if (s0 === peg$FAILED) {
                  s0 = PARSEINLINE_TABLE()
                }
              }
            }
          }
        }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 }

      return s0
    }

    function peg$parsestring () {
      let s0

      const key = peg$currPos * 49 + 13
      const cached = peg$cache[key]

      if (cached) {
        peg$currPos = cached.nextPos
        return cached.result
      }

      s0 = PARSEDOUBLE_QUOTED_MULTILINE_STRING()
      if (s0 === peg$FAILED) {
        s0 = PARSEDOUBLE_QUOTED_SINGLE_LINE_STRING()
        if (s0 === peg$FAILED) {
          s0 = PARSESINGLE_QUOTED_MULTILINE_STRING()
          if (s0 === peg$FAILED) {
            s0 = PARSESINGLE_QUOTED_SINGLE_LINE_STRING()
          }
        }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 }

      return s0
    }

    function PARSEDOUBLE_QUOTED_MULTILINE_STRING () {
      let s0, s1, s2, s3, s4

      const key = peg$currPos * 49 + 14
      const cached = peg$cache[key]

      if (cached) {
        peg$currPos = cached.nextPos
        return cached.result
      }

      s0 = peg$currPos
      if (input.substr(peg$currPos, 3) === peg$c23) {
        s1 = peg$c23
        peg$currPos += 3
      } else {
        s1 = peg$FAILED
        if (peg$silentFails === 0) { peg$fail(peg$c24) }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseNL()
        if (s2 === peg$FAILED) {
          s2 = peg$c25
        }
        if (s2 !== peg$FAILED) {
          s3 = []
          s4 = PARSEMULTILINE_STRING_CHAR()
          while (s4 !== peg$FAILED) {
            s3.push(s4)
            s4 = PARSEMULTILINE_STRING_CHAR()
          }
          if (s3 !== peg$FAILED) {
            if (input.substr(peg$currPos, 3) === peg$c23) {
              s4 = peg$c23
              peg$currPos += 3
            } else {
              s4 = peg$FAILED
              if (peg$silentFails === 0) { peg$fail(peg$c24) }
            }
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0
              s1 = peg$c26(s3)
              s0 = s1
            } else {
              peg$currPos = s0
              s0 = peg$c2
            }
          } else {
            peg$currPos = s0
            s0 = peg$c2
          }
        } else {
          peg$currPos = s0
          s0 = peg$c2
        }
      } else {
        peg$currPos = s0
        s0 = peg$c2
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 }

      return s0
    }

    function PARSEDOUBLE_QUOTED_SINGLE_LINE_STRING () {
      let s0, s1, s2, s3

      const key = peg$currPos * 49 + 15
      const cached = peg$cache[key]

      if (cached) {
        peg$currPos = cached.nextPos
        return cached.result
      }

      s0 = peg$currPos
      if (input.charCodeAt(peg$currPos) === 34) {
        s1 = peg$c27
        peg$currPos++
      } else {
        s1 = peg$FAILED
        if (peg$silentFails === 0) { peg$fail(peg$c28) }
      }
      if (s1 !== peg$FAILED) {
        s2 = []
        s3 = PARSESTRING_CHAR()
        while (s3 !== peg$FAILED) {
          s2.push(s3)
          s3 = PARSESTRING_CHAR()
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 34) {
            s3 = peg$c27
            peg$currPos++
          } else {
            s3 = peg$FAILED
            if (peg$silentFails === 0) { peg$fail(peg$c28) }
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0
            s1 = peg$c26(s2)
            s0 = s1
          } else {
            peg$currPos = s0
            s0 = peg$c2
          }
        } else {
          peg$currPos = s0
          s0 = peg$c2
        }
      } else {
        peg$currPos = s0
        s0 = peg$c2
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 }

      return s0
    }

    function PARSESINGLE_QUOTED_MULTILINE_STRING () {
      let s0, s1, s2, s3, s4

      const key = peg$currPos * 49 + 16
      const cached = peg$cache[key]

      if (cached) {
        peg$currPos = cached.nextPos
        return cached.result
      }

      s0 = peg$currPos
      if (input.substr(peg$currPos, 3) === peg$c29) {
        s1 = peg$c29
        peg$currPos += 3
      } else {
        s1 = peg$FAILED
        if (peg$silentFails === 0) { peg$fail(peg$c30) }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseNL()
        if (s2 === peg$FAILED) {
          s2 = peg$c25
        }
        if (s2 !== peg$FAILED) {
          s3 = []
          s4 = PARSEMULTILINE_LITERAL_CHAR()
          while (s4 !== peg$FAILED) {
            s3.push(s4)
            s4 = PARSEMULTILINE_LITERAL_CHAR()
          }
          if (s3 !== peg$FAILED) {
            if (input.substr(peg$currPos, 3) === peg$c29) {
              s4 = peg$c29
              peg$currPos += 3
            } else {
              s4 = peg$FAILED
              if (peg$silentFails === 0) { peg$fail(peg$c30) }
            }
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0
              s1 = peg$c26(s3)
              s0 = s1
            } else {
              peg$currPos = s0
              s0 = peg$c2
            }
          } else {
            peg$currPos = s0
            s0 = peg$c2
          }
        } else {
          peg$currPos = s0
          s0 = peg$c2
        }
      } else {
        peg$currPos = s0
        s0 = peg$c2
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 }

      return s0
    }

    function PARSESINGLE_QUOTED_SINGLE_LINE_STRING () {
      let s0, s1, s2, s3

      const key = peg$currPos * 49 + 17
      const cached = peg$cache[key]

      if (cached) {
        peg$currPos = cached.nextPos
        return cached.result
      }

      s0 = peg$currPos
      if (input.charCodeAt(peg$currPos) === 39) {
        s1 = peg$c31
        peg$currPos++
      } else {
        s1 = peg$FAILED
        if (peg$silentFails === 0) { peg$fail(peg$c32) }
      }
      if (s1 !== peg$FAILED) {
        s2 = []
        s3 = PARSELITERAL_CHAR()
        while (s3 !== peg$FAILED) {
          s2.push(s3)
          s3 = PARSELITERAL_CHAR()
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 39) {
            s3 = peg$c31
            peg$currPos++
          } else {
            s3 = peg$FAILED
            if (peg$silentFails === 0) { peg$fail(peg$c32) }
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0
            s1 = peg$c26(s2)
            s0 = s1
          } else {
            peg$currPos = s0
            s0 = peg$c2
          }
        } else {
          peg$currPos = s0
          s0 = peg$c2
        }
      } else {
        peg$currPos = s0
        s0 = peg$c2
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 }

      return s0
    }

    function PARSESTRING_CHAR () {
      let s0, s1, s2

      const key = peg$currPos * 49 + 18
      const cached = peg$cache[key]

      if (cached) {
        peg$currPos = cached.nextPos
        return cached.result
      }

      s0 = ESCAPED()
      if (s0 === peg$FAILED) {
        s0 = peg$currPos
        s1 = peg$currPos
        peg$silentFails++
        if (input.charCodeAt(peg$currPos) === 34) {
          s2 = peg$c27
          peg$currPos++
        } else {
          s2 = peg$FAILED
          if (peg$silentFails === 0) { peg$fail(peg$c28) }
        }
        peg$silentFails--
        if (s2 === peg$FAILED) {
          s1 = peg$c5
        } else {
          peg$currPos = s1
          s1 = peg$c2
        }
        if (s1 !== peg$FAILED) {
          if (input.length > peg$currPos) {
            s2 = input.charAt(peg$currPos)
            peg$currPos++
          } else {
            s2 = peg$FAILED
            if (peg$silentFails === 0) { peg$fail(peg$c6) }
          }
          if (s2 !== peg$FAILED) {
            peg$reportedPos = s0
            s1 = peg$c33(s2)
            s0 = s1
          } else {
            peg$currPos = s0
            s0 = peg$c2
          }
        } else {
          peg$currPos = s0
          s0 = peg$c2
        }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 }

      return s0
    }

    function PARSELITERAL_CHAR () {
      let s0, s1, s2

      const key = peg$currPos * 49 + 19
      const cached = peg$cache[key]

      if (cached) {
        peg$currPos = cached.nextPos
        return cached.result
      }

      s0 = peg$currPos
      s1 = peg$currPos
      peg$silentFails++
      if (input.charCodeAt(peg$currPos) === 39) {
        s2 = peg$c31
        peg$currPos++
      } else {
        s2 = peg$FAILED
        if (peg$silentFails === 0) { peg$fail(peg$c32) }
      }
      peg$silentFails--
      if (s2 === peg$FAILED) {
        s1 = peg$c5
      } else {
        peg$currPos = s1
        s1 = peg$c2
      }
      if (s1 !== peg$FAILED) {
        if (input.length > peg$currPos) {
          s2 = input.charAt(peg$currPos)
          peg$currPos++
        } else {
          s2 = peg$FAILED
          if (peg$silentFails === 0) { peg$fail(peg$c6) }
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0
          s1 = peg$c33(s2)
          s0 = s1
        } else {
          peg$currPos = s0
          s0 = peg$c2
        }
      } else {
        peg$currPos = s0
        s0 = peg$c2
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 }

      return s0
    }

    function PARSEMULTILINE_STRING_CHAR () {
      let s0, s1, s2

      const key = peg$currPos * 49 + 20
      const cached = peg$cache[key]

      if (cached) {
        peg$currPos = cached.nextPos
        return cached.result
      }

      s0 = ESCAPED()
      if (s0 === peg$FAILED) {
        s0 = PARSEMULTILINE_STRING_DELIM()
        if (s0 === peg$FAILED) {
          s0 = peg$currPos
          s1 = peg$currPos
          peg$silentFails++
          if (input.substr(peg$currPos, 3) === peg$c23) {
            s2 = peg$c23
            peg$currPos += 3
          } else {
            s2 = peg$FAILED
            if (peg$silentFails === 0) { peg$fail(peg$c24) }
          }
          peg$silentFails--
          if (s2 === peg$FAILED) {
            s1 = peg$c5
          } else {
            peg$currPos = s1
            s1 = peg$c2
          }
          if (s1 !== peg$FAILED) {
            if (input.length > peg$currPos) {
              s2 = input.charAt(peg$currPos)
              peg$currPos++
            } else {
              s2 = peg$FAILED
              if (peg$silentFails === 0) { peg$fail(peg$c6) }
            }
            if (s2 !== peg$FAILED) {
              peg$reportedPos = s0
              s1 = peg$c34(s2)
              s0 = s1
            } else {
              peg$currPos = s0
              s0 = peg$c2
            }
          } else {
            peg$currPos = s0
            s0 = peg$c2
          }
        }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 }

      return s0
    }

    function PARSEMULTILINE_STRING_DELIM () {
      let s0, s1, s2, s3, s4

      const key = peg$currPos * 49 + 21
      const cached = peg$cache[key]

      if (cached) {
        peg$currPos = cached.nextPos
        return cached.result
      }

      s0 = peg$currPos
      if (input.charCodeAt(peg$currPos) === 92) {
        s1 = peg$c35
        peg$currPos++
      } else {
        s1 = peg$FAILED
        if (peg$silentFails === 0) { peg$fail(peg$c36) }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseNL()
        if (s2 !== peg$FAILED) {
          s3 = []
          s4 = peg$parseNLS()
          while (s4 !== peg$FAILED) {
            s3.push(s4)
            s4 = peg$parseNLS()
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0
            s1 = peg$c37()
            s0 = s1
          } else {
            peg$currPos = s0
            s0 = peg$c2
          }
        } else {
          peg$currPos = s0
          s0 = peg$c2
        }
      } else {
        peg$currPos = s0
        s0 = peg$c2
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 }

      return s0
    }

    function PARSEMULTILINE_LITERAL_CHAR () {
      let s0, s1, s2

      const key = peg$currPos * 49 + 22
      const cached = peg$cache[key]

      if (cached) {
        peg$currPos = cached.nextPos
        return cached.result
      }

      s0 = peg$currPos
      s1 = peg$currPos
      peg$silentFails++
      if (input.substr(peg$currPos, 3) === peg$c29) {
        s2 = peg$c29
        peg$currPos += 3
      } else {
        s2 = peg$FAILED
        if (peg$silentFails === 0) { peg$fail(peg$c30) }
      }
      peg$silentFails--
      if (s2 === peg$FAILED) {
        s1 = peg$c5
      } else {
        peg$currPos = s1
        s1 = peg$c2
      }
      if (s1 !== peg$FAILED) {
        if (input.length > peg$currPos) {
          s2 = input.charAt(peg$currPos)
          peg$currPos++
        } else {
          s2 = peg$FAILED
          if (peg$silentFails === 0) { peg$fail(peg$c6) }
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0
          s1 = peg$c33(s2)
          s0 = s1
        } else {
          peg$currPos = s0
          s0 = peg$c2
        }
      } else {
        peg$currPos = s0
        s0 = peg$c2
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 }

      return s0
    }

    function peg$parsefloat () {
      let s0, s1, s2, s3

      const key = peg$currPos * 49 + 23
      const cached = peg$cache[key]

      if (cached) {
        peg$currPos = cached.nextPos
        return cached.result
      }

      s0 = peg$currPos
      s1 = PARSEFLOAT_TEXT()
      if (s1 === peg$FAILED) {
        s1 = PARSEINTEGER_TEXT()
      }
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 101) {
          s2 = peg$c38
          peg$currPos++
        } else {
          s2 = peg$FAILED
          if (peg$silentFails === 0) { peg$fail(peg$c39) }
        }
        if (s2 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 69) {
            s2 = peg$c40
            peg$currPos++
          } else {
            s2 = peg$FAILED
            if (peg$silentFails === 0) { peg$fail(peg$c41) }
          }
        }
        if (s2 !== peg$FAILED) {
          s3 = PARSEINTEGER_TEXT()
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0
            s1 = peg$c42(s1, s3)
            s0 = s1
          } else {
            peg$currPos = s0
            s0 = peg$c2
          }
        } else {
          peg$currPos = s0
          s0 = peg$c2
        }
      } else {
        peg$currPos = s0
        s0 = peg$c2
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos
        s1 = PARSEFLOAT_TEXT()
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0
          s1 = peg$c43(s1)
        }
        s0 = s1
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 }

      return s0
    }

    function PARSEFLOAT_TEXT () {
      let s0, s1, s2, s3, s4, s5

      const key = peg$currPos * 49 + 24
      const cached = peg$cache[key]

      if (cached) {
        peg$currPos = cached.nextPos
        return cached.result
      }

      s0 = peg$currPos
      if (input.charCodeAt(peg$currPos) === 43) {
        s1 = peg$c44
        peg$currPos++
      } else {
        s1 = peg$FAILED
        if (peg$silentFails === 0) { peg$fail(peg$c45) }
      }
      if (s1 === peg$FAILED) {
        s1 = peg$c25
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos
        s3 = peg$parseDIGITS()
        if (s3 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 46) {
            s4 = peg$c16
            peg$currPos++
          } else {
            s4 = peg$FAILED
            if (peg$silentFails === 0) { peg$fail(peg$c17) }
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parseDIGITS()
            if (s5 !== peg$FAILED) {
              s3 = [s3, s4, s5]
              s2 = s3
            } else {
              peg$currPos = s2
              s2 = peg$c2
            }
          } else {
            peg$currPos = s2
            s2 = peg$c2
          }
        } else {
          peg$currPos = s2
          s2 = peg$c2
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0
          s1 = peg$c46(s2)
          s0 = s1
        } else {
          peg$currPos = s0
          s0 = peg$c2
        }
      } else {
        peg$currPos = s0
        s0 = peg$c2
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos
        if (input.charCodeAt(peg$currPos) === 45) {
          s1 = peg$c47
          peg$currPos++
        } else {
          s1 = peg$FAILED
          if (peg$silentFails === 0) { peg$fail(peg$c48) }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$currPos
          s3 = peg$parseDIGITS()
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 46) {
              s4 = peg$c16
              peg$currPos++
            } else {
              s4 = peg$FAILED
              if (peg$silentFails === 0) { peg$fail(peg$c17) }
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parseDIGITS()
              if (s5 !== peg$FAILED) {
                s3 = [s3, s4, s5]
                s2 = s3
              } else {
                peg$currPos = s2
                s2 = peg$c2
              }
            } else {
              peg$currPos = s2
              s2 = peg$c2
            }
          } else {
            peg$currPos = s2
            s2 = peg$c2
          }
          if (s2 !== peg$FAILED) {
            peg$reportedPos = s0
            s1 = peg$c49(s2)
            s0 = s1
          } else {
            peg$currPos = s0
            s0 = peg$c2
          }
        } else {
          peg$currPos = s0
          s0 = peg$c2
        }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 }

      return s0
    }

    function peg$parseinteger () {
      let s0, s1

      const key = peg$currPos * 49 + 25
      const cached = peg$cache[key]

      if (cached) {
        peg$currPos = cached.nextPos
        return cached.result
      }

      s0 = peg$currPos
      s1 = PARSEINTEGER_TEXT()
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0
        s1 = peg$c50(s1)
      }
      s0 = s1

      peg$cache[key] = { nextPos: peg$currPos, result: s0 }

      return s0
    }

    function PARSEINTEGER_TEXT () {
      let s0, s1, s2, s3, s4

      const key = peg$currPos * 49 + 26
      const cached = peg$cache[key]

      if (cached) {
        peg$currPos = cached.nextPos
        return cached.result
      }

      s0 = peg$currPos
      if (input.charCodeAt(peg$currPos) === 43) {
        s1 = peg$c44
        peg$currPos++
      } else {
        s1 = peg$FAILED
        if (peg$silentFails === 0) { peg$fail(peg$c45) }
      }
      if (s1 === peg$FAILED) {
        s1 = peg$c25
      }
      if (s1 !== peg$FAILED) {
        s2 = []
        s3 = DIGIT_OR_UNDER()
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3)
            s3 = DIGIT_OR_UNDER()
          }
        } else {
          s2 = peg$c2
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$currPos
          peg$silentFails++
          if (input.charCodeAt(peg$currPos) === 46) {
            s4 = peg$c16
            peg$currPos++
          } else {
            s4 = peg$FAILED
            if (peg$silentFails === 0) { peg$fail(peg$c17) }
          }
          peg$silentFails--
          if (s4 === peg$FAILED) {
            s3 = peg$c5
          } else {
            peg$currPos = s3
            s3 = peg$c2
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0
            s1 = peg$c46(s2)
            s0 = s1
          } else {
            peg$currPos = s0
            s0 = peg$c2
          }
        } else {
          peg$currPos = s0
          s0 = peg$c2
        }
      } else {
        peg$currPos = s0
        s0 = peg$c2
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos
        if (input.charCodeAt(peg$currPos) === 45) {
          s1 = peg$c47
          peg$currPos++
        } else {
          s1 = peg$FAILED
          if (peg$silentFails === 0) { peg$fail(peg$c48) }
        }
        if (s1 !== peg$FAILED) {
          s2 = []
          s3 = DIGIT_OR_UNDER()
          if (s3 !== peg$FAILED) {
            while (s3 !== peg$FAILED) {
              s2.push(s3)
              s3 = DIGIT_OR_UNDER()
            }
          } else {
            s2 = peg$c2
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$currPos
            peg$silentFails++
            if (input.charCodeAt(peg$currPos) === 46) {
              s4 = peg$c16
              peg$currPos++
            } else {
              s4 = peg$FAILED
              if (peg$silentFails === 0) { peg$fail(peg$c17) }
            }
            peg$silentFails--
            if (s4 === peg$FAILED) {
              s3 = peg$c5
            } else {
              peg$currPos = s3
              s3 = peg$c2
            }
            if (s3 !== peg$FAILED) {
              peg$reportedPos = s0
              s1 = peg$c49(s2)
              s0 = s1
            } else {
              peg$currPos = s0
              s0 = peg$c2
            }
          } else {
            peg$currPos = s0
            s0 = peg$c2
          }
        } else {
          peg$currPos = s0
          s0 = peg$c2
        }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 }

      return s0
    }

    function peg$parseboolean () {
      let s0, s1

      const key = peg$currPos * 49 + 27
      const cached = peg$cache[key]

      if (cached) {
        peg$currPos = cached.nextPos
        return cached.result
      }

      s0 = peg$currPos
      if (input.substr(peg$currPos, 4) === peg$c51) {
        s1 = peg$c51
        peg$currPos += 4
      } else {
        s1 = peg$FAILED
        if (peg$silentFails === 0) { peg$fail(peg$c52) }
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0
        s1 = peg$c53()
      }
      s0 = s1
      if (s0 === peg$FAILED) {
        s0 = peg$currPos
        if (input.substr(peg$currPos, 5) === peg$c54) {
          s1 = peg$c54
          peg$currPos += 5
        } else {
          s1 = peg$FAILED
          if (peg$silentFails === 0) { peg$fail(peg$c55) }
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0
          s1 = peg$c56()
        }
        s0 = s1
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 }

      return s0
    }

    function peg$parsearray () {
      let s0, s1, s2, s3, s4

      const key = peg$currPos * 49 + 28
      const cached = peg$cache[key]

      if (cached) {
        peg$currPos = cached.nextPos
        return cached.result
      }

      s0 = peg$currPos
      if (input.charCodeAt(peg$currPos) === 91) {
        s1 = peg$c7
        peg$currPos++
      } else {
        s1 = peg$FAILED
        if (peg$silentFails === 0) { peg$fail(peg$c8) }
      }
      if (s1 !== peg$FAILED) {
        s2 = []
        s3 = PARSEARRAY_SEP()
        while (s3 !== peg$FAILED) {
          s2.push(s3)
          s3 = PARSEARRAY_SEP()
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 93) {
            s3 = peg$c9
            peg$currPos++
          } else {
            s3 = peg$FAILED
            if (peg$silentFails === 0) { peg$fail(peg$c10) }
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0
            s1 = peg$c57()
            s0 = s1
          } else {
            peg$currPos = s0
            s0 = peg$c2
          }
        } else {
          peg$currPos = s0
          s0 = peg$c2
        }
      } else {
        peg$currPos = s0
        s0 = peg$c2
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos
        if (input.charCodeAt(peg$currPos) === 91) {
          s1 = peg$c7
          peg$currPos++
        } else {
          s1 = peg$FAILED
          if (peg$silentFails === 0) { peg$fail(peg$c8) }
        }
        if (s1 !== peg$FAILED) {
          s2 = PARSEARRAY_VALUE()
          if (s2 === peg$FAILED) {
            s2 = peg$c25
          }
          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 93) {
              s3 = peg$c9
              peg$currPos++
            } else {
              s3 = peg$FAILED
              if (peg$silentFails === 0) { peg$fail(peg$c10) }
            }
            if (s3 !== peg$FAILED) {
              peg$reportedPos = s0
              s1 = peg$c58(s2)
              s0 = s1
            } else {
              peg$currPos = s0
              s0 = peg$c2
            }
          } else {
            peg$currPos = s0
            s0 = peg$c2
          }
        } else {
          peg$currPos = s0
          s0 = peg$c2
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos
          if (input.charCodeAt(peg$currPos) === 91) {
            s1 = peg$c7
            peg$currPos++
          } else {
            s1 = peg$FAILED
            if (peg$silentFails === 0) { peg$fail(peg$c8) }
          }
          if (s1 !== peg$FAILED) {
            s2 = []
            s3 = PARSEARRAY_VALUE_LIST()
            if (s3 !== peg$FAILED) {
              while (s3 !== peg$FAILED) {
                s2.push(s3)
                s3 = PARSEARRAY_VALUE_LIST()
              }
            } else {
              s2 = peg$c2
            }
            if (s2 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 93) {
                s3 = peg$c9
                peg$currPos++
              } else {
                s3 = peg$FAILED
                if (peg$silentFails === 0) { peg$fail(peg$c10) }
              }
              if (s3 !== peg$FAILED) {
                peg$reportedPos = s0
                s1 = peg$c59(s2)
                s0 = s1
              } else {
                peg$currPos = s0
                s0 = peg$c2
              }
            } else {
              peg$currPos = s0
              s0 = peg$c2
            }
          } else {
            peg$currPos = s0
            s0 = peg$c2
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos
            if (input.charCodeAt(peg$currPos) === 91) {
              s1 = peg$c7
              peg$currPos++
            } else {
              s1 = peg$FAILED
              if (peg$silentFails === 0) { peg$fail(peg$c8) }
            }
            if (s1 !== peg$FAILED) {
              s2 = []
              s3 = PARSEARRAY_VALUE_LIST()
              if (s3 !== peg$FAILED) {
                while (s3 !== peg$FAILED) {
                  s2.push(s3)
                  s3 = PARSEARRAY_VALUE_LIST()
                }
              } else {
                s2 = peg$c2
              }
              if (s2 !== peg$FAILED) {
                s3 = PARSEARRAY_VALUE()
                if (s3 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 93) {
                    s4 = peg$c9
                    peg$currPos++
                  } else {
                    s4 = peg$FAILED
                    if (peg$silentFails === 0) { peg$fail(peg$c10) }
                  }
                  if (s4 !== peg$FAILED) {
                    peg$reportedPos = s0
                    s1 = peg$c60(s2, s3)
                    s0 = s1
                  } else {
                    peg$currPos = s0
                    s0 = peg$c2
                  }
                } else {
                  peg$currPos = s0
                  s0 = peg$c2
                }
              } else {
                peg$currPos = s0
                s0 = peg$c2
              }
            } else {
              peg$currPos = s0
              s0 = peg$c2
            }
          }
        }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 }

      return s0
    }

    function PARSEARRAY_VALUE () {
      let s0, s1, s2, s3, s4

      const key = peg$currPos * 49 + 29
      const cached = peg$cache[key]

      if (cached) {
        peg$currPos = cached.nextPos
        return cached.result
      }

      s0 = peg$currPos
      s1 = []
      s2 = PARSEARRAY_SEP()
      while (s2 !== peg$FAILED) {
        s1.push(s2)
        s2 = PARSEARRAY_SEP()
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsevalue()
        if (s2 !== peg$FAILED) {
          s3 = []
          s4 = PARSEARRAY_SEP()
          while (s4 !== peg$FAILED) {
            s3.push(s4)
            s4 = PARSEARRAY_SEP()
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0
            s1 = peg$c61(s2)
            s0 = s1
          } else {
            peg$currPos = s0
            s0 = peg$c2
          }
        } else {
          peg$currPos = s0
          s0 = peg$c2
        }
      } else {
        peg$currPos = s0
        s0 = peg$c2
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 }

      return s0
    }

    function PARSEARRAY_VALUE_LIST () {
      let s0, s1, s2, s3, s4, s5, s6

      const key = peg$currPos * 49 + 30
      const cached = peg$cache[key]

      if (cached) {
        peg$currPos = cached.nextPos
        return cached.result
      }

      s0 = peg$currPos
      s1 = []
      s2 = PARSEARRAY_SEP()
      while (s2 !== peg$FAILED) {
        s1.push(s2)
        s2 = PARSEARRAY_SEP()
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsevalue()
        if (s2 !== peg$FAILED) {
          s3 = []
          s4 = PARSEARRAY_SEP()
          while (s4 !== peg$FAILED) {
            s3.push(s4)
            s4 = PARSEARRAY_SEP()
          }
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 44) {
              s4 = peg$c62
              peg$currPos++
            } else {
              s4 = peg$FAILED
              if (peg$silentFails === 0) { peg$fail(peg$c63) }
            }
            if (s4 !== peg$FAILED) {
              s5 = []
              s6 = PARSEARRAY_SEP()
              while (s6 !== peg$FAILED) {
                s5.push(s6)
                s6 = PARSEARRAY_SEP()
              }
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0
                s1 = peg$c61(s2)
                s0 = s1
              } else {
                peg$currPos = s0
                s0 = peg$c2
              }
            } else {
              peg$currPos = s0
              s0 = peg$c2
            }
          } else {
            peg$currPos = s0
            s0 = peg$c2
          }
        } else {
          peg$currPos = s0
          s0 = peg$c2
        }
      } else {
        peg$currPos = s0
        s0 = peg$c2
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 }

      return s0
    }

    function PARSEARRAY_SEP () {
      let s0

      const key = peg$currPos * 49 + 31
      const cached = peg$cache[key]

      if (cached) {
        peg$currPos = cached.nextPos
        return cached.result
      }

      s0 = peg$parseS()
      if (s0 === peg$FAILED) {
        s0 = peg$parseNL()
        if (s0 === peg$FAILED) {
          s0 = peg$parsecomment()
        }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 }

      return s0
    }

    function PARSEINLINE_TABLE () {
      let s0, s1, s2, s3, s4, s5

      const key = peg$currPos * 49 + 32
      const cached = peg$cache[key]

      if (cached) {
        peg$currPos = cached.nextPos
        return cached.result
      }

      s0 = peg$currPos
      if (input.charCodeAt(peg$currPos) === 123) {
        s1 = peg$c64
        peg$currPos++
      } else {
        s1 = peg$FAILED
        if (peg$silentFails === 0) { peg$fail(peg$c65) }
      }
      if (s1 !== peg$FAILED) {
        s2 = []
        s3 = peg$parseS()
        while (s3 !== peg$FAILED) {
          s2.push(s3)
          s3 = peg$parseS()
        }
        if (s2 !== peg$FAILED) {
          s3 = []
          s4 = PARSELINE_TABLE_ASSIGNMENT()
          while (s4 !== peg$FAILED) {
            s3.push(s4)
            s4 = PARSELINE_TABLE_ASSIGNMENT()
          }
          if (s3 !== peg$FAILED) {
            s4 = []
            s5 = peg$parseS()
            while (s5 !== peg$FAILED) {
              s4.push(s5)
              s5 = peg$parseS()
            }
            if (s4 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 125) {
                s5 = peg$c66
                peg$currPos++
              } else {
                s5 = peg$FAILED
                if (peg$silentFails === 0) { peg$fail(peg$c67) }
              }
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0
                s1 = peg$c68(s3)
                s0 = s1
              } else {
                peg$currPos = s0
                s0 = peg$c2
              }
            } else {
              peg$currPos = s0
              s0 = peg$c2
            }
          } else {
            peg$currPos = s0
            s0 = peg$c2
          }
        } else {
          peg$currPos = s0
          s0 = peg$c2
        }
      } else {
        peg$currPos = s0
        s0 = peg$c2
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 }

      return s0
    }

    function PARSELINE_TABLE_ASSIGNMENT () {
      let s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10

      const key = peg$currPos * 49 + 33
      const cached = peg$cache[key]

      if (cached) {
        peg$currPos = cached.nextPos
        return cached.result
      }

      s0 = peg$currPos
      s1 = []
      s2 = peg$parseS()
      while (s2 !== peg$FAILED) {
        s1.push(s2)
        s2 = peg$parseS()
      }
      if (s1 !== peg$FAILED) {
        s2 = PARSEKEY()
        if (s2 !== peg$FAILED) {
          s3 = []
          s4 = peg$parseS()
          while (s4 !== peg$FAILED) {
            s3.push(s4)
            s4 = peg$parseS()
          }
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 61) {
              s4 = peg$c18
              peg$currPos++
            } else {
              s4 = peg$FAILED
              if (peg$silentFails === 0) { peg$fail(peg$c19) }
            }
            if (s4 !== peg$FAILED) {
              s5 = []
              s6 = peg$parseS()
              while (s6 !== peg$FAILED) {
                s5.push(s6)
                s6 = peg$parseS()
              }
              if (s5 !== peg$FAILED) {
                s6 = peg$parsevalue()
                if (s6 !== peg$FAILED) {
                  s7 = []
                  s8 = peg$parseS()
                  while (s8 !== peg$FAILED) {
                    s7.push(s8)
                    s8 = peg$parseS()
                  }
                  if (s7 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 44) {
                      s8 = peg$c62
                      peg$currPos++
                    } else {
                      s8 = peg$FAILED
                      if (peg$silentFails === 0) { peg$fail(peg$c63) }
                    }
                    if (s8 !== peg$FAILED) {
                      s9 = []
                      s10 = peg$parseS()
                      while (s10 !== peg$FAILED) {
                        s9.push(s10)
                        s10 = peg$parseS()
                      }
                      if (s9 !== peg$FAILED) {
                        peg$reportedPos = s0
                        s1 = peg$c69(s2, s6)
                        s0 = s1
                      } else {
                        peg$currPos = s0
                        s0 = peg$c2
                      }
                    } else {
                      peg$currPos = s0
                      s0 = peg$c2
                    }
                  } else {
                    peg$currPos = s0
                    s0 = peg$c2
                  }
                } else {
                  peg$currPos = s0
                  s0 = peg$c2
                }
              } else {
                peg$currPos = s0
                s0 = peg$c2
              }
            } else {
              peg$currPos = s0
              s0 = peg$c2
            }
          } else {
            peg$currPos = s0
            s0 = peg$c2
          }
        } else {
          peg$currPos = s0
          s0 = peg$c2
        }
      } else {
        peg$currPos = s0
        s0 = peg$c2
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos
        s1 = []
        s2 = peg$parseS()
        while (s2 !== peg$FAILED) {
          s1.push(s2)
          s2 = peg$parseS()
        }
        if (s1 !== peg$FAILED) {
          s2 = PARSEKEY()
          if (s2 !== peg$FAILED) {
            s3 = []
            s4 = peg$parseS()
            while (s4 !== peg$FAILED) {
              s3.push(s4)
              s4 = peg$parseS()
            }
            if (s3 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 61) {
                s4 = peg$c18
                peg$currPos++
              } else {
                s4 = peg$FAILED
                if (peg$silentFails === 0) { peg$fail(peg$c19) }
              }
              if (s4 !== peg$FAILED) {
                s5 = []
                s6 = peg$parseS()
                while (s6 !== peg$FAILED) {
                  s5.push(s6)
                  s6 = peg$parseS()
                }
                if (s5 !== peg$FAILED) {
                  s6 = peg$parsevalue()
                  if (s6 !== peg$FAILED) {
                    peg$reportedPos = s0
                    s1 = peg$c69(s2, s6)
                    s0 = s1
                  } else {
                    peg$currPos = s0
                    s0 = peg$c2
                  }
                } else {
                  peg$currPos = s0
                  s0 = peg$c2
                }
              } else {
                peg$currPos = s0
                s0 = peg$c2
              }
            } else {
              peg$currPos = s0
              s0 = peg$c2
            }
          } else {
            peg$currPos = s0
            s0 = peg$c2
          }
        } else {
          peg$currPos = s0
          s0 = peg$c2
        }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 }

      return s0
    }

    function peg$parsesecfragment () {
      let s0, s1, s2

      const key = peg$currPos * 49 + 34
      const cached = peg$cache[key]

      if (cached) {
        peg$currPos = cached.nextPos
        return cached.result
      }

      s0 = peg$currPos
      if (input.charCodeAt(peg$currPos) === 46) {
        s1 = peg$c16
        peg$currPos++
      } else {
        s1 = peg$FAILED
        if (peg$silentFails === 0) { peg$fail(peg$c17) }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseDIGITS()
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0
          s1 = peg$c70(s2)
          s0 = s1
        } else {
          peg$currPos = s0
          s0 = peg$c2
        }
      } else {
        peg$currPos = s0
        s0 = peg$c2
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 }

      return s0
    }

    function peg$parsedate () {
      let s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11

      const key = peg$currPos * 49 + 35
      const cached = peg$cache[key]

      if (cached) {
        peg$currPos = cached.nextPos
        return cached.result
      }

      s0 = peg$currPos
      s1 = peg$currPos
      s2 = DIGIT_OR_UNDER()
      if (s2 !== peg$FAILED) {
        s3 = DIGIT_OR_UNDER()
        if (s3 !== peg$FAILED) {
          s4 = DIGIT_OR_UNDER()
          if (s4 !== peg$FAILED) {
            s5 = DIGIT_OR_UNDER()
            if (s5 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 45) {
                s6 = peg$c47
                peg$currPos++
              } else {
                s6 = peg$FAILED
                if (peg$silentFails === 0) { peg$fail(peg$c48) }
              }
              if (s6 !== peg$FAILED) {
                s7 = DIGIT_OR_UNDER()
                if (s7 !== peg$FAILED) {
                  s8 = DIGIT_OR_UNDER()
                  if (s8 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 45) {
                      s9 = peg$c47
                      peg$currPos++
                    } else {
                      s9 = peg$FAILED
                      if (peg$silentFails === 0) { peg$fail(peg$c48) }
                    }
                    if (s9 !== peg$FAILED) {
                      s10 = DIGIT_OR_UNDER()
                      if (s10 !== peg$FAILED) {
                        s11 = DIGIT_OR_UNDER()
                        if (s11 !== peg$FAILED) {
                          s2 = [s2, s3, s4, s5, s6, s7, s8, s9, s10, s11]
                          s1 = s2
                        } else {
                          peg$currPos = s1
                          s1 = peg$c2
                        }
                      } else {
                        peg$currPos = s1
                        s1 = peg$c2
                      }
                    } else {
                      peg$currPos = s1
                      s1 = peg$c2
                    }
                  } else {
                    peg$currPos = s1
                    s1 = peg$c2
                  }
                } else {
                  peg$currPos = s1
                  s1 = peg$c2
                }
              } else {
                peg$currPos = s1
                s1 = peg$c2
              }
            } else {
              peg$currPos = s1
              s1 = peg$c2
            }
          } else {
            peg$currPos = s1
            s1 = peg$c2
          }
        } else {
          peg$currPos = s1
          s1 = peg$c2
        }
      } else {
        peg$currPos = s1
        s1 = peg$c2
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0
        s1 = peg$c71(s1)
      }
      s0 = s1

      peg$cache[key] = { nextPos: peg$currPos, result: s0 }

      return s0
    }

    function peg$parsetime () {
      let s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10

      const key = peg$currPos * 49 + 36
      const cached = peg$cache[key]

      if (cached) {
        peg$currPos = cached.nextPos
        return cached.result
      }

      s0 = peg$currPos
      s1 = peg$currPos
      s2 = DIGIT_OR_UNDER()
      if (s2 !== peg$FAILED) {
        s3 = DIGIT_OR_UNDER()
        if (s3 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 58) {
            s4 = peg$c72
            peg$currPos++
          } else {
            s4 = peg$FAILED
            if (peg$silentFails === 0) { peg$fail(peg$c73) }
          }
          if (s4 !== peg$FAILED) {
            s5 = DIGIT_OR_UNDER()
            if (s5 !== peg$FAILED) {
              s6 = DIGIT_OR_UNDER()
              if (s6 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 58) {
                  s7 = peg$c72
                  peg$currPos++
                } else {
                  s7 = peg$FAILED
                  if (peg$silentFails === 0) { peg$fail(peg$c73) }
                }
                if (s7 !== peg$FAILED) {
                  s8 = DIGIT_OR_UNDER()
                  if (s8 !== peg$FAILED) {
                    s9 = DIGIT_OR_UNDER()
                    if (s9 !== peg$FAILED) {
                      s10 = peg$parsesecfragment()
                      if (s10 === peg$FAILED) {
                        s10 = peg$c25
                      }
                      if (s10 !== peg$FAILED) {
                        s2 = [s2, s3, s4, s5, s6, s7, s8, s9, s10]
                        s1 = s2
                      } else {
                        peg$currPos = s1
                        s1 = peg$c2
                      }
                    } else {
                      peg$currPos = s1
                      s1 = peg$c2
                    }
                  } else {
                    peg$currPos = s1
                    s1 = peg$c2
                  }
                } else {
                  peg$currPos = s1
                  s1 = peg$c2
                }
              } else {
                peg$currPos = s1
                s1 = peg$c2
              }
            } else {
              peg$currPos = s1
              s1 = peg$c2
            }
          } else {
            peg$currPos = s1
            s1 = peg$c2
          }
        } else {
          peg$currPos = s1
          s1 = peg$c2
        }
      } else {
        peg$currPos = s1
        s1 = peg$c2
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0
        s1 = peg$c74(s1)
      }
      s0 = s1

      peg$cache[key] = { nextPos: peg$currPos, result: s0 }

      return s0
    }

    function PARSETIME_WITH_OFFSET () {
      let s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15, s16

      const key = peg$currPos * 49 + 37
      const cached = peg$cache[key]

      if (cached) {
        peg$currPos = cached.nextPos
        return cached.result
      }

      s0 = peg$currPos
      s1 = peg$currPos
      s2 = DIGIT_OR_UNDER()
      if (s2 !== peg$FAILED) {
        s3 = DIGIT_OR_UNDER()
        if (s3 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 58) {
            s4 = peg$c72
            peg$currPos++
          } else {
            s4 = peg$FAILED
            if (peg$silentFails === 0) { peg$fail(peg$c73) }
          }
          if (s4 !== peg$FAILED) {
            s5 = DIGIT_OR_UNDER()
            if (s5 !== peg$FAILED) {
              s6 = DIGIT_OR_UNDER()
              if (s6 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 58) {
                  s7 = peg$c72
                  peg$currPos++
                } else {
                  s7 = peg$FAILED
                  if (peg$silentFails === 0) { peg$fail(peg$c73) }
                }
                if (s7 !== peg$FAILED) {
                  s8 = DIGIT_OR_UNDER()
                  if (s8 !== peg$FAILED) {
                    s9 = DIGIT_OR_UNDER()
                    if (s9 !== peg$FAILED) {
                      s10 = peg$parsesecfragment()
                      if (s10 === peg$FAILED) {
                        s10 = peg$c25
                      }
                      if (s10 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 45) {
                          s11 = peg$c47
                          peg$currPos++
                        } else {
                          s11 = peg$FAILED
                          if (peg$silentFails === 0) { peg$fail(peg$c48) }
                        }
                        if (s11 === peg$FAILED) {
                          if (input.charCodeAt(peg$currPos) === 43) {
                            s11 = peg$c44
                            peg$currPos++
                          } else {
                            s11 = peg$FAILED
                            if (peg$silentFails === 0) { peg$fail(peg$c45) }
                          }
                        }
                        if (s11 !== peg$FAILED) {
                          s12 = DIGIT_OR_UNDER()
                          if (s12 !== peg$FAILED) {
                            s13 = DIGIT_OR_UNDER()
                            if (s13 !== peg$FAILED) {
                              if (input.charCodeAt(peg$currPos) === 58) {
                                s14 = peg$c72
                                peg$currPos++
                              } else {
                                s14 = peg$FAILED
                                if (peg$silentFails === 0) { peg$fail(peg$c73) }
                              }
                              if (s14 !== peg$FAILED) {
                                s15 = DIGIT_OR_UNDER()
                                if (s15 !== peg$FAILED) {
                                  s16 = DIGIT_OR_UNDER()
                                  if (s16 !== peg$FAILED) {
                                    s2 = [s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15, s16]
                                    s1 = s2
                                  } else {
                                    peg$currPos = s1
                                    s1 = peg$c2
                                  }
                                } else {
                                  peg$currPos = s1
                                  s1 = peg$c2
                                }
                              } else {
                                peg$currPos = s1
                                s1 = peg$c2
                              }
                            } else {
                              peg$currPos = s1
                              s1 = peg$c2
                            }
                          } else {
                            peg$currPos = s1
                            s1 = peg$c2
                          }
                        } else {
                          peg$currPos = s1
                          s1 = peg$c2
                        }
                      } else {
                        peg$currPos = s1
                        s1 = peg$c2
                      }
                    } else {
                      peg$currPos = s1
                      s1 = peg$c2
                    }
                  } else {
                    peg$currPos = s1
                    s1 = peg$c2
                  }
                } else {
                  peg$currPos = s1
                  s1 = peg$c2
                }
              } else {
                peg$currPos = s1
                s1 = peg$c2
              }
            } else {
              peg$currPos = s1
              s1 = peg$c2
            }
          } else {
            peg$currPos = s1
            s1 = peg$c2
          }
        } else {
          peg$currPos = s1
          s1 = peg$c2
        }
      } else {
        peg$currPos = s1
        s1 = peg$c2
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0
        s1 = peg$c74(s1)
      }
      s0 = s1

      peg$cache[key] = { nextPos: peg$currPos, result: s0 }

      return s0
    }

    function peg$parsedatetime () {
      let s0, s1, s2, s3, s4

      const key = peg$currPos * 49 + 38
      const cached = peg$cache[key]

      if (cached) {
        peg$currPos = cached.nextPos
        return cached.result
      }

      s0 = peg$currPos
      s1 = peg$parsedate()
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 84) {
          s2 = peg$c75
          peg$currPos++
        } else {
          s2 = peg$FAILED
          if (peg$silentFails === 0) { peg$fail(peg$c76) }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsetime()
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 90) {
              s4 = peg$c77
              peg$currPos++
            } else {
              s4 = peg$FAILED
              if (peg$silentFails === 0) { peg$fail(peg$c78) }
            }
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0
              s1 = peg$c79(s1, s3)
              s0 = s1
            } else {
              peg$currPos = s0
              s0 = peg$c2
            }
          } else {
            peg$currPos = s0
            s0 = peg$c2
          }
        } else {
          peg$currPos = s0
          s0 = peg$c2
        }
      } else {
        peg$currPos = s0
        s0 = peg$c2
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos
        s1 = peg$parsedate()
        if (s1 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 84) {
            s2 = peg$c75
            peg$currPos++
          } else {
            s2 = peg$FAILED
            if (peg$silentFails === 0) { peg$fail(peg$c76) }
          }
          if (s2 !== peg$FAILED) {
            s3 = PARSETIME_WITH_OFFSET()
            if (s3 !== peg$FAILED) {
              peg$reportedPos = s0
              s1 = peg$c80(s1, s3)
              s0 = s1
            } else {
              peg$currPos = s0
              s0 = peg$c2
            }
          } else {
            peg$currPos = s0
            s0 = peg$c2
          }
        } else {
          peg$currPos = s0
          s0 = peg$c2
        }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 }

      return s0
    }

    function peg$parseS () {
      let s0

      const key = peg$currPos * 49 + 39
      const cached = peg$cache[key]

      if (cached) {
        peg$currPos = cached.nextPos
        return cached.result
      }

      if (peg$c81.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos)
        peg$currPos++
      } else {
        s0 = peg$FAILED
        if (peg$silentFails === 0) { peg$fail(peg$c82) }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 }

      return s0
    }

    function peg$parseNL () {
      let s0, s1, s2

      const key = peg$currPos * 49 + 40
      const cached = peg$cache[key]

      if (cached) {
        peg$currPos = cached.nextPos
        return cached.result
      }

      if (input.charCodeAt(peg$currPos) === 10) {
        s0 = peg$c83
        peg$currPos++
      } else {
        s0 = peg$FAILED
        if (peg$silentFails === 0) { peg$fail(peg$c84) }
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos
        if (input.charCodeAt(peg$currPos) === 13) {
          s1 = peg$c85
          peg$currPos++
        } else {
          s1 = peg$FAILED
          if (peg$silentFails === 0) { peg$fail(peg$c86) }
        }
        if (s1 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 10) {
            s2 = peg$c83
            peg$currPos++
          } else {
            s2 = peg$FAILED
            if (peg$silentFails === 0) { peg$fail(peg$c84) }
          }
          if (s2 !== peg$FAILED) {
            s1 = [s1, s2]
            s0 = s1
          } else {
            peg$currPos = s0
            s0 = peg$c2
          }
        } else {
          peg$currPos = s0
          s0 = peg$c2
        }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 }

      return s0
    }

    function peg$parseNLS () {
      let s0

      const key = peg$currPos * 49 + 41
      const cached = peg$cache[key]

      if (cached) {
        peg$currPos = cached.nextPos
        return cached.result
      }

      s0 = peg$parseNL()
      if (s0 === peg$FAILED) {
        s0 = peg$parseS()
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 }

      return s0
    }

    function peg$parseEOF () {
      let s0, s1

      const key = peg$currPos * 49 + 42
      const cached = peg$cache[key]

      if (cached) {
        peg$currPos = cached.nextPos
        return cached.result
      }

      s0 = peg$currPos
      peg$silentFails++
      if (input.length > peg$currPos) {
        s1 = input.charAt(peg$currPos)
        peg$currPos++
      } else {
        s1 = peg$FAILED
        if (peg$silentFails === 0) { peg$fail(peg$c6) }
      }
      peg$silentFails--
      if (s1 === peg$FAILED) {
        s0 = peg$c5
      } else {
        peg$currPos = s0
        s0 = peg$c2
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 }

      return s0
    }

    function peg$parseHEX () {
      let s0

      const key = peg$currPos * 49 + 43
      const cached = peg$cache[key]

      if (cached) {
        peg$currPos = cached.nextPos
        return cached.result
      }

      if (peg$c87.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos)
        peg$currPos++
      } else {
        s0 = peg$FAILED
        if (peg$silentFails === 0) { peg$fail(peg$c88) }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 }

      return s0
    }

    function DIGIT_OR_UNDER () {
      let s0, s1

      const key = peg$currPos * 49 + 44
      const cached = peg$cache[key]

      if (cached) {
        peg$currPos = cached.nextPos
        return cached.result
      }

      if (peg$c89.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos)
        peg$currPos++
      } else {
        s0 = peg$FAILED
        if (peg$silentFails === 0) { peg$fail(peg$c90) }
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos
        if (input.charCodeAt(peg$currPos) === 95) {
          s1 = peg$c91
          peg$currPos++
        } else {
          s1 = peg$FAILED
          if (peg$silentFails === 0) { peg$fail(peg$c92) }
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0
          s1 = peg$c93()
        }
        s0 = s1
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 }

      return s0
    }

    function ASCII_BASIC () {
      let s0

      const key = peg$currPos * 49 + 45
      const cached = peg$cache[key]

      if (cached) {
        peg$currPos = cached.nextPos
        return cached.result
      }

      if (peg$c94.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos)
        peg$currPos++
      } else {
        s0 = peg$FAILED
        if (peg$silentFails === 0) { peg$fail(peg$c95) }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 }

      return s0
    }

    function peg$parseDIGITS () {
      let s0, s1, s2

      const key = peg$currPos * 49 + 46
      const cached = peg$cache[key]

      if (cached) {
        peg$currPos = cached.nextPos
        return cached.result
      }

      s0 = peg$currPos
      s1 = []
      s2 = DIGIT_OR_UNDER()
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2)
          s2 = DIGIT_OR_UNDER()
        }
      } else {
        s1 = peg$c2
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0
        s1 = peg$c96(s1)
      }
      s0 = s1

      peg$cache[key] = { nextPos: peg$currPos, result: s0 }

      return s0
    }

    function ESCAPED () {
      let s0, s1

      const key = peg$currPos * 49 + 47
      const cached = peg$cache[key]

      if (cached) {
        peg$currPos = cached.nextPos
        return cached.result
      }

      s0 = peg$currPos
      if (input.substr(peg$currPos, 2) === peg$c97) {
        s1 = peg$c97
        peg$currPos += 2
      } else {
        s1 = peg$FAILED
        if (peg$silentFails === 0) { peg$fail(peg$c98) }
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0
        s1 = peg$c99()
      }
      s0 = s1
      if (s0 === peg$FAILED) {
        s0 = peg$currPos
        if (input.substr(peg$currPos, 2) === peg$c100) {
          s1 = peg$c100
          peg$currPos += 2
        } else {
          s1 = peg$FAILED
          if (peg$silentFails === 0) { peg$fail(peg$c101) }
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0
          s1 = peg$c102()
        }
        s0 = s1
        if (s0 === peg$FAILED) {
          s0 = peg$currPos
          if (input.substr(peg$currPos, 2) === peg$c103) {
            s1 = peg$c103
            peg$currPos += 2
          } else {
            s1 = peg$FAILED
            if (peg$silentFails === 0) { peg$fail(peg$c104) }
          }
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0
            s1 = peg$c105()
          }
          s0 = s1
          if (s0 === peg$FAILED) {
            s0 = peg$currPos
            if (input.substr(peg$currPos, 2) === peg$c106) {
              s1 = peg$c106
              peg$currPos += 2
            } else {
              s1 = peg$FAILED
              if (peg$silentFails === 0) { peg$fail(peg$c107) }
            }
            if (s1 !== peg$FAILED) {
              peg$reportedPos = s0
              s1 = peg$c108()
            }
            s0 = s1
            if (s0 === peg$FAILED) {
              s0 = peg$currPos
              if (input.substr(peg$currPos, 2) === peg$c109) {
                s1 = peg$c109
                peg$currPos += 2
              } else {
                s1 = peg$FAILED
                if (peg$silentFails === 0) { peg$fail(peg$c110) }
              }
              if (s1 !== peg$FAILED) {
                peg$reportedPos = s0
                s1 = peg$c111()
              }
              s0 = s1
              if (s0 === peg$FAILED) {
                s0 = peg$currPos
                if (input.substr(peg$currPos, 2) === peg$c112) {
                  s1 = peg$c112
                  peg$currPos += 2
                } else {
                  s1 = peg$FAILED
                  if (peg$silentFails === 0) { peg$fail(peg$c113) }
                }
                if (s1 !== peg$FAILED) {
                  peg$reportedPos = s0
                  s1 = peg$c114()
                }
                s0 = s1
                if (s0 === peg$FAILED) {
                  s0 = peg$currPos
                  if (input.substr(peg$currPos, 2) === peg$c115) {
                    s1 = peg$c115
                    peg$currPos += 2
                  } else {
                    s1 = peg$FAILED
                    if (peg$silentFails === 0) { peg$fail(peg$c116) }
                  }
                  if (s1 !== peg$FAILED) {
                    peg$reportedPos = s0
                    s1 = peg$c117()
                  }
                  s0 = s1
                  if (s0 === peg$FAILED) {
                    s0 = ESCAPED_UNICODE()
                  }
                }
              }
            }
          }
        }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 }

      return s0
    }

    function ESCAPED_UNICODE () {
      let s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10

      const key = peg$currPos * 49 + 48
      const cached = peg$cache[key]

      if (cached) {
        peg$currPos = cached.nextPos
        return cached.result
      }

      s0 = peg$currPos
      if (input.substr(peg$currPos, 2) === peg$c118) {
        s1 = peg$c118
        peg$currPos += 2
      } else {
        s1 = peg$FAILED
        if (peg$silentFails === 0) { peg$fail(peg$c119) }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos
        s3 = peg$parseHEX()
        if (s3 !== peg$FAILED) {
          s4 = peg$parseHEX()
          if (s4 !== peg$FAILED) {
            s5 = peg$parseHEX()
            if (s5 !== peg$FAILED) {
              s6 = peg$parseHEX()
              if (s6 !== peg$FAILED) {
                s7 = peg$parseHEX()
                if (s7 !== peg$FAILED) {
                  s8 = peg$parseHEX()
                  if (s8 !== peg$FAILED) {
                    s9 = peg$parseHEX()
                    if (s9 !== peg$FAILED) {
                      s10 = peg$parseHEX()
                      if (s10 !== peg$FAILED) {
                        s3 = [s3, s4, s5, s6, s7, s8, s9, s10]
                        s2 = s3
                      } else {
                        peg$currPos = s2
                        s2 = peg$c2
                      }
                    } else {
                      peg$currPos = s2
                      s2 = peg$c2
                    }
                  } else {
                    peg$currPos = s2
                    s2 = peg$c2
                  }
                } else {
                  peg$currPos = s2
                  s2 = peg$c2
                }
              } else {
                peg$currPos = s2
                s2 = peg$c2
              }
            } else {
              peg$currPos = s2
              s2 = peg$c2
            }
          } else {
            peg$currPos = s2
            s2 = peg$c2
          }
        } else {
          peg$currPos = s2
          s2 = peg$c2
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0
          s1 = peg$c120(s2)
          s0 = s1
        } else {
          peg$currPos = s0
          s0 = peg$c2
        }
      } else {
        peg$currPos = s0
        s0 = peg$c2
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos
        if (input.substr(peg$currPos, 2) === peg$c121) {
          s1 = peg$c121
          peg$currPos += 2
        } else {
          s1 = peg$FAILED
          if (peg$silentFails === 0) { peg$fail(peg$c122) }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$currPos
          s3 = peg$parseHEX()
          if (s3 !== peg$FAILED) {
            s4 = peg$parseHEX()
            if (s4 !== peg$FAILED) {
              s5 = peg$parseHEX()
              if (s5 !== peg$FAILED) {
                s6 = peg$parseHEX()
                if (s6 !== peg$FAILED) {
                  s3 = [s3, s4, s5, s6]
                  s2 = s3
                } else {
                  peg$currPos = s2
                  s2 = peg$c2
                }
              } else {
                peg$currPos = s2
                s2 = peg$c2
              }
            } else {
              peg$currPos = s2
              s2 = peg$c2
            }
          } else {
            peg$currPos = s2
            s2 = peg$c2
          }
          if (s2 !== peg$FAILED) {
            peg$reportedPos = s0
            s1 = peg$c120(s2)
            s0 = s1
          } else {
            peg$currPos = s0
            s0 = peg$c2
          }
        } else {
          peg$currPos = s0
          s0 = peg$c2
        }
      }

      peg$cache[key] = { nextPos: peg$currPos, result: s0 }

      return s0
    }

    const nodes = []

    function genError (err, line, col) {
      const ex = new Error(err)
      ex.line = line
      ex.column = col
      throw ex
    }

    function addNode (node) {
      nodes.push(node)
    }

    function node (type, value, line, column, key) {
      const obj = { type: type, value: value, line: line(), column: column() }
      if (key) {
        obj.key = key
      }
      return obj
    }

    function convertCodePoint (str, line, col) {
      const num = parseInt('0x' + str)

      if (
        !isFinite(num) ||
            Math.floor(num) !== num ||
            num < 0 ||
            num > 0x10FFFF ||
            (num > 0xD7FF && num < 0xE000)
      ) {
        genError('Invalid Unicode escape code: ' + str, line, col)
      } else {
        return fromCodePoint(num)
      }
    }

    function fromCodePoint () {
      const MAX_SIZE = 0x4000
      const codeUnits = []
      let highSurrogate
      let lowSurrogate
      let index = -1
      const length = arguments.length
      if (!length) {
        return ''
      }
      let result = ''
      while (++index < length) {
        let codePoint = Number(arguments[index])
        if (codePoint <= 0xFFFF) {
          codeUnits.push(codePoint)
        } else {
          codePoint -= 0x10000
          highSurrogate = (codePoint >> 10) + 0xD800
          lowSurrogate = (codePoint % 0x400) + 0xDC00
          codeUnits.push(highSurrogate, lowSurrogate)
        }
        if (index + 1 === length || codeUnits.length > MAX_SIZE) {
          result += String.fromCharCode.apply(null, codeUnits)
          codeUnits.length = 0
        }
      }
      return result
    }

    const peg$result = peg$startRuleFunction()

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail({ type: 'end', description: 'end of input' })
      }

      throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos)
    }
  }

  return {
    SyntaxError: SyntaxError,
    parse: parse
  }
})()
