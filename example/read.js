// read - read one octet at a time

var stread = require('../')

var reader = stread('You know what it is to be born alone, Baby tortoise!')
var writer = process.stdout

function write () {
  var ok
  var chunk
  do {
    if ((chunk = reader.read(1)) !== null) {
      ok = writer.write(chunk)
    }
  } while (chunk && ok)
  if (!ok) writer.once('drain', write)
}

write()
