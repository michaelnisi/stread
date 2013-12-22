
// read - read one octet at a time

var stread = require('../')

var str = 'You know what it is to be born alone, Baby tortoise!'
  , reader = stread(str)
  , writer = process.stdout

function write () {
  var ok = true
    , chunk = null
  while (null !== (chunk = reader.read(1)) && ok) {
    ok = writer.write(chunk)
  }
  if (!ok) writer.once('drain', write);
}

write()
