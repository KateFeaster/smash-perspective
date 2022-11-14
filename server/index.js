const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, '../client/dist')));

app.listen(3000, () => {
  'Server listening on port: 3000';
});
