const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

const app = express();
const port = 3010;

app.use(cors());
app.use(express.json());

let db;

async function initDb() {
  db = await open({
    filename: './BD4.1_HW1/books_database.sqlite',
    driver: sqlite3.Database,
  });
  return db;
}

initDb();

async function fetchAllBooks() {
  const query = 'SELECT * FROM books';
  const response = await db.all(query);
  return { books: response };
}

app.get('/', async (req, res) => {
  const result = await fetchAllBooks();
  res.status(200).json(result);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
