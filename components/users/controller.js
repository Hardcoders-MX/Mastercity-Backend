const service = require('./service');

function addUser(name) {
  if(!name) {
    return Promise.reject('Invalid name');
  }

  const user = {
    user: name,
  }

  return service.add(user);
}

module.exports = {
  addUser
}
