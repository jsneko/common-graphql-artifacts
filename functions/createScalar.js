const { GraphQLScalarType} = require('graphql');
const assert = require('assert');
const is = require('@sindresorhus/is');

function DEFAULT_FUNCTION(value, kind) {
  return value;
}

/**
 * Creates a Scalar mapping
 * 
 * Provides the boilerplate for a GraphQL Scalar definition.
 * 
 * The resolvers object may be omitted; however, all of the functions
 * will simply return the value as is. At a minimum the parseLiteral
 * should be provided because it is the function which should determine
 * the kind of literal the scalar should contain.
 * 
 * If parseLiteral is provided any unprovided functions will use that function.
 *  
 * @param {string} name
 *  The name of the Scalar
 * @param {string} description
 *  The description to give to the Scalar
 * @param {object} [resolvers]
 *  Contains the functions to use for serializing and parsing the Scalar value
 * @param {function} [resolvers.serialize]
 *  The function to call when the Scalar is serialized; will be passed the value and the kind as set by the GraphQL SDL
 * @param {function} [resolvers.parseValue]
 *  The function to call when the Scalar value is parsed; will be passed the value and the kind as set by the GraphQL SDL
 * @param {function} [resolvers.parseLiteral]
 *  The function to call when the Scalar literal is parsed; will be passed the value and the kind as set by the GraphQL SDL
 * @returns {definition, resolver}
 * @throws {AssertionError} - if name is not a string or is an empty string
 * @throws {AssertionError} - if description is not a string or is an empty string
 * @throws {AssertionError} - if resolvers is not a plain object
 * 
 * @example
 * const { Kind } = require('grpahql/language');
 * createScalar('foo', 'provides a Foo scalar', { parseLiteral(value, kind = Kind.STRING) { ... } })
 */
module.exports = function(name, description, resolvers = {}) {
  assert(is.nonEmptyString(name));
  assert(is.nonEmptyString(description));
  assert(is.plainObject(resolvers));

  const {
    parseLiteral = DEFAULT_FUNCTION,
  } = resolvers;

  const serialize = (is.function(resolvers.serialize) === true)
    ? resolvers.serialize
    : parseLiteral;
  
  const parseValue = (is.function(resolvers.parseValue) === true)
    ? resolvers.parseValue
    : parseLiteral;

  const capitalized = name.replace(/^\w/, (character) => character.toUpperCase());
  return {
    definition: `scalar ${capitalized}`,
    resolver: {
      [capitalized]: new GraphQLScalarType({
        name: capitalized,
        description,
        serialize,
        parseValue,
        parseLiteral(ast) {
          return parseLiteral(ast.value, ast.kind);
        }
      }),
    },
  };
};