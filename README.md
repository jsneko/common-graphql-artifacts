# common-graphql-artifacts

A collection of GraphQL artifacts to be used across microservices.

## Functions

### createScalar

Provides the boilerplate for a GraphQL Scalar definition.

The resolvers object may be omitted; however, all of the functions will simply return the value as is.
At a minimum the parseLiteral should be provided because it is the function which should determine the kind of literal the scalar should contain.

If parseLiteral is provided any unprovided functions will use that function.

The return from the function provides an object with two properites:
* definition - This is the SDL for a custom Scalar object. `scalar [name capitalized]`
* resolver - This is an object with a single property: the name of the Scalar, capitalized, whose value is a `GraphsQLScalarType` class definition.

The Scalar name will be capitalized.

Here is an example for the provided timestamp Scalar:
```js
createScalar(
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
```
See (Custom scalar examples)[https://www.apollographql.com/docs/apollo-server/schema/scalars-enums/#custom-scalar-examples] for Apollo GraphQL to see what is being boilerplated.

## Scalars

These are custom GraphQL Scalars created to assist in defining GraphQL Types.

In order to use the custom Scalars you will need to add them to the resolvers and Type definition for your service.
```js
const { Scalars } = require('common-graphql-artifacts');
const resolvers = {
  ...Scalars.Resolvers,
  // other resolvers
};
const typeDefs = `
  ${Scalar.Types}
  " other definitions "
`;
```

If you just want to use a single resolver your code should look like this:
```js
const Timestamp = require('common-graphql/scalars/timestamp);
const resolvers = {
  ...Timestamp.resolver,
  // other resolvers
};
const typeDefs = `
  ${Timestamp.defnition}
  " other definitions "
`;
```

### Timestamp

A Scalar representing a date as Unix milliseconds since the Epoch (January 1, 1970).
GraphQL does not have an integer Scalar that allows anything larger than a 32 bit value so use this Scalar instead.

### Email

A Scalar representing a valid email address.
Under the hood this scalar is validated with the (validator)[https://github.com/validatorjs/validator.js.git] module.

## Types

### Audit
```
scalar Timestamp

type AuditUser {
  id: ID,
  username: String,
  organizationName: String,
  organizationId: ID,
}

type AuditDateTime {
  timestamp: Timestamp,
  iso8601: String,
  server: String
}

type Audit {
  user: AuditUser,
  date: AuditDateTime
}
```

This Type provides a common Audit tracking field. In order to use this Type you will need to add the Timestamp resolver to your GraphQL microservice.