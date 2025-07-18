const express = require('express');
const isAvailable = require('./middleware/bookvalid');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/user', require('./routes/routuser'));
app.use('/rentals', require('./routes/routrentals'));
app.use(isAvailable);
app.use('/book', require('./routes/routbook'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
