// pipe - pipe string

const stread = require('../')

stread('You know what it is to be born alone, Baby tortoise!')
  .pipe(process.stdout)
