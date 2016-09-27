// stread - stream string

module.exports = ReadableString

var util = require('util')
var Readable = require('readable-stream').Readable

function ReadableString (str) {
  if (!(this instanceof ReadableString)) return new ReadableString(str)
  Readable.call(this)
  this._buf = new Buffer(str)
  this._pos = 0
}
util.inherits(ReadableString, Readable)

ReadableString.prototype._read = function (size) {
  var ok = true
  var chunk
  var end = 0
  do {
    var buf = this._buf
    if (buf === null || this._pos >= buf.length) {
      this.push(null)
      this._buf = null
      this._pos = 0
      break
    }
    end = size && this._pos + size < buf.length ? this._pos + size : buf.length
    chunk = buf.slice(this._pos, end)
    ok = this.push(chunk)
    this._pos += end
  } while (ok && end > 0)
}
