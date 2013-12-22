# stread - stream string 

The stread [Node.js](http://nodejs.org/) module makes a utf-8 encoded string readable through the [stream](http://nodejs.org/api/stream.html) API which can be handy sometimes (while writing tests for streams, for example).

[![Build Status](https://secure.travis-ci.org/michaelnisi/stread.png)](http://travis-ci.org/michaelnisi/stread)

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
```
## API

### stread(str)

- `str` The `String` to stream

Returns a [Readable](http://nodejs.org/api/stream.html#stream_class_stream_readable) stream.

## Installation

[![NPM](https://nodei.co/npm/stread.png)](https://npmjs.org/package/stread)

## License

[MIT License](https://raw.github.com/michaelnisi/stread/master/LICENSE)
