var test = require('tap').test
var Writable = require('readable-stream').Writable
var stread = require('../')

test('pipe', function (t) {
  var str = 'You know what it is to be born alone, Baby tortoise!'
  var reader = stread(str)
  var writer = new Writable()
  var actual = ''
  var expected = str

  writer._write = function (chunk, enc, cb) {
    actual += chunk
    cb()
  }
  reader.pipe(writer).on('finish', function () {
    t.is(actual, expected)
    t.end()
  })
})

test('read', function (t) {
  var str = 'You know what it is to be born alone, Baby tortoise!'
  var reader = stread(str)
  var actual = ''
  var expected = str

  reader.on('readable', function () {
    var chunk = null
    while ((chunk = reader.read(size())) !== null) {
      actual += chunk
    }
  })
  reader.on('end', function () {
    t.is(actual, expected)
    t.end()
  })
  function size () {
    return Math.round(Math.random() * 128)
  }
})
