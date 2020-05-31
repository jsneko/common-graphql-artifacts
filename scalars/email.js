const { Kind } = require('graphql/language');
const createScalar = require('../functions/createScalar');
const is = require('@sindresorhus/is');
const validator = require('validator');

module.exports = createScalar(
  'email',
  'A scalar representing a valid email address',
  {
    parseLiteral(value, kind=Kind.STRING) {
      if (is.falsy(kind === Kind.STRING) === true) {
        throw new TypeError('kind for email must be STRING');
      }
    
      if (is.nonEmptyString(value) === false) {
        throw new TypeError('email value must be a string');
      }
    
      if (validator.isEmail(value) === false) {
        throw new TypeError('email value must be a valid email address');
      }
    
      return value;
    }
  }
);
