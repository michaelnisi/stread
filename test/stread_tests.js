const test = require('tap').test
const Writable = require('readable-stream').Writable
const stread = require('../')

test('pipe', (t) => {
  const str = 'You know what it is to be born alone, Baby tortoise!'
  const reader = stread(str)
  const expected = str
  const writer = new Writable()

  var actual = ''

  writer._write = (chunk, enc, cb) => {
    actual += chunk
    cb()
  }
  reader.pipe(writer).on('finish', () => {
    t.is(actual, expected)
    t.end()
  })
})

function seq (acc) {
  if (acc.length === 16) return acc
  const l = acc.length
  acc.push(acc[l - 1] + acc[l - 2])
  return seq(acc)
}

test('long string', (t) => {
  var str = ''
  var m = 400
  while (m--) {
    str += 'You know what it is to be born alone, Baby tortoise!'
  }

  const s = seq([1, 1])

  s.forEach((size, i) => {
    const expected = str
    const reader = stread(str)

    var actual = ''

    reader.on('readable', () => {
      var chunk = null
      while ((chunk = reader.read(size)) !== null) {
        actual += chunk
      }
    })
    reader.on('end', () => {
      t.is(actual, expected)
      if (i === s.length - 1) t.end()
    })
  })
})

test('read', (t) => {
  const str = 'You know what it is to be born alone, Baby tortoise!'

  const s = seq([1, 1])

  s.forEach((size, i) => {
    const expected = str
    const reader = stread(str)

    var actual = ''

    reader.on('readable', () => {
      var chunk = null
      while ((chunk = reader.read(size)) !== null) {
        actual += chunk
      }
    })
    reader.on('end', () => {
      t.is(actual, expected)
      if (i === s.length - 1) t.end()
    })
  })
})
