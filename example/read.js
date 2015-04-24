// read - read one octet at a time

var stread = require('../')

var reader = stread('You know what it is to be born alone, Baby tortoise!')
var writer = process.stdout

function write () {
  var chunk
  var ok = true
  while (ok && (chunk = reader.read(1)) !== null) {
    ok = writer.write(chunk)
  }
  if (!ok) writer.once('drain', write)
}

write()
