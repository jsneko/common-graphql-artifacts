const assert = require('assert');
const createScalar = require('../functions/createScalar');

test(
  'createScalar happy path',
  () => {
    const scalar = createScalar('foo', 'A Foo scalar');
    expect(scalar).toBeDefined();
    expect(scalar).toHaveProperty('definition');
    expect(scalar).toHaveProperty('resolver');
    expect(typeof(scalar.definition)).toEqual('string');
    expect(scalar.definition).toEqual('scalar Foo');
    expect(scalar.resolver).toHaveProperty('Foo');

    const Foo = scalar.resolver.Foo;

    expect(Foo).toHaveProperty('name');
    expect(Foo).toHaveProperty('description');
    expect(Foo).toHaveProperty('serialize');
    expect(Foo).toHaveProperty('parseValue');
    expect(Foo).toHaveProperty('parseLiteral');
    
    expect(Foo.name).toEqual('Foo');
    expect(Foo.description).toEqual('A Foo scalar');
    expect(typeof(Foo.serialize)).toEqual('function');
    expect(typeof(Foo.parseValue)).toEqual('function');
    expect(typeof(Foo.parseLiteral)).toEqual('function');
    expect(Foo.serialize('bar')).toEqual('bar');
    expect(Foo.parseValue('bar')).toEqual('bar');
    expect(Foo.parseLiteral({ value: 'bar' })).toEqual('bar');
  }
);

test(
  'createScalar no name',
  () => {
    expect(createScalar).toThrow(assert.AssertionError);
  }
);

test(
  'createScalar no description',
  () => {
    expect(() => createScalar('Foo')).toThrow(assert.AssertionError);
  }
);