const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FbStrategy = require('passport-facebook').Strategy;

const Company = require('../models/company');
const Influencer = require('../models/influencer');

function configurePassport() {
  passport.serializeUser((user, cb) => {
    /* eslint-disable */
    cb(null, { id: user._id, role: user.collection.collectionName });
    /* eslint-enable */
  });

  passport.deserializeUser((user, cb) => {
    if (user.role === 'influencers') {
      Influencer.findOne({ _id: user.id }, (errOne, influencer) => {
        if (errOne) {
          return cb(errOne);
        }
        return cb(null, influencer);
      });
    } else {
      Company.findOne({ _id: user.id }, (errTwo, company) => {
        if (errTwo) {
          return cb(errTwo);
        }
        return cb(null, company);
      });
    }
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
  /* eslint-disable */
  passport.use(new FbStrategy({
    clientID: '1805333172833119',
    clientSecret: 'a411a8db87cd30e9517b65ef07036d30',
    callbackURL: '/auth/facebook/callback',
  }, (accessToken, refreshToken, profile, done) => {
    Influencer.findOne({ facebookID: profile.id }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null, user);
      }
  
      const newUser = new Influencer({
        facebookID: profile.id,
      });
  
      newUser.save((err) => {
        if (err) {
          return done(err);
        }
        done(null, newUser);
      });
    });
  
  }));
}

module.exports = configurePassport;
