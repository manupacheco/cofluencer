const express = require('express');
const router = express.Router();
/* eslint-disable */
const isLoggedIn = require('../helpers/middlewares').isLoggedIn;
/* eslint-enable */
const Company = require('../models/company');
const Influencer = require('../models/influencer');
const Campaign = require('../models/campaign');
const moment = require('moment');

router.get('/:influencer', isLoggedIn('/'), (req, res, next) => {
  const influencerName = req.params.influencer;
  /* eslint-disable */
  const userId = req.user._id;
  const userRol = req.user.collection.collectionName;
  const contact = 'influencer';
  /* eslint-enable */
  if (userRol === 'companies') {
    Company.findById(userId, (err, infoUser) => {
      if (err) { next(err); }
      Influencer.findOne({ username: influencerName })
        .exec((error, influencer) => {
          res.render('profile/influencer/show', { infoUser, influencer, userRol, contact, layout: 'layouts/profile' });
        });
    });
  } else if (userRol === 'influencers') {
    Influencer.findById(userId, (err, infoUser) => {
      if (err) { next(err); }
      res.redirect(`/${req.user.username}`);
    });
  }
});

module.exports = router;
