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

/* GET users listing. */
router.get('/', isLoggedIn('/login'), (req, res, next) => {
  res.render('profile', req.user);
});

router.post('/', (req, res, next) => {
  /* eslint-disable */
  const userId = req.user._id;
  /* eslint-enable */
  const igUserName = req.body.name;
  callInstagram(igUserName, (err, iguser) => {
    if (err) {
      // console.log('err: ', err);
      res.render('profile', {}); // flash notification
    } else {
      Influencer.findByIdAndUpdate(userId, { instagram: iguser }, (errUpdate) => {
        if (errUpdate) { return next(errUpdate); }
        return next;
      });
      res.render('profile', { iguser });
    }
  });
});

module.exports = router;
