const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const bcryptSalt = 10;
const passport = require('passport');
const configurePassport = require('../helpers/passport');

const Company = require('../models/company');
const Influencer = require('../models/influencer');

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
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true,
  passReqToCallback: true,
}));

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

module.exports = router;
