# stread - stream string

The **stread** [Node.js](http://nodejs.org/) module makes an utf-8 encoded string readable through the [stream](http://nodejs.org/api/stream.html) API, which can be handy sometimes, while writing tests for streams, for example.

[![Build Status](https://travis-ci.org/michaelnisi/stread.svg)](http://travis-ci.org/michaelnisi/stread)

## Why not use PassThrough?

**stread** is more than 2x faster than **PassThrough**:

```
$ node benchmark.js

Working...

  12 tests completed.

  stread 10           x 57,941 ops/sec ±1.85% (168 runs sampled)
  PassThrough 10      x 26,209 ops/sec ±1.68% (172 runs sampled)
  stread 100          x 57,693 ops/sec ±1.46% (172 runs sampled)
  PassThrough 100     x 26,877 ops/sec ±1.39% (172 runs sampled)
  stread 1024         x 53,571 ops/sec ±1.25% (172 runs sampled)
  PassThrough 1024    x 24,631 ops/sec ±1.66% (171 runs sampled)
  stread 10240        x 30,416 ops/sec ±1.21% (171 runs sampled)
  PassThrough 10240   x 18,464 ops/sec ±1.67% (166 runs sampled)
  stread 102400       x  7,676 ops/sec ±1.63% (159 runs sampled)
  PassThrough 102400  x  7,929 ops/sec ±1.27% (171 runs sampled)
  stread 1024000      x    908 ops/sec ±1.10% (167 runs sampled)
  PassThrough 1024000 x    552 ops/sec ±1.47% (171 runs sampled)
```

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
