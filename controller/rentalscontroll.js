const pool = require('../configure/db');

async function createRental(req, res) {
  const { userId, bookId, rentalDate, returnDate } = req.body;

  try {
   

    const result = await pool.query(
      'INSERT INTO rentals (user_id, book_id, rental_date, return_date) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, bookId, rentalDate, returnDate]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating rental:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
async function returnRental(req, res) {
  const rentalId = req.params.id;

  try {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    const result = await pool.query(
      'UPDATE rentals SET returned = true WHERE id = $1 RETURNING *',
      [rentalId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Rental not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error returning rental:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { createRental, returnRental };