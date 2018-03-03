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
  /* eslint-enable */
  if (userRol === 'companies') {
    Company.findById(userId, (err, infoUser) => {
      if (err) { next(err); }
      Influencer.findOne({ username: influencerName })
        .exec((error, influencer) => {
          console.log('INFLUENCER: ', influencer);
          res.render('profile/influencer/show', { infoUser, influencer, userRol, layout: 'layouts/profile' });
        });
    });
  } else if (userRol === 'influencers') {
    Influencer.findById(userId, (err, infoUser) => {
      if (err) { next(err); }
      res.render('profile/influencer/main', { infoUser, userRol, layout: 'layouts/profile' });
    });
  }
});

module.exports = router;
