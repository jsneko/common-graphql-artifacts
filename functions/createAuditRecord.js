'use strict';
const assert = require('assert');
const is = require('@sindresorhus/is');

/**
 * Provides a plain object formatted for the custom GraphQL Audit Type.
 * 
 * @param {number} [timestamp=Date.now()]
 *  The timestamp to use to create the object
 * @returns {object}
 */
module.exports = function createAuditRecord(timestamp = Date.now()) {
  assert(is.number(timestamp));
  const date = new Date(timestamp);
  return {
    date: {
      timestamp,
      iso8601: date.toISOString(),
      server: date.toString(),
    },
  };
}