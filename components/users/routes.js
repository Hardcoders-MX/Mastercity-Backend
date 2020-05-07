const express = require('express');
const router = express.Router();

const controller = require('./controller');

router.post('/', function(req, res) {
  const { body: user } = req;

  controller.addUser(user)
    .then((data) => {
      console.log(data);
      res.status(201);
      res.send(data);
    })
    .catch((err) => {
      console.error('500: Internal Error', err);
    });
});

module.exports = router;
