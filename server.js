const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql');
const {
  findOneBook,
  findBooks,
  findOneAuthor,
  findAuthors } = require('./helpers/helperFunc');
const {
  bookResolve,
  addBookResolve,
  authorResolve,
  addAuthorResolve } = require('./resolvers/resolvers');
const app = express();

const authorFields = () => ({
  id: {
    type: GraphQLNonNull(GraphQLInt)
  },
  name: {
    type: GraphQLNonNull(GraphQLString)
  },
  books: {
    type: new GraphQLList(BookType),
    resolve: findBooks
  },
});

const bookFields = () => ({
  id: {
    type: GraphQLNonNull(GraphQLInt)
  },
  name: {
    type: GraphQLNonNull(GraphQLString)
  },
  authorId: {
    type: GraphQLNonNull(GraphQLInt)
  },
  author: {
    type: AuthorType,
    resolve: findAuthors
  }
});

const rootQueryFields = () => ({
  book: {
    type: BookType,
    description: 'A Single book',
    args: {
      id: {
        type: GraphQLInt
      }
    },
    resolve: findOneBook
  },
  books: {
    type: new GraphQLList(BookType),
    description: 'List of Books',
    resolve: bookResolve
  },
  author: {
    type: AuthorType,
    description: 'A Single Author',
    args: {
      id: {
        type: GraphQLInt
      }
    },
    resolve: findOneAuthor
  },
  authors: {
    type: new GraphQLList(AuthorType),
    description: 'List of Authors',
    resolve: authorResolve
  },
});

const mutationQueryFields = () => ({
  addBook: {
    type: BookType,
    description: 'Add a book',
    args: {
      name: {
        type: GraphQLNonNull(GraphQLString)
      },
      authorId: {
        type: GraphQLNonNull(GraphQLInt)
      }
    },
    resolve: addBookResolve
  },
  addAuthor: {
    type: AuthorType,
    description: 'Add an Author',
    args: {
      name: {
        type: GraphQLNonNull(GraphQLString)
      }
    },
    resolve: addAuthorResolve
  }
});

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