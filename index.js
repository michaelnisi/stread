// stread - stream string

module.exports = ReadableString

var util = require('util')
var Readable = require('readable-stream').Readable

util.inherits(ReadableString, Readable)
function ReadableString (str) {
  if (!(this instanceof ReadableString)) return new ReadableString(str)
  Readable.call(this)
  this._buf = new Buffer(str)
}

ReadableString.prototype._read = function (size) {
  var ok = true
  var chunk
  var end = 0
  do {
    var buf = this._buf
    if (buf === null || buf.length === 0) {
      this.push(null)
      break
    }
    end = size && size < buf.length ? size : buf.length
    chunk = buf.slice(0, end)
    ok = this.push(chunk)
    this._buf = buf.slice(end, buf.length - end)
  } while (ok && end > 0)
}
