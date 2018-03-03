const express = require('express');
const router = express.Router();
/* eslint-disable */
const isLoggedIn = require('../helpers/middlewares').isLoggedIn;
/* eslint-enable */
const Company = require('../models/company');
const Influencer = require('../models/influencer');
const Campaign = require('../models/campaign');
const moment = require('moment');

router.get('/:company', isLoggedIn('/'), (req, res, next) => {
  const companyName = req.params.company;
  /* eslint-disable */
  const userId = req.user._id;
  const userRol = req.user.collection.collectionName;
  /* eslint-enable */
  if (userRol === 'influencers') {
    Influencer.findById(userId, (err, infoUser) => {
      if (err) { next(err); }
      Company.findOne({ username: companyName })
        .exec((error, company) => {
          res.render('profile/company/show', { infoUser, company, userRol, layout: 'layouts/profile' });
        });
    });
  } else if (userRol === 'companies') {
    Company.findById(userId, (err, infoUser) => {
      if (err) { next(err); }
      res.render('profile/company/main', { infoUser, userRol, layout: 'layouts/profile' });
    });
  }
});


module.exports = router;
