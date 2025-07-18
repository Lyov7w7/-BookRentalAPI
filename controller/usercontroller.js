
const pool = require('../configure/db');
async function adduser(req, res) {
    const { name, email } = req.body;
    try { 
    const result = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}

module.exports = { adduser };