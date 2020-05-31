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

This function is accessible via:
```js
const { Functions } = require('common-graphql-artifacts'); // Functions.createScalar
const { Functions: { createScalar } } = require('common-graphql-artifacts');
const { createScalar } = require('common-graphql-artifacts/functions/');
const createScalar = require('common-graphql-artifacts/functions/createScalar');
```


### createAuditRecord

Provides a plain object formatted for the custom GraphQL Audit Type.
If passed a Unix millisecond timestamp (the number of milliseconds since the Unix Epoch) the dates created in the object will be based off of that;
otherwise, they will based on the current date and time on the server.

This funtion is accessible via:
```js
const { Functions } = require('common-graphql-artifacts'); // Functions.createAuditRecord
const { Functions: { createAuditRecord } } = require('common-graphql-artifacts');
const { createAuditRecord } = require('common-graphql-artifacts/functions/');
const createAuditRecord = require('common-graphql-artifacts/functions/createAuditRecord');
```

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

These are custom Types created to provide common Types across microservices.

### Audit
```
type AuditDateTime {
  timestamp: Timestamp,
  iso8601: String,
  server: String
}

type Audit {
  date: AuditDateTime
}
```

This Type provides a common Audit tracking field.
In order to use this Type you will need to add the Timestamp resolver to your GraphQL microservice.
Also, if there are fields missing for your purposes, you will need to extend Audit.