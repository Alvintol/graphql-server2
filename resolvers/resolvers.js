const { books, authors } = require('../data/data');

const bookResolve = () => books;
const authorResolve = () => authors;

const addBookResolve = (parent, args) => {
  const book = {
    id: books.length + 1,
    name: args.name,
    authorId: args.authorId
  };
  books.push(book)
  return book
}

const addAuthorResolve = (parent, args) => {
  const author = {
    id: authors.length + 1,
    name: args.name,
  };
  authors.push(author)
  return author
}

module.exports = {
  bookResolve,
  addBookResolve,
  authorResolve,
  addAuthorResolve
}