'use strict';
const Email = require('./email');
const Timestamp = require('./timestamp');

module.exports = {
  Email,
  Timestamp,
  Resolvers: {
    ...Email.resolver,
    ...Timestamp.resolver,
  },
  Types: `
  ${Email.definition}
  ${Timestamp.definition}
  `,
};