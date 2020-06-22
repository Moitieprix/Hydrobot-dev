const ncycles = 100
const netsize = 256
const maxnetpos = netsize - 1

const netbiasshift = 4
const intbiasshift = 16
const intbias = (1 << intbiasshift)
const gammashift = 10
const betashift = 10
const beta = (intbias >> betashift)
const betagamma = (intbias << (gammashift - betashift))

const initrad = (netsize >> 3)
const radiusbiasshift = 6
const radiusbias = (1 << radiusbiasshift)
const initradius = (initrad * radiusbias)
const radiusdec = 30

const alphabiasshift = 10
const initalpha = (1 << alphabiasshift)

const radbiasshift = 8
const radbias = (1 << radbiasshift)
const alpharadbshift = (alphabiasshift + radbiasshift)
const alpharadbias = (1 << alpharadbshift)

const prime1 = 499
const prime2 = 491
const prime3 = 487
const prime4 = 503
const minpicturebytes = (3 * prime4)

function NeuQuant (pixels, samplefac) {
  let network
  let netindex

  let bias
  let freq
  let radpower

  function init () {
    network = []
    netindex = new Int32Array(256)
    bias = new Int32Array(netsize)
    freq = new Int32Array(netsize)
    radpower = new Int32Array(netsize >> 3)

    let v
    for (let i = 0; i < netsize; i++) {
      v = (i << (netbiasshift + 8)) / netsize
      network[i] = new Float64Array([v, v, v, 0])
      freq[i] = intbias / netsize
      bias[i] = 0
    }
  }

  function unbiasnet () {
    for (let i = 0; i < netsize; i++) {
      network[i][0] >>= netbiasshift
      network[i][1] >>= netbiasshift
      network[i][2] >>= netbiasshift
      network[i][3] = i
    }
  }

  function altersingle (alpha, i, b, g, r) {
    network[i][0] -= (alpha * (network[i][0] - b)) / initalpha
    network[i][1] -= (alpha * (network[i][1] - g)) / initalpha
    network[i][2] -= (alpha * (network[i][2] - r)) / initalpha
  }

  function alterneigh (radius, i, b, g, r) {
    const lo = Math.abs(i - radius)
    const hi = Math.min(i + radius, netsize)

    let j = i + 1
    let k = i - 1
    let m = 1

    let p
    let a
    while ((j < hi) || (k > lo)) {
      a = radpower[m++]

      if (j < hi) {
        p = network[j++]
        p[0] -= (a * (p[0] - b)) / alpharadbias
        p[1] -= (a * (p[1] - g)) / alpharadbias
        p[2] -= (a * (p[2] - r)) / alpharadbias
      }

      if (k > lo) {
        p = network[k--]
        p[0] -= (a * (p[0] - b)) / alpharadbias
        p[1] -= (a * (p[1] - g)) / alpharadbias
        p[2] -= (a * (p[2] - r)) / alpharadbias
      }
    }
  }

  function contest (b, g, r) {
    let bestd = ~(1 << 31)
    let bestbiasd = bestd
    let bestpos = -1
    let bestbiaspos = bestpos

    let n
    let dist
    let biasdist
    let betafreq

    for (let i = 0; i < netsize; i++) {
      n = network[i]

      dist = Math.abs(n[0] - b) + Math.abs(n[1] - g) + Math.abs(n[2] - r)
      if (dist < bestd) {
        bestd = dist
        bestpos = i
      }

      biasdist = dist - ((bias[i]) >> (intbiasshift - netbiasshift))
      if (biasdist < bestbiasd) {
        bestbiasd = biasdist
        bestbiaspos = i
      }

      betafreq = (freq[i] >> betashift)
      freq[i] -= betafreq
      bias[i] += (betafreq << gammashift)
    }

    freq[bestpos] += beta
    bias[bestpos] -= betagamma

    return bestbiaspos
  }

  function inxbuild () {
    let i
    let j
    let p
    let q
    let smallpos
    let smallval
    let previouscol = 0
    let startpos = 0

    for (i = 0; i < netsize; i++) {
      p = network[i]
      smallpos = i
      smallval = p[1]

      for (j = i + 1; j < netsize; j++) {
        q = network[j]
        if (q[1] < smallval) {
          smallpos = j
          smallval = q[1]
        }
      }
      q = network[smallpos]
      if (i !== smallpos) {
        j = q[0]; q[0] = p[0]; p[0] = j
        j = q[1]; q[1] = p[1]; p[1] = j
        j = q[2]; q[2] = p[2]; p[2] = j
        j = q[3]; q[3] = p[3]; p[3] = j
      }

      if (smallval !== previouscol) {
        netindex[previouscol] = (startpos + i) >> 1
        for (j = previouscol + 1; j < smallval; j++) {
          netindex[j] = i
        }
        previouscol = smallval
        startpos = i
      }
    }
    netindex[previouscol] = (startpos + maxnetpos) >> 1
    for (j = previouscol + 1; j < 256; j++) {
      netindex[j] = maxnetpos
    }
  }

  function inxsearch (b, g, r) {
    var a, p, dist

    var bestd = 1000
    var best = -1

    var i = netindex[g]
    var j = i - 1

    while ((i < netsize) || (j >= 0)) {
      if (i < netsize) {
        p = network[i]
        dist = p[1] - g
        if (dist >= bestd) {
          i = netsize
        } else {
          i++
          if (dist < 0) {
            dist = -dist
          }
          a = p[0] - b
          if (a < 0) {
            a = -a
          }
          dist += a
          if (dist < bestd) {
            a = p[2] - r
            if (a < 0) {
              a = -a
            }
            dist += a
            if (dist < bestd) {
              bestd = dist
              best = p[3]
            }
          }
        }
      }
      if (j >= 0) {
        p = network[j]
        dist = g - p[1]
        if (dist >= bestd) {
          j = -1
        } else {
          j--
          if (dist < 0) {
            dist = -dist
          }
          a = p[0] - b
          if (a < 0) {
            a = -a
          }
          dist += a
          if (dist < bestd) {
            a = p[2] - r
            if (a < 0) {
              a = -a
            }
            dist += a
            if (dist < bestd) {
              bestd = dist
              best = p[3]
            }
          }
        }
      }
    }

    return best
  }

  function learn () {
    let i

    const lengthcount = pixels.length
    const alphadec = 30 + ((samplefac - 1) / 3)
    const samplepixels = lengthcount / (3 * samplefac)
    let delta = ~~(samplepixels / ncycles)
    let alpha = initalpha
    let radius = initradius

    var rad = radius >> radiusbiasshift

    if (rad <= 1) {
      rad = 0
    }
    for (i = 0; i < rad; i++) {
      radpower[i] = alpha * (((rad * rad - i * i) * radbias) / (rad * rad))
    }

    let step
    if (lengthcount < minpicturebytes) {
      samplefac = 1
      step = 3
    } else if ((lengthcount % prime1) !== 0) {
      step = 3 * prime1
    } else if ((lengthcount % prime2) !== 0) {
      step = 3 * prime2
    } else if ((lengthcount % prime3) !== 0) {
      step = 3 * prime3
    } else {
      step = 3 * prime4
    }

    let b
    let g
    let r
    let j
    let pix = 0

    i = 0
    while (i < samplepixels) {
      b = (pixels[pix] & 0xff) << netbiasshift
      g = (pixels[pix + 1] & 0xff) << netbiasshift
      r = (pixels[pix + 2] & 0xff) << netbiasshift

      j = contest(b, g, r)

      altersingle(alpha, j, b, g, r)
      if (rad !== 0) {
        alterneigh(rad, j, b, g, r)
      }

      pix += step
      if (pix >= lengthcount) {
        pix -= lengthcount
      }

      i++

      if (delta === 0) {
        delta = 1
      }
      if (i % delta === 0) {
        alpha -= alpha / alphadec
        radius -= radius / radiusdec
        rad = radius >> radiusbiasshift

        if (rad <= 1) {
          rad = 0
        }
        for (j = 0; j < rad; j++) {
          radpower[j] = alpha * (((rad * rad - j * j) * radbias) / (rad * rad))
        }
      }
    }
  }

  function buildColormap () {
    init()
    learn()
    unbiasnet()
    inxbuild()
  }
  this.buildColormap = buildColormap

  function getColormap () {
    const map = []
    const index = []

    for (var i = 0; i < netsize; i++) {
      index[network[i][3]] = i
    }

    let k = 0
    for (let l = 0; l < netsize; l++) {
      const j = index[l]
      map[k++] = (network[j][0])
      map[k++] = (network[j][1])
      map[k++] = (network[j][2])
    }
    return map
  }
  this.getColormap = getColormap

  this.lookupRGB = inxsearch
}

module.exports = NeuQuant
