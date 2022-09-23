const findOneBook = (parent, args) =>
  books.find(book =>
    book.id === args.id)
const findBooks = author =>
  books.filter(book =>
    author.id === book.authorId);

const findOneAuthor = (parent, args) =>
  authors.find(author =>
    author.id === args.id);
const findAuthors = book =>
  authors.find(author =>
    author.id === book.authorId);

module.exports = {
  findOneBook,
  findBooks,
  findOneAuthor,
  findAuthors
}