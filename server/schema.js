/*
 * Get count value: curl -XPOST -H "Content-Type:application/graphql"  -d 'query { count }' http://localhost:3000/graphql
 *
 * Get schema informations: curl -XPOST -H "Content-Type:application/graphql"  -d '{ __schema { queryType { name, fields { name, description } } } }' http://localhost:3000/graphql
 *
 * Increment count value: curl -XPOST -H "Content-Type:application/graphql"  -d 'mutation { increment }' http://localhost:3000/graphql
 *
 */

import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt
} from 'graphql'

let count = 10

let schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      count: {
        type: GraphQLInt,
        description: 'Test description',
        resolve: function() {
          return count;
        }
      }
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
      increment: {
        type: GraphQLInt,
        description: 'Test 2 description',
        resolve: function() {
          count += 1
          return count
        }
      }
    }
  })
});

export default schema
