const db = require('mongoose');
const debug = require('debug')('app:db');

db.Promise = global.Promise;

async function connect(url) {
  try {
    await db.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    debug('Database successfully connected!');
  } catch (err) {
    debug(`Error establishing a database connection: \n ${err}`);
  }
}

module.exports = {
  connect,
};
