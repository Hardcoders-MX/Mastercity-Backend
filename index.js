const express = require('express');
const logger = require('morgan');
const debug = require('debug')('app');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
  res.send('Hello world from project MORO')
});

app.listen(3000, () => {
  debug('server is runing in http://localhost:3000')
});
