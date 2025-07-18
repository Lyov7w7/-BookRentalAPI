const express = require('express');
const router = express.Router();
const pool = require('../configure/db');
const control = require('../controller/usercontroller');


router.post('/users', control.adduser);

module.exports = router;