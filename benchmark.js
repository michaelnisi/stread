var benchmark = require('benchmark');
var benchmarks = require('beautify-benchmark');
var seedrandom = require('seedrandom');
var PassThrough = require('readable-stream').PassThrough;
var stread = require('./index');

function createString(size) {
  var buffer = new Buffer(size);
  var rng = seedrandom('body ' + size);

  for (var i = 0; i < buffer.length; i++) {
    buffer[i] = (rng() * 94 + 32) | 0;
  }

  return buffer.toString('utf8');
}

function passThroughTest(str, encoding) {
  encoding = encoding || 'utf8'
  const s = new PassThrough({ encoding: encoding })
  s.end(str)
  return s
}

function readStream(stream, deferred) {
  stream.on('data', function(chunk) {});
  stream.on('end', function () {
    deferred.resolve();
  });
}

var suite = new benchmark.Suite();

suite.on('start', function(e) {
  return process.stdout.write('Working...\n\n');
});

suite.on('cycle', function(e) {
  return benchmarks.add(e.target);
});

suite.on('complete', function() {
  return benchmarks.log();
});

function addTest(stringSize) {
  var string = createString(stringSize);

  suite.add('stread ' + stringSize, {
    defer: true,
    minSamples: 100,
    fn: function(deferred) {
      readStream(stread(string), deferred);
    }
  });

  suite.add('PassThrough ' + stringSize, {
    defer: true,
    minSamples: 100,
    fn: function(deferred) {
      readStream(passThroughTest(string), deferred);
    }
  });
}

addTest(10);
addTest(100);
addTest(1 * 1024);
addTest(10 * 1024);
addTest(100 * 1024);
addTest(1000 * 1024);

suite.run({ async: false });
