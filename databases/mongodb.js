const db = require('mongoose');

db.Promise = global.Promise;

async function connect(url) {
  try {
    await db.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database successfully connected!');

  } catch (err) {
    console.error(`Error establishing a database connection: \n ${err}`);
  }
}

module.exports = {
  connect
}