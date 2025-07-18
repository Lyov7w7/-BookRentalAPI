const pool = require('../configure/db');

const rentalstable =  pool.query(
  `CREATE TABLE IF NOT EXISTS rentals (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    book_id INTEGER REFERENCES books(id),
    rental_date DATE NOT NULL,
    return_date DATE
  )`
);
module.exports = rentalstable;