'use strict';
/**
 * Error for methods that have not been overridden
 * 
 * @param {string} [message='This method is abstract and must be overridden']
 * @returns {Error}
 */
module.exports = class AbstractMethodError extends Error {
  constructor(message = 'This method is abstract and must be overridden') {
    return super(message);
  }
};