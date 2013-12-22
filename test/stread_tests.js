
var test = require('tap').test
  , Writable = require('stream').Writable
  , stread = require('../')

test('pipe', function (t) {
  var str = 'You know what it is to be born alone, Baby tortoise!'
    , reader = stread(str)
    , writer = new Writable()
    , actual = ''
    , expected = str

  writer._write = function (chunk, enc, cb) {
    actual += chunk
    cb()
  }
  reader
    .pipe(writer)
    .on('finish', function () {
      t.is(actual, expected)
      t.end()
    })
})

test('read', function (t) {
  var str = 'You know what it is to be born alone, Baby tortoise!'
    , reader = stread(str)
    , actual = ''
    , expected = str

  reader.on('readable', function () {
    var chunk = null
    while (null !== (chunk = reader.read(size()))) {
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
