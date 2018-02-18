const express = require('express');
const router = express.Router();
const passport = require('passport');
const configurePassport = require('../helpers/passport');
/* eslint-disable */
const isLoggedIn = require('../helpers/middlewares').isLoggedIn;
const callInstagram = require('../helpers/middlewares').callInstagram;
/* eslint-enable */
const Company = require('../models/company');
const Influencer = require('../models/influencer');

/* GET users profile. */
router.get('/:username', isLoggedIn('/login'), (req, res, next) => {
  /* eslint-disable */
  const userId = req.user._id;
  const userRol = req.user.collection.collectionName
  /* eslint-enable */
  if (userRol === 'influencers') {
    const igUserName = req.user.instagram.username;
    callInstagram(igUserName, (err, iguser) => {
      if (err) {
        res.render('profile-influencer', {}); // flash notification
      } else {
        Influencer.findByIdAndUpdate(userId, { instagram: iguser }, (errUpdate) => {
          if (errUpdate) { return next(errUpdate); }
          return next;
        });
        res.render('profile-influencer', { iguser });
      }
    });
  } else if (userRol === 'companies') {
    res.render('profile-company', req.user);
  }
});

router.post('/:username', isLoggedIn('/login'), (req, res, next) => {
  /* eslint-disable */
  const userId = req.user._id;
  const userRol = req.user.collection.collectionName
  /* eslint-enable */
  const igUserName = req.body.name;
  callInstagram(igUserName, (err, iguser) => {
    if (err) {
      res.render('profile-company', {}); // flash notification
    } else {
      res.render('profile-company', { iguser });
    }
  });
});

module.exports = router;
