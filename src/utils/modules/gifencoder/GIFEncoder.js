const stream = require('stream')
const NeuQuant = require('./TypedNeuQuant.js')
const LZWEncoder = require('./LZWEncoder.js')

function ByteArray () {
  this.data = []
}

ByteArray.prototype.getData = function () {
  return Buffer.from(this.data)
}

ByteArray.prototype.writeByte = function (val) {
  this.data.push(val)
}

ByteArray.prototype.writeUTFBytes = function (string) {
  for (let l = string.length, i = 0; i < l; i++) {
    this.writeByte(string.charCodeAt(i))
  }
}

ByteArray.prototype.writeBytes = function (array, offset, length) {
  for (let l = length || array.length, i = offset || 0; i < l; i++) {
    this.writeByte(array[i])
  }
}

function GIFEncoder (width, height) {
  this.width = ~~width
  this.height = ~~height

  this.transparent = null

  this.transIndex = 0

  this.repeat = -1

  this.delay = 0

  this.image = null
  this.pixels = null
  this.indexedPixels = null
  this.colorDepth = null
  this.colorTab = null
  this.usedEntry = []
  this.palSize = 7
  this.dispose = -1
  this.firstFrame = true
  this.sample = 10

  this.started = false

  this.readStreams = []

  this.out = new ByteArray()
}

GIFEncoder.prototype.createReadStream = function (rs) {
  if (!rs) {
    rs = new stream.Readable()
    rs._read = function () {}
  }
  this.readStreams.push(rs)
  return rs
}

GIFEncoder.prototype.createWriteStream = function (options) {
  const self = this
  if (options) {
    Object.keys(options).forEach(function (option) {
      var fn = 'set' + option[0].toUpperCase() + option.substr(1)
      if (~['setDelay', 'setFrameRate', 'setDispose', 'setRepeat',
        'setTransparent', 'setQuality'].indexOf(fn)) {
        self[fn](self, options[option])
      }
    })
  }

  var ws = new stream.Duplex({ objectMode: true })
  ws._read = function () {}
  this.createReadStream(ws)

  ws._write = function (data, enc, next) {
    if (!self.started) {
      self.start()
    }
    self.addFrame(data)
    next()
  }
  var end = ws.end
  ws.end = function () {
    end.apply(ws, [].slice.call(arguments))
    self.finish()
  }
  return ws
}

GIFEncoder.prototype.emit = function () {
  var self = this
  if (this.readStreams.length === 0) {
    return
  }
  if (this.out.data.length) {
    this.readStreams.forEach(function (rs) {
      rs.push(Buffer.from(self.out.data))
    })
    this.out.data = []
  }
}

GIFEncoder.prototype.end = function () {
  if (this.readStreams.length === null) {
    return
  }
  this.emit()
  this.readStreams.forEach(function (rs) {
    rs.push(null)
  })
  this.readStreams = []
}

GIFEncoder.prototype.setDelay = function (milliseconds) {
  this.delay = Math.round(milliseconds / 10)
}

GIFEncoder.prototype.setFrameRate = function (fps) {
  this.delay = Math.round(100 / fps)
}

GIFEncoder.prototype.setDispose = function (disposalCode) {
  if (disposalCode >= 0) {
    this.dispose = disposalCode
  }
}

GIFEncoder.prototype.setRepeat = function (repeat) {
  this.repeat = repeat
}

GIFEncoder.prototype.setTransparent = function (color) {
  this.transparent = color
}

GIFEncoder.prototype.addFrame = function (imageData) {
  if (imageData && imageData.getImageData) {
    this.image = imageData.getImageData(0, 0, this.width, this.height).data
  } else {
    this.image = imageData
  }

  this.getImagePixels()
  this.analyzePixels()

  if (this.firstFrame) {
    this.writeLSD()
    this.writePalette()
    if (this.repeat >= 0) {
      this.writeNetscapeExt()
    }
  }

  this.writeGraphicCtrlExt()
  this.writeImageDesc()
  if (!this.firstFrame) {
    this.writePalette()
  }
  this.writePixels()

  this.firstFrame = false
  this.emit()
}

GIFEncoder.prototype.finish = function () {
  this.out.writeByte(0x3b)
  this.end()
}

GIFEncoder.prototype.setQuality = function (quality) {
  if (quality < 1) {
    quality = 1
  }
  this.sample = quality
}

GIFEncoder.prototype.start = function () {
  this.out.writeUTFBytes('GIF89a')
  this.started = true
  this.emit()
}

GIFEncoder.prototype.analyzePixels = function () {
  const len = this.pixels.length
  const nPix = len / 3

  this.indexedPixels = new Uint8Array(nPix)

  const imgq = new NeuQuant(this.pixels, this.sample)
  imgq.buildColormap()
  this.colorTab = imgq.getColormap()

  let k = 0
  for (let j = 0; j < nPix; j++) {
    const index = imgq.lookupRGB(
      this.pixels[k++] & 0xff,
      this.pixels[k++] & 0xff,
      this.pixels[k++] & 0xff
    )
    this.usedEntry[index] = true
    this.indexedPixels[j] = index
  }

  this.pixels = null
  this.colorDepth = 8
  this.palSize = 7

  if (this.transparent !== null) {
    this.transIndex = this.findClosest(this.transparent)

    for (let pixelIndex = 0; pixelIndex < nPix; pixelIndex++) {
      if (this.image[pixelIndex * 4 + 3] === 0) {
        this.indexedPixels[pixelIndex] = this.transIndex
      }
    }
  }
}

GIFEncoder.prototype.findClosest = function (c) {
  if (this.colorTab === null) {
    return -1
  }

  const r = (c & 0xFF0000) >> 16
  const g = (c & 0x00FF00) >> 8
  const b = (c & 0x0000FF)
  let minpos = 0
  let dmin = 256 * 256 * 256
  const len = this.colorTab.length

  for (var i = 0; i < len;) {
    const index = i / 3
    const dr = r - (this.colorTab[i++] & 0xff)
    const dg = g - (this.colorTab[i++] & 0xff)
    const db = b - (this.colorTab[i++] & 0xff)
    const d = dr * dr + dg * dg + db * db
    if (this.usedEntry[index] && (d < dmin)) {
      dmin = d
      minpos = index
    }
  }

  return minpos
}

GIFEncoder.prototype.getImagePixels = function () {
  const w = this.width
  const h = this.height
  this.pixels = new Uint8Array(w * h * 3)

  const data = this.image
  let count = 0

  for (var i = 0; i < h; i++) {
    for (var j = 0; j < w; j++) {
      var b = (i * w * 4) + j * 4
      this.pixels[count++] = data[b]
      this.pixels[count++] = data[b + 1]
      this.pixels[count++] = data[b + 2]
    }
  }
}

GIFEncoder.prototype.writeGraphicCtrlExt = function () {
  this.out.writeByte(0x21)
  this.out.writeByte(0xf9)
  this.out.writeByte(4)

  let transp, disp
  if (this.transparent === null) {
    transp = 0
    disp = 0
  } else {
    transp = 1
    disp = 2
  }

  if (this.dispose >= 0) {
    disp = this.dispose & 7
  }
  disp <<= 2

  this.out.writeByte(
    0 |
    disp |
    0 |
    transp
  )

  this.writeShort(this.delay)
  this.out.writeByte(this.transIndex)
  this.out.writeByte(0)
}

GIFEncoder.prototype.writeImageDesc = function () {
  this.out.writeByte(0x2c)
  this.writeShort(0)
  this.writeShort(0)
  this.writeShort(this.width)
  this.writeShort(this.height)

  if (this.firstFrame) {
    this.out.writeByte(0)
  } else {
    this.out.writeByte(
      0x80 |
      0 |
      0 |
      0 |
      this.palSize
    )
  }
}

GIFEncoder.prototype.writeLSD = function () {
  this.writeShort(this.width)
  this.writeShort(this.height)

  this.out.writeByte(
    0x80 |
    0x70 |
    0x00 |
    this.palSize
  )

  this.out.writeByte(0)
  this.out.writeByte(0)
}

GIFEncoder.prototype.writeNetscapeExt = function () {
  this.out.writeByte(0x21)
  this.out.writeByte(0xff)
  this.out.writeByte(11)
  this.out.writeUTFBytes('NETSCAPE2.0')
  this.out.writeByte(3)
  this.out.writeByte(1)
  this.writeShort(this.repeat)
  this.out.writeByte(0)
}

GIFEncoder.prototype.writePalette = function () {
  this.out.writeBytes(this.colorTab)
  var n = (3 * 256) - this.colorTab.length
  for (var i = 0; i < n; i++) {
    this.out.writeByte(0)
  }
}

GIFEncoder.prototype.writeShort = function (pValue) {
  this.out.writeByte(pValue & 0xFF)
  this.out.writeByte((pValue >> 8) & 0xFF)
}

GIFEncoder.prototype.writePixels = function () {
  var enc = new LZWEncoder(this.width, this.height, this.indexedPixels, this.colorDepth)
  enc.encode(this.out)
}

module.exports = GIFEncoder
