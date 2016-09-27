// read - read one octet at a time

const stread = require('../')

const reader = stread('You know what it is to be born alone, Baby tortoise!')
const writer = process.stdout

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
