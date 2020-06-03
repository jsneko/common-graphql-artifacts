'use strict';
const is = require('@sindresorhus/is');
const createScalar = require('../functions/createScalar');

module.exports = createScalar(
  'timestamp', 
  'A scalar representing a date as Unix milliseconds since the Epoch (January 1, 1970)', 
  {
    parseLiteral(value) {
      if (is.number(value) === false) {
        throw new TypeError('Timestamp must be a number');
      }
    
      return value;
    }
  }
);