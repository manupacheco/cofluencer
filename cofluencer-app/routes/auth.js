const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const bcryptSalt = 10;
const passport = require('passport');
const configurePassport = require('../helpers/passport');
const { signupController } = require('../controllers/auth');
const { isLoggedIn } = require('../helpers/middlewares');
const { callInstagram } = require('../helpers/middlewares');

const Company = require('../models/company');
const Influencer = require('../models/influencer');

router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/validate',
  failureRedirect: '/',
}));

router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

router.post('/signup', signupController);

router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/validate',
  failureRedirect: '/',
  failureFlash: true,
  passReqToCallback: true,
}));

// add username path url
router.get('/validate', isLoggedIn('/'), (req, res, next) => {
  const userRol = req.user.collection.collectionName;
  if (userRol === 'influencers') {
    if (req.user.instagram.username == null) {
      res.render('auth/login_instagram');
    } else {
      req.flash('info', 'Flash is back!');
      res.redirect(`/${req.user.username}`);
    }
  } else if (userRol === 'companies') {
    res.redirect(`/${req.user.username}`);
  }
});

router.post('/search_instagram/:username', isLoggedIn('/'), (req, res, next) => {
  const igUser = req.params.username;
  callInstagram(igUser, (err, result) => {
    if (err) {
      res.redirect('/'); // flash notification
    } else {
      res.status(200).json(result);
    }
  });
});

router.post('/add_instagram/:username', isLoggedIn('/'), (req, res, next) => {
  const igUser = req.params.username;
  /* eslint-disable */
  const userId = req.user._id;
  /* eslint-enable */
  Influencer.findByIdAndUpdate(userId, { instagram: { username: igUser } }, (err, influencer) => {
    if (err) { next(err); }
    // res.redirect(`/${req.user.username}`);
    res.status(200).json(req.user.username);
  });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
