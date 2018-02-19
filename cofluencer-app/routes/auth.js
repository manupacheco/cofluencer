const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const bcryptSalt = 10;
const passport = require('passport');
const configurePassport = require('../helpers/passport');
/* eslint-disable */
const isLoggedIn = require('../helpers/middlewares').isLoggedIn;
/* eslint-enable */

const Company = require('../models/company');
const Influencer = require('../models/influencer');

router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/validate',
  failureRedirect: '/',
}));

// login instagram

router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

router.post('/signup', (req, res, next) => {
  const { username, email, password } = req.body;

  if (username === '' || email === '' || password === '') {
    const error = 'User or password can not be empty';
    res.render('auth/signup', { error });
  } else {
    Company.findOne({ username })
      .then((company) => {
        if (!company) {
          const salt = bcrypt.genSaltSync(bcryptSalt);
          const hashPass = bcrypt.hashSync(password, salt);

          const newCompany = {
            username,
            email,
            password: hashPass,
          };

          Company.create(newCompany)
            .then((result) => {
              res.redirect('/');
            })
            .catch((err) => {
              const error = 'Something went wrong';
              res.render('auth/signup', { error });
            });
        } else {
          const error = 'This user already exists';
          res.render('auth/signup', { error });
        }
      })
      .catch((err) => {
        next(err);
      });
  }
});

router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/validate',
  failureRedirect: '/login',
  failureFlash: true,
  passReqToCallback: true,
}));

// add username path url
router.get('/validate', isLoggedIn('/login'), (req, res, next) => {
  res.redirect(`/${req.user.username}`);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
