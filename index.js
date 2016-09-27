// stread - stream string

module.exports = stread

const PassThrough = require('readable-stream').PassThrough

function stread (str, encoding) {
  encoding = encoding || 'utf8'
  const s = new PassThrough({ encoding: encoding })
  s.end(str)
  return s
}
