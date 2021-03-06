const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const serviceUser = require('./service');
const serviceApiKeys = require('./serviceApiKeys');
const { success, unsuccess } = require('../../routes/response');
const sendEmail = require('../../utils/mail');

// Basic startegy
require('./strategies/basic');

const create = async (req, res, next) => {
  const { body: user } = req;

  try {
    const userExists = await serviceUser.getUser(user.email);
    if (userExists.email === user.email) {
      unsuccess(res, 'Email registred', null, 424);
    } else {
      const createdUser = await serviceUser.add(user);

      const template = `<html>
          <body>
            <h1>Congratulations ${createdUser.firstName}</h1>
            <p>Now you can enjoy all the benefits of Mastercity</p>
          </body>
        </html>
      `;
      await sendEmail(createdUser.email, 'Welcome to Mastercity', template);
      let data = '';
      // eslint-disable-next-line no-unused-expressions
      config.srv.mode === 'development' ? data = createdUser : data = '';
      success(res, 'User created', data, 201);
    }
  } catch (error) {
    next(error);
  }
};

const signin = (req, res, next) => {
  passport.authenticate('basic', (error, user) => {
    try {
      if (error || !user) next('an error');

      req.login(user, { session: false }, async (err) => {
        if (err) next(err);

        let apiKeyToken;
        switch (user.profileType) {
          case 'admin':
            apiKeyToken = config.auth.adminApiKeyToken;
            break;

          case 'offerer':
            apiKeyToken = config.auth.offererApiKeyToken;
            break;

          case 'applicant':
            apiKeyToken = config.auth.applicantApiKeyToken;
            break;

          default:
            next('Permissions don´t match');
            break;
        }

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

        return res.status(200).json({ token, user });
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
