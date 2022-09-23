const { GraphQLNonNull, GraphQLList, GraphQLInt, GraphQLString } = require('graphql');
const { BookType, AuthorType } = require('../types/types');
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

module.exports = {
  authorFields,
  bookFields,
  rootQueryFields,
  mutationQueryFields
}