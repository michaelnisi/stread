// pipe - pipe string

var stread = require('../')

stread('You know what it is to be born alone, Baby tortoise!')
  .pipe(process.stdout)
