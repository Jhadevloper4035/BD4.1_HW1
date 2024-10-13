const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      author TEXT,
      genre TEXT,
      publication_year INTEGER
    )`
  );

  // Insert random book data
  const stmt = db.prepare(
    'INSERT INTO books (title, author, genre, publication_year) VALUES (?, ?, ?, ?)'
  );

  let books = [
    {
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      genre: 'Fiction',
      publication_year: 1960,
    },
    {
      title: '1984',
      author: 'George Orwell',
      genre: 'Dystopian',
      publication_year: 1949,
    },
    {
      title: 'Animal Farm',
      author: 'George Orwell',
      genre: 'Political Satire',
      publication_year: 1945,
    },
    {
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      genre: 'Fiction',
      publication_year: 1813,
    },
    {
      title: 'Green Eggs and Ham',
      author: 'Dr. Seuss',
      genre: "Children's literature",
      publication_year: 1960,
    },
  ];

  for (let book of books) {
    stmt.run(book.title, book.author, book.genre, book.publication_year);
  }

  stmt.finalize();

  // Close the database connection
  db.close();
});
