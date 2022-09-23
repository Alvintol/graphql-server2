const { GraphQLObjectType } = require('graphql');
const { authorFields, bookFields, rootQueryFields, mutationQueryFields } = require('../fields/fields');

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
});

module.exports = {
  AuthorType,
  BookType,
  RootQueryType,
  RootMutationType
}