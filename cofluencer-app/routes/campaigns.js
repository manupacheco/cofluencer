const express = require('express');
const router = express.Router();
/* eslint-disable */
const isLoggedIn = require('../helpers/middlewares').isLoggedIn;
/* eslint-enable */
const Company = require('../models/company');
const Influencer = require('../models/influencer');
const Campaign = require('../models/campaign');
const moment = require('moment');

router.get('/', isLoggedIn('/'), (req, res, next) => {
  const infoUser = req.user;
  /* eslint-disable */
  const userId = req.user._id;
  const userRol = req.user.collection.collectionName;
  /* eslint-enable */
  if (userRol === 'companies') {
    Campaign.find({ company_id: userId })
      .populate('company_id')
      .populate('influencer_id')
      .sort({ updated_at: -1 })
      .exec((err, campaigns) => {
        res.render('campaigns/list', { campaigns, infoUser, moment, userRol, layout: 'layouts/profile' });
      });
  } else if (userRol === 'influencers') {
    Campaign.find({})
      .populate('company_id')
      .sort({ updated_at: -1 })
      .exec((err, campaigns) => {
        res.render('campaigns/list', { campaigns, infoUser, moment, userRol, layout: 'layouts/profile' });
      });
  }
});

router.get('/new', isLoggedIn('/'), (req, res, next) => {
  const userRol = req.user.collection.collectionName;
  const infoUser = req.user;
  if (userRol === 'companies') {
    res.render('campaigns/new', { infoUser, userRol, moment, layout: 'layouts/profile' });
  } else {
    res.redirect(`/${req.user.username}/campaigns`);
  }
});

router.post('/', isLoggedIn('/'), (req, res, next) => {
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
      res.redirect(`/${req.user.username}`);
    }
  });
});

router.get('/me', isLoggedIn('/'), (req, res, next) => {
  /* eslint-disable */
  const infoUser = req.user;
  const userId = req.user._id;
  const userRol = req.user.collection.collectionName;
  /* eslint-enable */
  if (userRol === 'influencers') {
    Campaign.find({ influencer_id: userId })
      .populate('company_id')
      .sort({ updated_at: -1 })
      .exec((err, campaigns) => {
        /* eslint-disable */
        if (err) { console.log('err--> ', err); }
        /* eslint-enable */
        res.render('campaigns/me', { infoUser, campaigns, moment, userRol, layout: 'layouts/profile' });
      });
  }
});

router.get('/:title', isLoggedIn('/'), (req, res, next) => {
  /* eslint-disable */
  const infoUser = req.user;
  const userId = req.user._id;
  const campaignTitle = req.params.title;
  const userRol = req.user.collection.collectionName;
  /* eslint-enable */
  if (userRol === 'companies') {
    Campaign.findOne({ title: campaignTitle })
      .populate('company_id')
      .populate('influencer_id')
      .exec((err, campaign) => {
        res.render('campaigns/show', { campaign, infoUser, moment, userRol, layout: 'layouts/profile' });
      });
  } else if (userRol === 'influencers') {
    Campaign.findOne({ title: campaignTitle })
      .populate('company_id')
      .exec((err, campaign) => {
        res.render('campaigns/show', { campaign, infoUser, moment, userRol, layout: 'layouts/profile' });
      });
  }
});


router.post('/:_id/follow', isLoggedIn('/'), (req, res, next) => {
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
    res.redirect(`/${req.user.username}`);
  }
});

router.post('/:_id/unfollow', isLoggedIn('/'), (req, res, next) => {
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
    res.redirect(`/${req.user.username}`);
  }
});

router.get('/:campaignTitle/edit', isLoggedIn('/login'), (req, res, next) => {
  /* eslint-disable */
  const infoUser = req.user;
  const userId = req.user._id;
  const userRol = req.user.collection.collectionName;
  const campaignTitle = req.params.campaignTitle;
  /* eslint-enable */
  if (userRol === 'companies') {
    Campaign.findOne({ title: campaignTitle })
      .exec((err, campaign) => {
        res.render('campaigns/edit', { campaign, infoUser, moment, userRol, layout: 'layouts/profile' });
      });
  }
});

router.post('/:campaignTitle/edit', isLoggedIn('/'), (req, res, next) => {
  /* eslint-disable */
  const infoUser = req.user;
  const userId = req.user._id;
  const userRol = req.user.collection.collectionName;
  const campaignTitle = req.params.campaignTitle;
  /* eslint-enable */
  if (userRol === 'companies') {
    const updateCampaign = {
      title: req.body.title,
      description: req.body.description,
    };
    Campaign.findOne({ title: campaignTitle })
      .exec((err, campaign) => {
        Campaign.findByIdAndUpdate(campaign, updateCampaign, (error, campaignUpdated) => {
          if (err) {
            next(err);
          } else {
            res.redirect(`/${infoUser.username}`);
          }
        });
      });
  }
});

router.get('/:campaignTitle/delete', isLoggedIn('/'), (req, res, next) => {
  /* eslint-disable */
  const infoUser = req.user;
  const userRol = req.user.collection.collectionName;
  const campaignTitle = req.params.campaignTitle;
  /* eslint-enable */
  if (userRol === 'companies') {
    Campaign.findOneAndRemove({ title: campaignTitle }, (err, result) => {
      if (err) { next(err); }
      res.redirect(`/${infoUser.username}`);
    });
  }
});

module.exports = router;
