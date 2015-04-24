
# stread - stream string

The **stread** [Node.js](http://nodejs.org/) module makes an utf-8 encoded string readable through the [stream](http://nodejs.org/api/stream.html) API which can be handy sometimes (for example, while writing tests for streams).

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![Build Status](https://travis-ci.org/michaelnisi/stread.svg)](http://travis-ci.org/michaelnisi/stread)

## Usage

### Pipe
```js
var stread = require('stread')

stread('You know what it is to be born alone, Baby tortoise!')
  .pipe(process.stdout)
```

### Read one octet at a time
```js
var stread = require('stread')

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
```
## API

### stread(str)

- `str` The `String` to stream

Returns a [Readable](http://nodejs.org/api/stream.html#stream_class_stream_readable) stream.

## Installation

With [npm](https://npmjs.org/package/stread) do:

```
$ npm install stread
```

## License

[MIT License](https://raw.github.com/michaelnisi/stread/master/LICENSE)
