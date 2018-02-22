const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const bcryptSalt = 10;
const passport = require('passport');
const configurePassport = require('../helpers/passport');
const { signupController } = require('../controllers/auth');
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

router.post('/signup', signupController);

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
router.get('/validate', isLoggedIn('/'), (req, res, next) => {
  res.redirect(`/${req.user.username}`);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
