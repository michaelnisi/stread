
// stread - stream string

module.exports = ReadableString

var util = require('util')
  , Readable = require('stream').Readable

util.inherits(ReadableString, Readable)
function ReadableString (str) {
  if (!(this instanceof ReadableString)) return new ReadableString(str)
  Readable.call(this)
  this.buf = new Buffer(str)
}

ReadableString.prototype._read = function (size) {
  var ok = true
    , chunk = null
    , end = 0
  do {
    var buf = this.buf
    if (buf === null || buf.length === 0) {
      this.push(null)
      break
    }
    end = size && size < buf.length ? size : buf.length
    chunk = buf.slice(0, end)
    ok = this.push(chunk)
    this.buf = buf.slice(end, buf.length - end)
  } while (ok && end > 0)
}
