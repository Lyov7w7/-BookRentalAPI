const pool = require('../configure/db');

async function getBooks(req, res) {
  try {
    const result = await pool.query('SELECT * FROM books');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}
async function getBookById(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Book not found');
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}
async function addBook(req, res) {
  const { title, author, published_date } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO books (title, author, published_date) VALUES ($1, $2, $3) RETURNING *',
      [title, author, published_date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}
async function updateBook(req, res) {
  const { id } = req.params;
  const { title, author, published_date } = req.body;
  try {
    const result = await pool.query(
      'UPDATE books SET title = $1, author = $2, published_date = $3 WHERE id = $4 RETURNING *',
      [title, author, published_date, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send('Book not found');
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}
async function deleteBook(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM books WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Book not found');
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}

module.exports = { getBooks, getBookById, addBook, updateBook, deleteBook };
