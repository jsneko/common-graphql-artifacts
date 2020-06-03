'ues strict';
const Datasource = require('./datasource');
const { v4 : uuid4 } = require('uuid');
const RecordDoesNotExistError = require('../errors/RecordDoesNotExistError');

const store = new WeakMap();

/**
 * Provides a Datasource with an underlying JavaScript Map instance as a store
 * 
 * @extends Datasource
 */
module.exports = class MapDatasource extends Datasource {
  constructor() {
    super();
    store.set(this, new Map());
  }

  get store() {
    return store.get(this);
  }

  create(fields) {
    const id = uuid4();
    const record = { id, ...fields };
    this.store.set(id, record);
    return record;
  }

  count(filter) {
    return this.search(filter).length;
  }

  fetchById(id) {
    if (this.store.has(id) === false) {
      throw new RecordDoesNotExistError(`no record with ${id} exists`);
    }
    return this.store.get(id);
  }

  delete(id) {
    if (this.store.has(id) === false) {
      throw new RecordDoesNotExistError(`no record with ${id} exists`);
    }
    return this.store.delete(id);
  }

  update(id, update) {
    const record = this.fetchById(id);
    const properties = Object.keys(record);

    const updated = Object.entries(update)
      .reduce(
        (accumulator, [property, value]) => {
          if (property === 'id') {
            return accumulator;
          }

          if (properties.includes(property) === false) {
            return accumulator;
          }

          accumulator[property] = value;
        },
        JSON.parse(JSON.stringify(record))
      );
    this.store.set(id, updated);
  }
}