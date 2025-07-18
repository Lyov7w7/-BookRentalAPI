const express = require('express');
const router = express.Router();
const control = require('../controller/bookcontroll');

router.get('/books', control.getBooks);
router.get('/books/:id', control.getBookById); 
router.post('/books', control.addBook);
router.put('/books/:id', control.updateBook);
router.delete('/books/:id', control.deleteBook);
module.exports = router;