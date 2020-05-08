const db = require('mongoose');
const { info, error } = require('../utils/debug');

db.Promise = global.Promise;

async function connect(url) {
  try {
    await db.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    info('Database successfully connected!');
  } catch (err) {
    error(`Error establishing a database connection: \n ${err}`);
  }
}

module.exports = {
  connect,
};
