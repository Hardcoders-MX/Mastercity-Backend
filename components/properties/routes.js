const express = require('express');
const controller = require('./controller');

const routes = express.Router();

routes.get('/', controller.index);
routes.post('/', controller.create);
routes.get('/:id', controller.show);
routes.patch('/:id', controller.update);
routes.delete('/:id', controller.destroy);

module.exports = routes;
