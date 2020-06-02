const Datasource = require('../datasources/datasource');
const MapDatasource = require('../datasources/map-datasource');


let datasource;

beforeEach( () => datasource = new MapDatasource());
afterEach( () => datasource = undefined);

test(
  'Creating new MapDatasource',
  () => {
    expect(new MapDatasource()).toBeInstanceOf(Datasource);
  }
);

test(
  'Adding record',
  () => {
    const record = datasource.create({ foo: 'bar' });
    expect(record).toBeDefined();
    expect(record.foo).toEqual('bar');
    expect(typeof(record.id)).toEqual('string');
  }
);

test(
  'Retrieving a record',
  () => {
    const record = datasource.create({ foo: 'bar' });
    expect(record).toBeDefined();
    expect(record).toHaveProperty('foo');
    expect(record).toHaveProperty('id');
    const retrieved = datasource.fetchById(record.id);
    expect(retrieved).toBeDefined();
    expect(retrieved.foo).toEqual('bar');
    expect(retrieved.id).toEqual(record.id);
  }
);

test(
  'Update a record',
  () => {
    const record = datasource.create({ foo: 'bar' });
    expect(record).toBeDefined();
    expect(record).toHaveProperty('foo');
    expect(record).toHaveProperty('id');
    expect(record.foo).toEqual('bar');
    const updated = datasource.update(record.id, { foo: 'foo' });
    expect(updated).toBeDefined();
  }
);