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
  const userRol = req.user.collection.collectionName;
  let infoUser;
  /* eslint-enable */
  if (userRol === 'influencers') {
    Influencer.findById(userId, (err, influencer) => {
      if (err) { return next(err); }
      infoUser = influencer;
      return next;
    });
    const igUserName = req.user.instagram.username;
    callInstagram(igUserName, (err, iguser) => {
      if (err) {
        res.render('profile-influencer', {}); // flash notification
      } else {
        Influencer.findByIdAndUpdate(userId, { instagram: iguser }, (errUpdate) => {
          if (errUpdate) { return next(errUpdate); }
          return next;
        });
        res.render('profile-influencer', { iguser, infoUser });
      }
    });
  } else if (userRol === 'companies') {
    Company.findById(userId, (err, company) => {
      if (err) { return next(err); }
      infoUser = company;
      res.render('profile-company', { infoUser });
      return next;
    });
  }
});

router.get('/:username/edit', isLoggedIn('/login'), (req, res, next) => {
  /* eslint-disable */
  const userId = req.user._id;
  const userRol = req.user.collection.collectionName;
  /* eslint-enable */
  if (userRol === 'influencers') {
    Influencer.findById(userId, (err, infoUser) => {
      if (err) { next(err); }
      res.render('profile/influencer/edit', { infoUser });
    });
  } else if (userRol === 'companies') {
    Company.findById(userId, (err, infoUser) => {
      if (err) { next(err); }
      res.render('profile-company', { infoUser });
    });
  }
});

router.post('/:username', isLoggedIn('/login'), (req, res, next) => {
  /* eslint-disable */
  const userId = req.user._id;
  const userRol = req.user.collection.collectionName
  /* eslint-enable */
  if (userRol === 'influencers') {
    const updateInfluencer = {
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      address: {
        city: req.body.city,
      },
      bio: req.body.bio,
      instagram: {
        username: req.body.ig_user,
      },
    };
    Influencer.findByIdAndUpdate(userId, updateInfluencer, (err, influencer) => {
      if (err) { next(err); }
      res.redirect(`/${req.user.username}`);
    });
  } else if (userRol === 'companies') {
    const igUserName = req.body.name;
    callInstagram(igUserName, (err, iguser) => {
      if (err) {
        res.render('profile-company', {}); // flash notification
      } else {
        res.render('profile-company', { iguser });
      }
    });
  }
});

module.exports = router;
