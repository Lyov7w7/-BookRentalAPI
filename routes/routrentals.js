const express = require('express');
const router = express.Router();
const pool = require('../configure/db');
const control = require('../controller/rentalscontroll');

router.post('/rentals', control.createRental);
router.put('/rentals/:id/return', control.returnRental);

module.exports = router;