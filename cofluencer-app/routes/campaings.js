const express = require('express');
const router = express.Router();
/* eslint-disable */
const isLoggedIn = require('../helpers/middlewares').isLoggedIn;
/* eslint-enable */
const Company = require('../models/company');
const Influencer = require('../models/influencer');
const Campaing = require('../models/campaign');

router.get('/', isLoggedIn('/login'), (req, res, next) => {
  const infoUser = req.user;
  /* eslint-disable */
  const userId = req.user._id;
  const userRol = req.user.collection.collectionName;
  /* eslint-enable */
  if (userRol === 'companies') {
    Campaing.find({ company_id: userId })
      .sort({ updatedAt: -1 })
      .exec((err, campaings) => {
        res.render('campaings/list', { campaings, infoUser });
      });
  } else if (userRol === 'influencers') {
    Campaing.find({})
      .sort({ updatedAt: -1 })
      .exec((err, campaings) => {
        res.render('campaings/list', { campaings, infoUser });
      });
  }
});

router.get('/new', isLoggedIn('/login'), (req, res, next) => {
  const userRol = req.user.collection.collectionName;
  const infoUser = req.user;
  if (userRol === 'companies') {
    res.render('campaings/new', { infoUser });
  } else {
    res.redirect(`/${req.user.username}/campaings`);
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
  Campaing.create(campaign, (err, docs) => {
    if (err) {
      next(err);
    } else {
      res.redirect(`/${req.user.username}/campaings`);
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
    Campaing.find({ influencer_id: userId })
      .exec((err, campaings) => {
        res.render('campaings/me', { infoUser, campaings });
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
    Campaing.findByIdAndUpdate(campaignId, { $push: { influencer_id: userId } })
      .exec((err) => {
        res.redirect(`/${req.user.username}/campaings`);
      });
  } else if (userRol === 'companies') {
    res.redirect(`/${req.user.username}/campaings`);
  }
});
