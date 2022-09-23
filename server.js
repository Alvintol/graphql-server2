const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP
const {
  GraphQLSchema,
  GraphQLObjectType
} = require('graphql');
const app = express();


const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: 'This represents an author of a book',
  fields: authorFields
});

const BookType = new GraphQLObjectType({
  name: 'Book',
  description: 'This represents a book written by an author',
  fields: bookFields
});

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: rootQueryFields
});

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: mutationQueryFields
})

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
});

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

app.listen(5000, () => console.log('Server Running...'));