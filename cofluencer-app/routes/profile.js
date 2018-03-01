const express = require('express');
const router = express.Router();
const passport = require('passport');
const configurePassport = require('../helpers/passport');
/* eslint-disable */
const isLoggedIn = require('../helpers/middlewares').isLoggedIn;
const callInstagram = require('../helpers/middlewares').callInstagram;
/* eslint-enable */
const { updateProfilePic } = require('../helpers/middlewares');
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
        res.render('profile/influencer/main', { layout: 'layouts/profile' }); // flash notification
      } else {
        Influencer.findByIdAndUpdate(userId, { instagram: iguser }, (errUpdate) => {
          if (errUpdate) { return next(errUpdate); }
          return next;
        });
        const igUserId = iguser.id;
        updateProfilePic(igUserId, (errPic, picUrl) => {
          if (err) {
            res.render('profile/influencer/main', { layout: 'layouts/profile' }); // flash notification
          } else {
            Influencer.findByIdAndUpdate(userId, { profileImage: picUrl }, (errUpdate) => {
              if (errUpdate) { return next(errUpdate); }
              return next;
            });
          }
          res.render('profile/influencer/main', { iguser, infoUser, layout: 'layouts/profile' });
        });
      }
    });
  } else if (userRol === 'companies') {
    Company.findById(userId, (err, company) => {
      if (err) { return next(err); }
      infoUser = company;
      res.render('profile/company/main', { infoUser, layout: 'layouts/profile' });
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
      res.render('profile/influencer/edit', { infoUser, layout: 'layouts/profile' });
    });
  } else if (userRol === 'companies') {
    Company.findById(userId, (err, infoUser) => {
      if (err) { next(err); }
      res.render('profile/company/main', { infoUser, layout: 'layouts/profile' });
    });
  }
});

router.post('/:username', isLoggedIn('/login'), (req, res, next) => {
  /* eslint-disable */
  const userId = req.user._id;
  const userRol = req.user.collection.collectionName;
  /* eslint-enable */
  if (userRol === 'influencers') {
    console.log(req.body);
    const updateInfluencer = {
      username: req.body.cofluname,
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      address: {
        city: req.body.city,
      },
      bio: req.body.bio,
      instagram: {
        username: req.body.instagram,
      },
    };
    Influencer.findByIdAndUpdate(userId, updateInfluencer, (err, influencer) => {
      if (err) { next(err); }
      console.log('info: ', updateInfluencer, 'body: ', req.body);
      res.redirect(`/${req.user.username}`);
    });
  } else if (userRol === 'companies') {
    const igUserName = req.body.name;
    callInstagram(igUserName, (err, iguser) => {
      if (err) {
        res.render('profile/company/main', { layout: 'layouts/profile' }); // flash notification
      } else {
        res.render('profile/company/main', { iguser, layout: 'layouts/profile' });
      }
    });
  }
});

module.exports = router;
