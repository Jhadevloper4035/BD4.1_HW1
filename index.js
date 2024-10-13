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
    filename: 'database.sqlite',
    driver: sqlite3.Database,
  });
  return db;
}

initDb();

async function fetchAllBooks() {
  let query = 'SELECT * FROM books';
  let response = await db.all(query);
  return { books: response };
}

async function fetchBooksByAuthor(author){
  let query = "SELECT * FROM books WHERE author = ? "
  let response = await db.all(query,[author]);
  return {books : response}
}

async function fetchBooksByGenre(genre){
  let query = "SELECT * FROM books WHERE genre = ? "
  let response = await db.all(query,[genre]);
  return{books : response}
}

async function fetchBooksByPublicationYear(publication_year){
  let query = 'SELECT * FROM books WHERE publication_year = ? '
  let response = await db.all(query,[publication_year]);
  return {books : response}
}

app.get('/books', async (req, res) => {
  const result = await fetchAllBooks();
  res.status(200).json(result);
});

app.get('/books/author/:author' , async(req,res)=>{
  let author = req.params.author;
let result = await fetchBooksByAuthor(author);
res.status(200).json(result)
})

app.get('/books/genre/:genre' , async(req,res)=>{
  let genre = req.params.genre;
  let result = await fetchBooksByGenre(genre);
  res.status(200).json(result);
})

app.get('/books/publication_year/:year' , async(req,res)=>{
  let publication_year = parseInt(req.params.year);
  let result = await fetchBooksByPublicationYear(publication_year)
  res.status(200).json(result);
})


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
