const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Company = require('../models/company');

function configurePassport() {
  passport.serializeUser((user, cb) => {
    /* eslint-disable */
    cb(null, user._id);
    /* eslint-enable */
  });

  passport.deserializeUser((id, cb) => {
    Company.findOne({ _id: id }, (err, user) => {
      if (err) { return cb(err); }
      return cb(null, user);
    });
  });

  passport.use(new LocalStrategy({
    passReqToCallback: true,
  }, (req, username, password, next) => {
    Company.findOne({ username }, (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(null, false, { message: 'Incorrect username' });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return next(null, false, { message: 'Incorrect password' });
      }

      return next(null, user);
    });
  }));
}

module.exports = configurePassport;
