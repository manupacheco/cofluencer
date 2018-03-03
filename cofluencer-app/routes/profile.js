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
        res.render('profile/influencer/main', { userRol, layout: 'layouts/profile', messages: req.flash('info') }); // flash notification
      } else {
        Influencer.findByIdAndUpdate(userId, { instagram: iguser }, (errUpdate) => {
          if (errUpdate) { return next(errUpdate); }
          return next;
        });
        const igUserId = iguser.id;
        updateProfilePic(igUserId, (errPic, picUrl) => {
          if (err) {
            res.render('profile/influencer/main', { layout: 'layouts/profile', messages: req.flash('info') }); // flash notification
          } else if (picUrl == null) {
            Influencer.findByIdAndUpdate(userId, { profileImage: 'https://image.flaticon.com/icons/svg/149/149071.svg' }, (errUpdate) => {
              if (errUpdate) { return next(errUpdate); }
              return next;
            });
          } else {
            Influencer.findByIdAndUpdate(userId, { profileImage: picUrl }, (errUpdate) => {
              if (errUpdate) { return next(errUpdate); }
              return next;
            });
          }
          res.render('profile/influencer/main', { userRol, iguser, infoUser, layout: 'layouts/profile', messages: req.flash('info') });
        });
      }
    });
  } else if (userRol === 'companies') {
    Company.findById(userId, (err, company) => {
      if (err) { return next(err); }
      infoUser = company;
      res.render('profile/company/main', { userRol, infoUser, layout: 'layouts/profile' });
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
      res.render('profile/company/edit', { infoUser, layout: 'layouts/profile' });
    });
  }
});

router.post('/:username', isLoggedIn('/login'), (req, res, next) => {
  /* eslint-disable */
  const userId = req.user._id;
  const userRol = req.user.collection.collectionName;
  /* eslint-enable */
  if (userRol === 'influencers') {
    const updateInfluencer = {
      username: req.body.cofluname,
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      address: {
        city: req.body.city,
      },
      socialLinks: {
        facebook: req.body.facebook,
        instagram: req.body.instagram,
        twitter: req.body.twitter,
        youtube: req.body.youtube,
      },
      bio: req.body.bio,
      instagram: {
        username: req.body.instagram,
      },
    };
    Influencer.findByIdAndUpdate(userId, updateInfluencer, (err, influencer) => {
      if (err) { next(err); }
      callInstagram(req.body.instagram, (error, iguser) => {
        if (error) {
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
            } else if (picUrl == null) {
              Influencer.findByIdAndUpdate(userId, { profileImage: 'https://image.flaticon.com/icons/svg/149/149071.svg' }, (errUpdate) => {
                if (errUpdate) { return next(errUpdate); }
                return next;
              });
            } else {
              Influencer.findByIdAndUpdate(userId, { profileImage: picUrl }, (errUpdate) => {
                if (errUpdate) { return next(errUpdate); }
                return next;
              });
            }
            res.redirect(`/${req.body.cofluname}`);
          });
        }
      });
    });
  } else if (userRol === 'companies') {
    const updateCompany = {
      username: req.body.cofluname,
      email: req.body.email,
      bio: req.body.bio,
    };
    Company.findByIdAndUpdate(userId, updateCompany, (err, company) => {
      if (err) { next(err); }
      res.redirect(`/${updateCompany.username}`);
    });
  }
});

module.exports = router;
