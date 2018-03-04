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
          Campaign.find({ company_id: company._id })
            .populate('company_id')
            .populate('influencer_id')
            .sort({ updated_at: -1 })
            .exec((err, campaigns) => {
              res.render('profile/company/show', { infoUser, company, campaigns, userRol, moment, layout: 'layouts/profile' });
            });
        });
    });
  } else if (userRol === 'companies') {
    Company.findById(userId, (err, infoUser) => {
      if (err) { next(err); }
      res.redirect(`/${req.user.username}`);
    });
  }
});


module.exports = router;
