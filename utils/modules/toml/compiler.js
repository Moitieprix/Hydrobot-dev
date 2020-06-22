'use strict'

function compile (nodes) {
  let assignedPaths = []
  const valueAssignments = []
  let currentPath = ''
  const data = Object.create(null)
  let context = data

  return reduce(nodes)

  function reduce (nodes) {
    let node
    for (const element of nodes) {
      node = element
      switch (node.type) {
        case 'Assign':
          assign(node)
          break
        case 'ObjectPath':
          setPath(node)
          break
        case 'ArrayPath':
          addTableArray(node)
          break
      }
    }

    return data
  }

  function genError (err, line, col) {
    const ex = new Error(err)
    ex.line = line
    ex.column = col
    throw ex
  }

  function assign (node) {
    const key = node.key
    const value = node.value
    const line = node.line
    const column = node.column

    let fullPath
    if (currentPath) {
      fullPath = currentPath + '.' + key
    } else {
      fullPath = key
    }
    if (typeof context[key] !== 'undefined') {
      genError("Cannot redefine existing key '" + fullPath + "'.", line, column)
    }

    context[key] = reduceValueNode(value)

    if (!pathAssigned(fullPath)) {
      assignedPaths.push(fullPath)
      valueAssignments.push(fullPath)
    }
  }

  function pathAssigned (path) {
    return assignedPaths.indexOf(path) !== -1
  }

  function reduceValueNode (node) {
    if (node.type === 'Array') {
      return reduceArrayWithTypeChecking(node.value)
    } else if (node.type === 'InlineTable') {
      return reduceInlineTableNode(node.value)
    } else {
      return node.value
    }
  }

  function reduceInlineTableNode (values) {
    const obj = Object.create(null)
    for (const element of values) {
      const val = element
      if (val.value.type === 'InlineTable') {
        obj[val.key] = reduceInlineTableNode(val.value.value)
      } else if (val.type === 'InlineTableValue') {
        obj[val.key] = reduceValueNode(val.value)
      }
    }

    return obj
  }

  function setPath (node) {
    const path = node.value
    const quotedPath = path.map(quoteDottedString).join('.')
    const line = node.line
    const column = node.column

    if (pathAssigned(quotedPath)) {
      genError("Cannot redefine existing key '" + path + "'.", line, column)
    }
    assignedPaths.push(quotedPath)
    context = deepRef(data, path, Object.create(null), line, column)
    currentPath = path
  }

  function addTableArray (node) {
    const path = node.value
    const quotedPath = path.map(quoteDottedString).join('.')
    const line = node.line
    const column = node.column

    if (!pathAssigned(quotedPath)) {
      assignedPaths.push(quotedPath)
    }
    assignedPaths = assignedPaths.filter(function (p) {
      return p.indexOf(quotedPath) !== 0
    })
    assignedPaths.push(quotedPath)
    context = deepRef(data, path, [], line, column)
    currentPath = quotedPath

    if (context instanceof Array) {
      var newObj = Object.create(null)
      context.push(newObj)
      context = newObj
    } else {
      genError("Cannot redefine existing key '" + path + "'.", line, column)
    }
  }

  function deepRef (start, keys, value, line, column) {
    const traversed = []
    let traversedPath = ''
    let ctx = start

    for (var i = 0; i < keys.length; i++) {
      const key = keys[i]
      traversed.push(key)
      traversedPath = traversed.join('.')
      if (typeof ctx[key] === 'undefined') {
        if (i === keys.length - 1) {
          ctx[key] = value
        } else {
          ctx[key] = Object.create(null)
        }
      } else if (i !== keys.length - 1 && valueAssignments.indexOf(traversedPath) > -1) {
        genError("Cannot redefine existing key '" + traversedPath + "'.", line, column)
      }

      ctx = ctx[key]
      if (ctx instanceof Array && ctx.length && i < keys.length - 1) {
        ctx = ctx[ctx.length - 1]
      }
    }

    return ctx
  }

  function reduceArrayWithTypeChecking (array) {
    let firstType = null
    for (let i = 0; i < array.length; i++) {
      const node = array[i]
      if (firstType === null) {
        firstType = node.type
      } else {
        if (node.type !== firstType) {
          genError('Cannot add value of type ' + node.type + ' to array of type ' +
            firstType + '.', node.line, node.column)
        }
      }
    }

    return array.map(reduceValueNode)
  }

  function quoteDottedString (str) {
    if (str.indexOf('.') > -1) {
      return '"' + str + '"'
    } else {
      return str
    }
  }
}

module.exports = {
  compile: compile
}
