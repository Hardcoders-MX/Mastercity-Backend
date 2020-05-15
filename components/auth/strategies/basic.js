
const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const bcrypt = require('bcrypt');

const usersService = require('../service');

passport.use(
  new BasicStrategy((async (email, password, cb) => {
    try {
      const user = await usersService.getUser(email);

      if (!user) return cb('User not found', false);
      if (!(await bcrypt.compare(password, user.password))) return cb('Password invalid', false);

      user.password = '';

      return cb(null, user);
    } catch (error) {
      return cb(error);
    }
  })),
);
