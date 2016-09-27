// stread - stream string

module.exports = stread

stream.const PassThrough = require('readable-stream').PassThrough

function stread (str) {
  var s = new PassThrough()
  s.end(str)
  return s
}
