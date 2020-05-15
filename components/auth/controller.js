const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const serviceUser = require('./service');
const serviceApiKeys = require('./serviceApiKeys');
const { success } = require('../../routes/response');

// Basic startegy
require('./strategies/basic');

const create = async (req, res, next) => {
  const { body: user } = req;

  try {
    const createdUser = await serviceUser.add(user);
    let data = '';
    // eslint-disable-next-line no-unused-expressions
    config.srv.mode === 'development' ? data = createdUser : data = '';
    success(res, 'User created', data, 201);
  } catch (error) {
    next(error);
  }
};

const signin = (req, res, next) => {
  const { apiKeyToken } = req.body;

  if (!apiKeyToken) next('apiKeyToken is required');

  passport.authenticate('basic', (error, user) => {
    try {
      if (error || !user) next('an error');

      req.login(user, { session: false }, async (err) => {
        if (err) next(err);

        const apiKey = await serviceApiKeys.getApiKey({ token: apiKeyToken });

        if (!apiKey) next('boom.unauthorized');

        const { _id: id, email } = user;

        const payload = {
          sub: id,
          email,
          scopes: apiKey.scopes,
        };

        const token = jwt.sign(payload, config.auth.authJwtSecret, {
          expiresIn: '15m',
        });

        return res.status(200).json({ token, user: { id, email } });
      });
    } catch (err) {
      next(err);
    }
  })(req, res, next);
};

module.exports = {
  create,
  signin,
};
