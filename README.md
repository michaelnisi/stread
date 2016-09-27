# stread - stream string

The **stread** [Node.js](http://nodejs.org/) module makes an utf-8 encoded string readable through the [stream](http://nodejs.org/api/stream.html) API, which can be handy sometimes, while writing tests for streams, for example.

[![Build Status](https://travis-ci.org/michaelnisi/stread.svg)](http://travis-ci.org/michaelnisi/stread)

## Example

### Piping to a writable stream

```js
var stread = require('stread')

stread('You know what it is to be born alone, Baby tortoise!')
  .pipe(process.stdout)
```

### Reading one octet at a time

```js
var stread = require('stread')

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
```

## Exports

```js
function stread(str)
```

- `str` The `String` to stream.

Returns a [Readable](http://nodejs.org/api/stream.html#stream_class_stream_readable) stream.

## Installation

With [npm](https://npmjs.org/package/stread), do:

```
$ npm install stread
```

## License

[MIT License](https://raw.github.com/michaelnisi/stread/master/LICENSE)
