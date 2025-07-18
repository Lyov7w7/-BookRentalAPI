const booktable =  pool.query(
  `CREATE TABLE IF NOT EXISTS books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    published_date DATE NOT NULL,
    is_available BOOLEAN DEFAULT TRUE
  )`
);

module.exports = { booktable } ;