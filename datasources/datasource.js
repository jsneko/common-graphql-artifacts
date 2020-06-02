const AbstractMethodError = require('../errors/AbstractMethodError');

/**
 * Provides the base class definition for a Datasource.
 * 
 * This definition is meant to be abstract, so all of the methods
 * within throw AbstractMethodError errors when called.
 * 
 * @abstract
 */
module.exports = class Datasource {
  /**
   * Provides access to the underlying store for the datasource
   * 
   * @returns {*}
   * @abstract
   */
  get store() {
    throw new AbstractMethodError();
  }

  /**
   * Searches through the underlying store for records
   * matching the filter.
   * 
   * If no filter is passed, the method should return,
   * at the least, all records not deleted if deletions
   * are soft deletes.
   * 
   * @param {*} filter
   *  The filter to use to search for matching records
   * @returns {*[]} A list of matching records
   * @throws {TypeError} - if no filter is provided
   * @abstract
   */
  search (filter) {
    throw new AbstractMethodError();
  }

  /**
   * Counts the number of records which match the provided
   * filter.
   * 
   * If no filter is passed, returns the number of records
   * in the underlying store.
   * 
   * If the identifier property is passed in the filter,
   * it should be ignored.
   * 
   * @param {*} filter
   *  The filter to use to search for matching records
   * @returns {number}
   * @abstract
   */
  count (filter) {
    throw new AbstractMethodError();
  }

  /**
   * Adds the record to the underlying store.
   * 
   * Any validation not provided by the service should be
   * handled in this method. Also, adding fields not provided
   * by the record information.
   * 
   * Any problems should throw an Error.
   * 
   * Must return a full record, with the identifier included.
   * If an identifier is provided, it should be ignored.
   * 
   * @param {object} recordInfo
   *  The record information for creating a record in the store
   * @returns {*}
   * @abstract
   */
  create(recordInfo) {
    throw new AbstractMethodError();
  }

  /**
   * Retrieves a record by its identifying property.
   * 
   * If a record does not exist, the method should throw a
   * RecordDoesNotExistError error.
   * 
   * @param {*} id
   *  The identifier to use to find the record
   * @returns {*}
   * @throws {RecordDoesNotExistError} - if a record with the identifier is not found
   * @abstract
   */
  fetchById(id) {
    throw new AbstractMethodError();
  }

  /**
   * Updates an existing record using the information provided.
   * 
   * If a record with the provided identifier cannot be found
   * the method must throw a RecordDoesNotExistError error.
   * 
   * Any fields provided in the update information that do not
   * exist in the record schema should be ignored. If an
   * identifier is provided in the update information, it
   * should be ignored.
   * 
   * Must return the updated record information.
   * 
   * @param {*} id
   *  The identifier to use to find the record
   * @param {object} updateInfo
   *  The information to update in the record
   * @throws {RecordDoesNotExistError} - If the record with the provided identifier is not found
   * @abstract
   */
  update(id, updateInfo) {
    throw new AbstractMethodError();
  }

  /**
   * Removes a record from the underlying store.
   * 
   * Whether this is a soft removal or a hard removal is up
   * to the implementor.
   * 
   * If a record with the provided identifier cannot be found
   * the method must throw a RecordDoesNotExistError error.
   * 
   * Must return a boolean indicating success or failure.
   * 
   * @param {*} id
   *  The identifier to use to find the record
   * @returns {boolean}
   * @throws {RecordDoesNotExistError} - if a record with the provided identifier cannot be found
   * @abstract
   */
  delete(id) {
    throw new AbstractMethodError();
  }
}