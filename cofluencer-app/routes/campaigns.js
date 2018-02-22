const express = require('express');
const router = express.Router();
/* eslint-disable */
const isLoggedIn = require('../helpers/middlewares').isLoggedIn;
/* eslint-enable */
const Company = require('../models/company');
const Influencer = require('../models/influencer');
const Campaign = require('../models/campaign');

router.get('/', isLoggedIn('/login'), (req, res, next) => {
  const infoUser = req.user;
  /* eslint-disable */
  const userId = req.user._id;
  const userRol = req.user.collection.collectionName;
  /* eslint-enable */
  if (userRol === 'companies') {
    Campaign.find({ company_id: userId })
      .sort({ updated_at: -1 })
      .exec((err, campaigns) => {
        res.render('campaigns/list', { campaigns, infoUser, layout: 'layouts/profile' });
      });
  } else if (userRol === 'influencers') {
    Campaign.find({})
      .sort({ updated_at: -1 })
      .exec((err, campaigns) => {
        res.render('campaigns/list', { campaigns, infoUser, layout: 'layouts/profile' });
      });
  }
});

router.get('/new', isLoggedIn('/login'), (req, res, next) => {
  const userRol = req.user.collection.collectionName;
  const infoUser = req.user;
  if (userRol === 'companies') {
    res.render('campaigns/new', { infoUser, layout: 'layouts/profile' });
  } else {
    res.redirect(`/${req.user.username}/campaigns`);
  }
});

router.post('/', isLoggedIn('/login'), (req, res, next) => {
  const campaign = {
    /* eslint-disable */
    company_id: req.user._id,
    /* eslint-enable */
    title: req.body.title,
    state: req.body.state,
    description: req.body.description,
  };
  Campaign.create(campaign, (err, docs) => {
    if (err) {
      next(err);
    } else {
      res.redirect(`/${req.user.username}/campaigns`);
    }
  });
});

module.exports = router;

router.get('/me', isLoggedIn('/login'), (req, res, next) => {
  /* eslint-disable */
  const infoUser = req.user;
  const userId = req.user._id;
  const userRol = req.user.collection.collectionName;
  const campaignId = req.params._id;
  /* eslint-enable */
  if (userRol === 'influencers') {
    Campaign.find({ influencer_id: userId })
      .sort({ updated_at: -1 })
      .exec((err, campaigns) => {
        res.render('campaigns/me', { infoUser, campaigns, layout: 'layouts/profile' });
      });
  }
});

router.post('/:_id/follow', isLoggedIn('/login'), (req, res, next) => {
  /* eslint-disable */
  const userId = req.user._id;
  const userRol = req.user.collection.collectionName;
  const campaignId = req.params._id;
  /* eslint-enable */
  if (userRol === 'influencers') {
    Campaign.findByIdAndUpdate(campaignId, { $push: { influencer_id: userId } })
      .exec((err, result) => {
        res.status(200).json(result);
      });
  } else if (userRol === 'companies') {
    res.redirect(`/${req.user.username}/campaigns`);
  }
});

router.post('/:_id/unfollow', isLoggedIn('/login'), (req, res, next) => {
  /* eslint-disable */
  const userId = req.user._id;
  const userRol = req.user.collection.collectionName;
  const campaignId = req.params._id;
  /* eslint-enable */
  if (userRol === 'influencers') {
    Campaign.findByIdAndUpdate(campaignId, { $pullAll: { influencer_id: [userId] } })
      .exec((err, result) => {
        res.status(200).json(result);
      });
  } else if (userRol === 'companies') {
    res.redirect(`/${req.user.username}/campaigns`);
  }
});
