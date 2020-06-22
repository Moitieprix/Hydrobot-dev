const EOF = -1
const BITS = 12
const HSIZE = 5003
const masks = [0x0000, 0x0001, 0x0003, 0x0007, 0x000F, 0x001F,
  0x003F, 0x007F, 0x00FF, 0x01FF, 0x03FF, 0x07FF,
  0x0FFF, 0x1FFF, 0x3FFF, 0x7FFF, 0xFFFF]

function LZWEncoder (width, height, pixels, colorDepth) {
  var initCodeSize = Math.max(2, colorDepth)

  var accum = new Uint8Array(256)
  var htab = new Int32Array(HSIZE)
  var codetab = new Int32Array(HSIZE)

  var curAccum
  var curBits = 0
  var aCount
  var freeEnt = 0
  var maxcode

  var clearFlg = false
  var gInitBits
  var ClearCode
  var EOFCode

  let remaining
  let curPixel
  let nBits

  function charOut (c, outs) {
    accum[aCount++] = c
    if (aCount >= 254) {
      flushChar(outs)
    }
  }

  function clBlock (outs) {
    clHash(HSIZE)
    freeEnt = ClearCode + 2
    clearFlg = true
    output(ClearCode, outs)
  }

  function clHash (hsize) {
    for (var i = 0; i < hsize; ++i) { htab[i] = -1 }
  }

  function compress (initBits, outs) {
    var fcode, c, i, ent, disp, hsizeReg, hshift

    gInitBits = initBits

    clearFlg = false
    nBits = gInitBits
    maxcode = MAXCODE(nBits)

    ClearCode = 1 << (initBits - 1)
    EOFCode = ClearCode + 1
    freeEnt = ClearCode + 2

    aCount = 0

    ent = nextPixel()

    hshift = 0
    for (fcode = HSIZE; fcode < 65536; fcode *= 2) { ++hshift }
    hshift = 8 - hshift
    hsizeReg = HSIZE
    clHash(hsizeReg)

    output(ClearCode, outs)

    // eslint-disable-next-line no-labels
    outerLoop: while ((c = nextPixel()) !== EOF) {
      fcode = (c << BITS) + ent
      i = (c << hshift) ^ ent
      if (htab[i] === fcode) {
        ent = codetab[i]
        continue
      } else if (htab[i] >= 0) {
        disp = hsizeReg - i
        if (i === 0) { disp = 1 }
        do {
          if ((i -= disp) < 0) { i += hsizeReg }
          if (htab[i] === fcode) {
            ent = codetab[i]
            // eslint-disable-next-line no-labels
            continue outerLoop
          }
        } while (htab[i] >= 0)
      }
      output(ent, outs)
      ent = c
      if (freeEnt < 1 << BITS) {
        codetab[i] = freeEnt++
        htab[i] = fcode
      } else {
        clBlock(outs)
      }
    }

    output(ent, outs)
    output(EOFCode, outs)
  }

  function encode (outs) {
    outs.writeByte(initCodeSize)
    remaining = width * height
    curPixel = 0
    compress(initCodeSize + 1, outs)
    outs.writeByte(0)
  }

  function flushChar (outs) {
    if (aCount > 0) {
      outs.writeByte(aCount)
      outs.writeBytes(accum, 0, aCount)
      aCount = 0
    }
  }

  function MAXCODE (nBit) {
    return (1 << nBit) - 1
  }

  function nextPixel () {
    if (remaining === 0) { return EOF }
    --remaining
    var pix = pixels[curPixel++]
    return pix & 0xff
  }

  function output (code, outs) {
    curAccum &= masks[curBits]

    if (curBits > 0) { curAccum |= (code << curBits) } else { curAccum = code }

    curBits += nBits

    while (curBits >= 8) {
      charOut((curAccum & 0xff), outs)
      curAccum >>= 8
      curBits -= 8
    }

    if (freeEnt > maxcode || clearFlg) {
      if (clearFlg) {
        maxcode = MAXCODE(nBits = gInitBits)
        clearFlg = false
      } else {
        ++nBits
        if (nBits === BITS) { maxcode = 1 << BITS } else { maxcode = MAXCODE(nBits) }
      }
    }

    if (code === EOFCode) {
      while (curBits > 0) {
        charOut((curAccum & 0xff), outs)
        curAccum >>= 8
        curBits -= 8
      }
      flushChar(outs)
    }
  }

  this.encode = encode
}

module.exports = LZWEncoder
