const express = require('express');
const logger = require('morgan');
const debug = require('debug')('app');

const config = require('./config');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
  res.send('Hello world from project MORO')
});

app.listen(config.srv.port, () => {
  debug(`server runing in http://localhost:${config.srv.port}`);
});
