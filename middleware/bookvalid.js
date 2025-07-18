const pool = require('../configure/db');

async function isAvailable(req, res, next) {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Book not found');
    }
    if (!result.rows[0].is_available) {
      return res.status(400).send('Book is not available');
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}
module.exports = isAvailable;