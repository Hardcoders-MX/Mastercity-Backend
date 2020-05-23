const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('morgan');
const db = require('./databases/mongodb');

const { info } = require('./utils/debug');
const routes = require('./routes');
const config = require('./config');

const { logErrors } = require('./utils/errorsHandlers');
const {
  mongodbUri, user, password, host, name,
} = config.db;

let MONGODB_URI = mongodbUri;

if (config.srv.mode === 'development') {
  MONGODB_URI = `mongodb+srv://${user}:${password}@${host}/${name}?retryWrites=true&w=majority`;
}

db.connect(MONGODB_URI);

const app = express();
app.use(helmet());
app.use(cors());

app.use(logger('dev', { stream: { write: (msg) => info(msg) } }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello world from project MORO');
});

routes(app);

app.use(logErrors);

app.listen(config.srv.port, () => {
  info(`server runing in http://localhost:${config.srv.port}`);
});
