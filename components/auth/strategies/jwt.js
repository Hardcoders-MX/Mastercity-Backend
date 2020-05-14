const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');

const serviceUser = require('../service');
const config = require('../../../config');

passport.use(
  new Strategy({
    secretOrKey: config.auth.authJwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  // eslint-disable-next-line consistent-return
  (async (tokenPayload, cb) => {
    try {
      const user = await serviceUser.getUser({ email: tokenPayload.email });
      if (!user) cb('Usuario Not Found');

      delete user.password;

      cb(null, { ...user, scopes: tokenPayload.scopes });
    } catch (error) {
      return cb(error);
    }
  // eslint-disable-next-line comma-dangle
  }))
);
